import { forwardRef, memo, useCallback } from "react";
import '../../index.css';
import { useFetch } from "../../hooks"
import leetcodeQuery from "../../utils/leetcodeQuery";
import { SubmitStats } from "../../types";
import LoadingOrError from "../LoadingOrError";
import OverallProgress from "./OverallProgress";

export type Props = {
    userName: string,
    loadingComponent?: React.ReactNode,
    theme?: {
        primaryColor?: string;
        secondaryColor?: string;
        bgColor?: string;
    },
    showUserName?: boolean;
}


/**
 * Component for displaying statistics of solved problems by a user.
 * @param {object} props - The props object.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to attach to the component's root element.
 * @param {string} props.userName - The username of the user.
 * @param {React.ReactNode} [props.loadingComponent] - Custom loading component to be displayed.
 * @param {object} [props.theme] - An object containing custom theme colors.
 * @param {string} [props.theme.primaryColor="rgba(34,211,238,1)"] - The primary color.
 * @param {string} [props.theme.secondaryColor="rgba(209,213,219,1)"] - The secondary color.
 * @param {string} [props.theme.bgColor="rgba(68,64,60,1)"] - The background color.
 * @param {boolean} [props.showUserName=true] - Flag indicating whether to show the user's name.
 * @returns {JSX.Element} The JSX element representing the solved problems statistics.
 */
const SolvedProblemsStats = forwardRef<HTMLDivElement, Props>(({
    userName,
    loadingComponent,
    theme = {
        primaryColor: "rgba(34,211,238,1)",
        secondaryColor: "rgba(209,213,219,1)",
        bgColor: "rgba(68,64,60,1)"
    },
    showUserName = true
}, ref) => {

    const fetchData = useCallback(() => {
        return leetcodeQuery.fetchUserSolvedProblemsStats(userName);
    }, [userName])

    const { data, loading: isLoading, error } = useFetch<SubmitStats>(fetchData);

    if (isLoading || error || !data) {
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
        <div
            id="solved_problems_stats_container"
            ref={ref}
            className="w-full flex flex-col items-center rounded-xl px-4 py-2 gap-2"
            style={{ background: theme.bgColor }}
        >

            <div id="solved_problems_stats_label" className="w-full flex justify-between p-3">
                <span className="text-sm font-semibold" style={{ color: theme.secondaryColor }}>{showUserName ? userName : "Solved Problems"}</span>
                {showUserName && <span className="text-sm font-semibold pr-1" style={{ color: theme.secondaryColor }}>{"#" + data.rank}</span>}
            </div>

            <div id="solved_problems_stats_progress_deails" className="w-full flex justify-between items-center">
                <OverallProgress
                    totalQuestions={totalQuestions.count!}
                    totalSolved={totalSolved.count!}
                    primaryColor="#fff"
                />

                <div id="linear_progress_container" className="w-full">
                    {
                        difficultyWiseTotal.map((difficulty, index) => {
                            const section = sectionWiseSolved[index];
                            const total = difficulty.count!;
                            const solved = section.count!;
                            const percentage = (solved / total) * 100;

                            return (
                                <div id={`progress_bar_${difficulty.difficulty}`} key={difficulty.difficulty} className="progress_bar mt-3 first:mt-0 w-full">
                                    <div className="flex justify-between px-1">
                                        <span className="text-sm" style={{ color: theme?.secondaryColor }}>{difficulty.difficulty}</span>
                                        <span className="w-[4.5rem] text-end">
                                            <span className="font-semibold" style={{ color: theme.primaryColor }}>{section.count}</span>
                                            <span className="text-xs pb-2" style={{ color: theme.secondaryColor }}>{" /" + difficulty.count}</span>
                                        </span>
                                    </div>
                                    <div className={`${getColor[difficulty.difficulty]} progress_label bg-opacity-20 w-full  rounded-full h-2 dark:bg-gray-700`}>
                                        <div style={{ width: `${percentage}%` }}>
                                            <div className={`${getColor[difficulty.difficulty]} animate-slide h-2 rounded-full dark:bg-blue-500`} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
})

const MemoizedSolvedProblemsStats = memo(SolvedProblemsStats);

export default MemoizedSolvedProblemsStats;