import { useCallback } from "react";

import { useFetch } from "../../hooks"
import leetcodeQuery from "../../utils/leetcodeQuery";
import { SubmitStats } from "../../types";
import LoadingOrError from "../LoadingOrError";
import OverallProgress from "./OverallProgress";

type Props = {
    userName: string,
    loadingComponent?: React.ReactNode,
    theme?: {
        primaryColor?: string;
        secondaryColor?: string;
        bgColor?: string;
    }
}

function SolvedProblemsStats({
    userName,
    loadingComponent,
    theme = {
        primaryColor: "rgba(34,211,238,1)",
        secondaryColor: "rgba(209,213,219,1)",
        bgColor: "rgba(68,64,60,1)"
    }
}: Props) {

    const fetchData = useCallback(() => {
        return leetcodeQuery.fetchUserSolvedProblemsStats(userName);
    }, [userName])

    const { data, loading: isLoading, error }  = useFetch<SubmitStats>(fetchData);

    if(isLoading || error || !data) {
        return (
            <LoadingOrError
                loading={isLoading}
                error={error}
                loadingComponent={loadingComponent}
            />
        )
    }
    

    const [totalQuestions, ...difficultyWiseTotal] = data?.allQuestionsCount || [];
    const [totalSolved, ...sectionWiseSolved] = data?.acSubmissionNum || [];

    
    const getColor = {
        "Easy": "bg-green-600",
        "Medium": "bg-amber-300",
        "Hard": "bg-red-500"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    return (
        <div className="flex w-[400px] items-center rounded-xl px-4 py-2 gap-2" style={{background:theme.bgColor}}>
            <OverallProgress
                totalQuestions={totalQuestions.count!}
                totalSolved={totalSolved.count!}
                primaryColor="#fff"
            />

            <div className="w-full">
                {
                    difficultyWiseTotal.map((difficulty, index) => {
                        const section = sectionWiseSolved[index];
                        const total = difficulty.count!;
                        const solved = section.count!;
                        const percentage = (solved / total) * 100;
                        return (
                            <div key={difficulty.difficulty} className="mt-3 first:mt-0 first:space-y-0 space-y-1 w-full">
                                <div className="flex justify-between px-1">
                                    <span className="text-sm" style={{color: theme?.secondaryColor}}>{difficulty.difficulty}</span>
                                    <span className="text-start w-[4.5rem]">
                                        <span className="font-semibold" style={{color: theme.primaryColor}}>{section.count}</span> 
                                        <span className="text-xs pb-2" style={{color: theme.secondaryColor}}>{" /" + difficulty.count}</span>
                                    </span>
                                </div>
                                <div className={`${getColor[difficulty.difficulty]} bg-opacity-20 w-full  rounded-full h-2 mb-4 dark:bg-gray-700`}>
                                    <div style={{width:`${percentage}%`}}>
                                        <div className={`${getColor[difficulty.difficulty]} animate-slide h-2 rounded-full dark:bg-blue-500`} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SolvedProblemsStats