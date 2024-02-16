import type { 
    MatchedUser, 
    RecentSubmission, 
    SubmitStats, 
    UserContestInfo 
} from '../types';

import {
    profileQuery,
    contestDetailsQuery,
    solvedProblemsStatsQuery,
    recentSubmissionQuery,
    heatMapQuery
} from './queries'

class LeetcodeQuery {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async fetchData(query: string, username: string, ...rest: any) {
        const res = await fetch('/leetcode', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Referer: 'https://leetcode.com',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                query: query, 
                variables: { 
                    username: username, 
                    ...rest
                } 
            }),
        })

        return res.json();
    }

    async fetchUserProfile(userName: string) : Promise<MatchedUser>{
        const res = await this.fetchData(profileQuery, userName);
        return res.data.matchedUser;
    }

    async fetchUserContestDetails(userName: string): Promise<UserContestInfo> {
        return await this.fetchData(contestDetailsQuery, userName);
    }

    async fetchUserSolvedProblemsStats(userName: string): Promise<SubmitStats> {
        return await this.fetchData(solvedProblemsStatsQuery, userName);
    }

    async fetchUserRecentSubmissions(userName: string, limit = 20): Promise<RecentSubmission[]> {
        userName;
        limit = (limit ? Math.min(limit, 20) : 20);
        return await this.fetchData(recentSubmissionQuery, userName, limit) || [];
    }

    async fetchUserHeatMap(userName: string) {
        return await this.fetchData(heatMapQuery, userName);
    }
}


export default new LeetcodeQuery();