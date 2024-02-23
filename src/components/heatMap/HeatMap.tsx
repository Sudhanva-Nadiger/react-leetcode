import { forwardRef, memo, useCallback } from "react";
import leetcodeQuery from "../../utils/leetcodeQuery";
import { useFetch } from "../../hooks";
import LoadingOrError from "../LoadingOrError";
import { calcOpacity } from "../../utils"

export type Props = {
    userName: string,
    loadingComponent?: JSX.Element
    theme?: {
        primaryColor?: string;
        secondaryColor?: string;
        bgColor?: string;
    },
    showUserName?: boolean;
}

const Block = ({
    count,
}: {
    i: number,
    count: number,
    date: string
}) => {
    return (
        <>
            <div
                style={{
                    backgroundColor: `rgba(20, 255, 20, ${calcOpacity(count)})`,
                }}
                className="sq-block w-[7px] h-[7px] rounded-sm border border-black border-opacity-30"
            />
        </>
    )
}

const HeatMap = forwardRef<HTMLDivElement, Props>(({
    userName,
    loadingComponent,
    theme = {
        primaryColor: "rgba(34,211,238,1)",
        secondaryColor: "rgba(209,213,219,1)",
        bgColor: "rgba(68,64,60,1)"
    },
    showUserName = false
}, ref) => {

    const fetchData = useCallback(() => {
        return leetcodeQuery.fetchUserHeatMap(userName);
    }, [userName])

    const { data, loading: isLoading, error } = useFetch(fetchData);

    if (isLoading || error || !data) {
        return (
            <LoadingOrError
                loading={isLoading}
                error={error}
                loadingComponent={loadingComponent}
            />
        )
    }

    const last = data.length - 1;

    return (
        <div
            id="heat_map_container"
            style={{
                background: theme.bgColor
            }}
            ref={ref}
            className="w-full sm:w-[500px] gap-1 rounded-lg p-4 flex flex-col items-center justify-center"
        >
            <h2
                id="heat_map_title"
                style={{ color: theme.primaryColor }}
                className="flex justify-between font-medium w-full"
            >
                <span>Heatmap (Last 52 Weeks)</span>
                {showUserName && <span>{userName}</span>}
            </h2>
            <div
                id="heat_map"
                style={{
                    width: "100%",
                    height: "100%",
                    display: 'grid',
                    gridTemplateRows: 'repeat(7, 1fr)',
                    gridAutoFlow: 'column',
                    rowGap: '1px',
                    columnGap: '2px',
                    justifyContent: 'center',
                }}
            >
                {data.map((element, index) => (
                    <Block
                        key={index}
                        i={index}
                        count={element.submissionCount}
                        date={element.date}
                    />
                ))}
            </div>
            <div
                id="heat_map_date_range"
                style={{ color: theme.secondaryColor }}
                className="flex justify-between w-full text-xs"
            >
                <span>{data[0].date}</span>
                <span>{data[last - 1].date}</span>
            </div>
        </div>
    )
})

const MemoizedHeatMap = memo(HeatMap);

export default MemoizedHeatMap;