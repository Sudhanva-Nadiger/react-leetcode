export type Profile = {
    realName: string;
    websites: string[];
    countryName: string | null;
    skillTags: string[];
    company: string | null;
    school: string | null;
    starRating: number;
    aboutMe: string;
    userAvatar: string;
    reputation: number;
    ranking: number;
}

export type MatchedUser = {
    username: string;
    socialAccounts: unknown;
    githubUrl: string | null;
    linkedinUrl: string | null;
    twitterUrl: string | null;
    profile: Profile;
    activeBadge: {
        id: string;
        displayName: string;
        icon: string;
    } | null
}

export type Contest = {
    title: string;
    startTime: number;
}

export type ContestInfo = {
    attended: boolean;
    trendDirection: string;
    problemsSolved: number;
    totalProblems: number;
    finishTimeInSeconds: number;
    rating: number;
    ranking: number;
    contest: Contest;
}

export type ContestRanking = {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    topPercentage: number;
    badge: null | {
        name: string;
    };
}

export type UserContestInfo = {
    userContestRanking: ContestRanking;
    userContestRankingHistory: ContestInfo[];
}

export type AllQuestionsCount = {
    difficulty: string;
    count: number;
}

export type AcSubmissionNum = {
    difficulty: string;
    count: number;
    submissions: number;
}

export type TotalSubmissionNum = {
    difficulty: string;
    count: number;
    submissions: number;
}

export type SubmitStats = {
    allQuestionsCount: AllQuestionsCount[],
    acSubmissionNum: AcSubmissionNum[];
    rank: string
}

export type RecentSubmission = {
    title: string;
    titleSlug: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
}

export type HeatMapDetail = {
    date: string;
    submissionCount: number;
}