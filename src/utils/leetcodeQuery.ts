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

/**
 * Represents a class for querying user data from LeetCode.
 */
export class LeetcodeQuery {

    /**
     * Fetches data from the LeetCode Graphql endpoint.
     * @param {string} query - The GraphQL query string.
     * @param {string} username - The username for which to fetch the data.
     * @returns A promise resolving to the fetched data.
     * @private
     */
    private async fetchData(query: string, username: string) {
        let url = '/leetcode';

        if(import.meta.env.MODE === 'test') {
            url = 'https://leetcode.com/graphql';
        }

        const res = await fetch(url, {
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

    /**
     * Fetches the user profile data.
     * @param {string} userName - The username of the user.
     * @returns {Promise<MatchedUser>} A promise resolving to the user profile data.
     */
    async fetchUserProfile(userName: string) : Promise<MatchedUser>{
        const { data } = await this.fetchData(profileQuery, userName);
        return data.matchedUser;
    }

    /**
     * Fetches details of the user's contest participation.
     * @param {string} userName - The username of the user.
     * @returns {Promise<UserContestInfo>} A promise resolving to the user's contest details.
     */
    async fetchUserContestDetails(userName: string): Promise<UserContestInfo> {
        const { data } = await this.fetchData(contestDetailsQuery, userName);
        const contestDetail = {} as UserContestInfo;
        
        contestDetail.userContestRanking = data.userContestRanking;
        contestDetail.userContestRankingHistory = (data.userContestRankingHistory as Array<ContestInfo>).filter((info) => info.attended);

        return contestDetail;
    }

    /**
     * Fetches statistics of the user's solved problems.
     * @param {string} userName - The username of the user.
     * @returns {Promise<SubmitStats>} A promise resolving to the user's solved problems statistics.
     */
    async fetchUserSolvedProblemsStats(userName: string): Promise<SubmitStats> {
        const { data } = await this.fetchData(solvedProblemsStatsQuery, userName);
        const stats = {} as SubmitStats;

        stats.allQuestionsCount = data.allQuestionsCount;
        stats.acSubmissionNum = data.matchedUser.submitStats.acSubmissionNum;
        stats.rank = data.matchedUser.profile.ranking
    
        return stats;
    }

    /**
     * Fetches the user's recent submissions.
     * @param {string} userName - The username of the user.
     * @returns {Promise<RecentSubmission[]>} A promise resolving to an array of recent submissions.
     */
    async fetchUserRecentSubmissions(userName: string): Promise<RecentSubmission[]> {
        const { data } = await this.fetchData(recentSubmissionQuery, userName);
        return data.recentSubmissionList;
    }

    /**
     * Fetches the user's heatmap data.
     * @param {string} userName - The username of the user.
     * @returns {Promise<HeatMapDetail[]>} A promise resolving to an array of heatmap details.
     */
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