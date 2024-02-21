const profileQuery =`
query ($username: String!) {
    matchedUser(username: $username) {
        username
        socialAccounts
        githubUrl
        linkedinUrl
        twitterUrl
        profile {
            realName
            websites
            countryName
            skillTags
            company
            school
            starRating
            aboutMe
            userAvatar
            reputation
            ranking
        }
        activeBadge {
            id
            displayName
            icon
        }
    }
}
`;

const contestDetailsQuery = `
query ($username: String!) {
    userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
            name
        }
    }
    userContestRankingHistory(username: $username) {
        attended
        trendDirection
        problemsSolved
        totalProblems
        finishTimeInSeconds
        rating
        ranking
        contest {
            title
            startTime
        }
    }
}
`;

const solvedProblemsStatsQuery = `
query ($username: String!) {
    allQuestionsCount {
        difficulty
        count
    }
    matchedUser(username: $username) {
        profile {
            ranking
        }
        submitStats {
            acSubmissionNum {
                difficulty
                count
                submissions
            }
            totalSubmissionNum {
                difficulty
                count
                submissions
            }
        }
    }
}
`;

const recentSubmissionQuery = `
query ($username: String!) {
    recentSubmissionList(username: $username, limit: 10) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
    }
}
`;


const heatMapQuery = `
query ($username: String!) {
    matchedUser(username: $username) {
        submissionCalendar
    }
}
`;


export {
    profileQuery, 
    contestDetailsQuery, 
    solvedProblemsStatsQuery, 
    recentSubmissionQuery,
    heatMapQuery
}