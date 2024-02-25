import { forwardRef, memo, useCallback, useEffect, useRef, useState } from "react";
import leetcodeQuery from "../../utils/leetcodeQuery";
import { useFetch } from "../../hooks";
import LoadingOrError from "../LoadingOrError";
import { calcOpacity } from "../../utils"
import '../../index.css';
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


/**
 * Represents a block in the heatmap.
 * @param {object} props - The props object.
 * @param {number} props.count - The count of submissions for the block.
 * @returns - The JSX element representing the block.
 */
const Block = ({
    count,
    width
}: {
    i: number,
    count: number,
    date: string,
    width: number,
}) => {
    return (
        <>
            <div
                style={{
                    backgroundColor: `rgba(20, 255, 20, ${calcOpacity(count)})`,
                    width: `${width}px`
                }}
                className={`sq-block aspect-square rounded-sm border border-black border-opacity-30`}
            />
        </>
    )
}

/**
 * Component for displaying the heatmap of a user's submissions.
 * @param {object} props - The props object.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to attach to the component's root element.
 * @param {string} props.userName - The username of the user.
 * @param {JSX.Element} [props.loadingComponent] - The loading component to display.
 * @param {object} [props.theme] - The theme configuration.
 * @param {string} [props.theme.primaryColor="rgba(34,211,238,1)"] - The primary color.
 * @param {string} [props.theme.secondaryColor="rgba(209,213,219,1)"] - The secondary color.
 * @param {string} [props.theme.bgColor="rgba(68,64,60,1)"] - The background color.
 * @param {boolean} [props.showUserName=false] - Flag to show the username.
 * @returns {JSX.Element} - The JSX element representing the heatmap component.
 */
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
    const [width, setWidth] = useState(69);
    const divRef = useRef<HTMLDivElement>(null);

    const fetchData = useCallback(() => {
        return leetcodeQuery.fetchUserHeatMap(userName);
    }, [userName])

    const { data, loading: isLoading, error } = useFetch(fetchData);

    useEffect(() => {
        const newwidth = divRef.current?.getBoundingClientRect().width;
        setWidth(newwidth || 69);
    }, [isLoading])

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
        <div ref={divRef} className="w-full">
            <div
                id="heat_map_container"
                style={{
                    background: theme.bgColor
                }}
                ref={ref}
                className="w-full gap-1 rounded-lg p-4 flex flex-col items-center justify-center"
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
                    className="w-full h-full grid grid-rows-7 grid-flow-col justify-center"
                    style={{
                        rowGap: '1px',
                        columnGap: '2px',
                    }}
                >
                    {data.map((element, index) => (
                        <Block
                            width={width / 69}
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
                    className="flex justify-between w-full"
                >
                    <span>{data[0].date}</span>
                    <span>{data[last - 1].date}</span>
                </div>
            </div>
        </div>
    )
})

const MemoizedHeatMap = memo(HeatMap);

export default MemoizedHeatMap;