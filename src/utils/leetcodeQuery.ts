import type { 
    ContestInfo,
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
    private async fetchData(query: string, username: string, ...rest: any) {
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
        const { data } = await this.fetchData(profileQuery, userName);
        return data.matchedUser;
    }

    async fetchUserContestDetails(userName: string): Promise<UserContestInfo> {
        const { data } = await this.fetchData(contestDetailsQuery, userName);
        const contestDetail = {} as UserContestInfo;
        
        contestDetail.userContestRanking = data.userContestRanking;
        contestDetail.userContestRankingHistory = (data.userContestRankingHistory as Array<ContestInfo>).filter((info) => info.attended);

        return contestDetail;
    }

    async fetchUserSolvedProblemsStats(userName: string): Promise<SubmitStats> {
        const { data } = await this.fetchData(solvedProblemsStatsQuery, userName);
        const stats = {} as SubmitStats;

        stats.allQuestionsCount = data.allQuestionsCount;
        stats.acSubmissionNum = data.matchedUser.submitStats.acSubmissionNum;
        stats.rank = data.matchedUser.profile.ranking
    
        return stats;
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