import { forwardRef, memo, useCallback } from "react";
import leetcodeQuery from "../../utils/leetcodeQuery";
import { useFetch } from "../../hooks";
import { RecentSubmission as TRecentSubmission } from "../../types";
import LoadingOrError from "../LoadingOrError";

export type Props = {
    userName: string,
    loadingComponent?: JSX.Element
    theme?: {
        primaryColor?: string;
        secondaryColor?: string;
        bgColor?: string;
    },
}

const RecentSubmission = forwardRef<HTMLDivElement, Props>(({
    userName,
    loadingComponent,
    theme = {
        primaryColor: "rgba(34,211,238,1)",
        secondaryColor: "rgba(209,213,219,1)",
        bgColor: "rgba(68,64,60,1)"
    },
}, ref) => {

    const fetchData = useCallback(() => {
        return leetcodeQuery.fetchUserRecentSubmissions(userName);
    }, [userName])

    const { data, loading: isLoading, error } = useFetch<TRecentSubmission[]>(fetchData);

    if (isLoading || error || !data) {
        return (
            <LoadingOrError
                loading={isLoading}
                error={error}
                loadingComponent={loadingComponent}
            />
        )
    }

    return (
        <div
            id="recent-submissions_container"
            ref={ref}
            className="w-full h-full p-2"
        >
            <div className="flex flex-col w-full h-full">
                <div style={{
                    color: theme.secondaryColor
                }} className="flex items-center justify-between w-full">
                    <h2 className="text-lg font-bold">Recent Submissions</h2>
                </div>
                <div
                    id="recent-submissions_list"
                    className="w-full h-full mt-2"
                >
                    {data.map((submission: TRecentSubmission, i: number) => (
                        <div key={i} style={{
                            backgroundColor: theme.bgColor,
                            color: theme.secondaryColor
                        }} className="flex items-center justify-between w-full h-10 mt-2 px-2 py-1 rounded-md recent_submission_tile">
                            <div className="flex items-center">
                                <div className={`w-4 h-4 rounded-full ${submission.statusDisplay === "Accepted" ? "bg-green-500" : "bg-red-500"} `} />
                                <p style={{
                                    color: theme.primaryColor
                                }} className="ml-2 text-sm">{submission.title}</p>
                            </div>
                            <p className="text-xs">{submission.statusDisplay}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
})

const MemoizedRecentSubmission = memo(RecentSubmission);

export default MemoizedRecentSubmission;