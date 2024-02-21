import type { 
    ContestInfo,
    HeatMapDetail,
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
    private async fetchData(query: string, username: string) {
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

    async fetchUserRecentSubmissions(userName: string): Promise<RecentSubmission[]> {
        const { data } = await this.fetchData(recentSubmissionQuery, userName);
        return data.recentSubmissionList;
    }

    async fetchUserHeatMap(userName: string): Promise<HeatMapDetail[]>{
        const { data } =  await this.fetchData(heatMapQuery, userName);
        const json_string = data.matchedUser.submissionCalendar;

        const submissionCalendar = JSON.parse(json_string);

        const heatMap:HeatMapDetail[] = new Array(365);
        const today = Math.floor(Date.now() / 86400_000) * 86400;

        for(let i = 0; i < 364; i++) {
            const timestamp = today - i * 86400
            const count = submissionCalendar[timestamp] || 0;
            
            const newDate = new Date(timestamp*1000).toLocaleString().split(',')[0];
            heatMap[i] = {date: newDate, submissionCount: count}
        }
        
        return heatMap;
    }
}


export default new LeetcodeQuery();