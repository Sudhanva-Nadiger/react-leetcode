import {expect, describe, it, expectTypeOf } from 'vitest'
import { LineChartCalculations, calcOpacity, getCordinates, getPath } from '../utils'
import { ContestInfo, HeatMapDetail, MatchedUser, RecentSubmission, SubmitStats, UserContestInfo } from '../types'
import { LeetcodeQuery } from '../utils/leetcodeQuery'

const mockContestHistory: ContestInfo[]  = [
    {
        attended: true,
        contest: {
            startTime: 1704067200,
            title: "Test title"
        },
        finishTimeInSeconds: 12000,
        rating: 1000,
        problemsSolved: 3,
        ranking: 100,
        totalProblems: 4,
        trendDirection: "up"
    }
]

const mockContestHistory2: ContestInfo[]  = [
    {
        attended: true,
        contest: {
            startTime: 1704067200,
            title: "Test title"
        },
        finishTimeInSeconds: 12000,
        rating: 1000,
        problemsSolved: 3,
        ranking: 100,
        totalProblems: 4,
        trendDirection: "up"
    },
    {
        attended: true,
        contest: {
            startTime: 1704326400,
            title: "Test title"
        },
        finishTimeInSeconds: 12000,
        rating: 1700,
        problemsSolved: 3,
        ranking: 100,
        totalProblems: 4,
        trendDirection: "up"
    }
]

describe("Tests for utility functions", () => {

    it("Should return proper string", () => {
        const userSlug =  "sudhanv-nadiger"
        expect(getPath(`https://github.com/${userSlug}`)).toBe(userSlug)

        expect(getPath("test-url")).toBe("test-url");
    })

    describe("Test calculating coordinate functions for different inputs", () => {
        it("Should return proper cordinates when size of history is one", () => {
            const cordinates = getCordinates(mockContestHistory);
            expect(cordinates.length).toBe(1);
    
            expect(cordinates).toEqual([{
                x: 0,
                y: 0,
                ...mockContestHistory[0]
            }])
    
            expect(cordinates[0].attended).toBe(true);
        })

        it("Should return empty array if history size is zero", () => {
            const cordinates = getCordinates([]);
            expect(cordinates.length).toBe(0);
    
            expect(cordinates).toEqual([]);
        })

        it("Should return correct resuls", () => {
            const cordinates = getCordinates(mockContestHistory2);
            expect(cordinates.length).toBe(2);
    
            expect(cordinates[0].attended).toBe(true);
            expectTypeOf(cordinates[0]).toHaveProperty("x")
            expectTypeOf(cordinates[0]).toHaveProperty("y")
        })
    })

    describe("Tests for Linechart calculation functions", () => {
        it("should return proper calculated results when mockhistory size is one", () => {
            const cordinates = getCordinates(mockContestHistory);
            const values = LineChartCalculations(
                500,
                150,
                cordinates,
                2
            );

            expect(values).not.toBe(undefined);
    
            expect(values?.FONT_SIZE).toBe(10);
            expect(values?.padding).toBe(30);
            expect(values?.maximumXFromData).toBe(1);
            expect(values?.maximumYFromData).toBe(1);
    
            expectTypeOf(values!.points!).toBeString();
        })

        it("should return proper calculated results when mockhistory size is zero", () => {
            const cordinates = getCordinates([]);
            const values = LineChartCalculations(
                500,
                150,
                cordinates,
                2
            );
    
            expect(values).toBe(undefined);
        })

        it("should return proper calculated results", () => {
            const cordinates = getCordinates(mockContestHistory2);
            const values = LineChartCalculations(
                50,
                150,
                cordinates,
                2
            );
    
            expect(values).not.toBe(undefined);
            expect(values?.FONT_SIZE).toBe(1);
            expect(values?.maximumXFromData).toBe(500)
            expect(values?.maximumYFromData).toBe(150)
        })
    })

    it("should give correct output for calculating opacity", () => {
        expect(calcOpacity(10)).toBe(1);
    })

})

describe("Tests for fetching details from leetcode api", () => {
    const leetcodeQuery = new LeetcodeQuery();
    const userName = "sudhanva_nadiger__";

    it("Should return null for invalid username", async () => {
        const fakeUserName = "fake_user_name";
        expect(await leetcodeQuery.fetchUserProfile(fakeUserName)).toBeNull();
    })

    it("Should return proper user details", async () => {
        const matchedUser = await leetcodeQuery.fetchUserProfile(userName);
        expectTypeOf(matchedUser).toEqualTypeOf<MatchedUser>();
        expect(matchedUser.username).toBe(userName);
    })

    it("Should return proper contest details", async () => {
        const contestDetail = await leetcodeQuery.fetchUserContestDetails(userName);
        expectTypeOf(contestDetail).toEqualTypeOf<UserContestInfo>();
    })

    it("Should return proper problem stats", async () => {
        const contestDetail = await leetcodeQuery.fetchUserSolvedProblemsStats(userName);
        expectTypeOf(contestDetail).toEqualTypeOf<SubmitStats>();
    })

    it("Should return proper recent submission", async () => {
        const contestDetail = await leetcodeQuery.fetchUserRecentSubmissions(userName);
        expectTypeOf(contestDetail).toEqualTypeOf<RecentSubmission[]>();
    })

    it("Should return proper contest details", async () => {
        const contestDetail = await leetcodeQuery.fetchUserHeatMap(userName);
        expectTypeOf(contestDetail).toEqualTypeOf<HeatMapDetail[]>();
    })

})