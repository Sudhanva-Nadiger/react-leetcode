import { ContestInfo } from '../../types';
import '../../index.css';
type Props = {
    contestData: ContestInfo
    theme?: {
        primaryColor?: string;
        secondaryColor?: string;
        bgColor?: string;

    }
}

/**
 * Component for displaying dynamic contest data.
 * 
 * @param {object} props - Props for the DynamicContestData component.
 * @param {ContestInfo} props.contestData - The contest data to be displayed.
 * @param {object} [props.theme] - The theme object containing color values.
 * @param {string} [props.theme.primaryColor="rgba(34,211,238,1)"] - The primary color for text.
 * @param {string} [props.theme.secondaryColor="rgba(209,213,219,1)"] - The secondary color for text.
 * @param {string} [props.theme.bgColor="rgba(68,64,60,1)"] - The background color.
 * 
 * @returns A React component for displaying dynamic contest data.
 */
function DynamicContestData({
    contestData,
    theme = {
        primaryColor: "rgba(34,211,238,1)",
        secondaryColor: "rgba(209,213,219,1)",
        bgColor: "rgba(68,64,60,1)"
    },
}: Props) {
    const date = new Date(contestData.contest.startTime * 1000);
    return (
        <div id="particular_contest_detail_container" className="flex flex-wrap mb-1 gap-1 justify-between p-2">
            <div id="contest_rank">
                <h2 style={{ color: theme.secondaryColor }} className="font-semibold">Contest Ranking</h2>
                <span style={{ color: theme.primaryColor }} className="text-3xl">{Math.round(contestData.rating)}</span>
            </div>
            <div id="contest_date">
                <p style={{ color: theme.secondaryColor }}>{date.toLocaleDateString()}</p>
                <span style={{ color: theme.primaryColor }} className="font-semibold">{contestData.contest.title}</span>
            </div>
            <div id="contest_rank">
                <p style={{ color: theme.secondaryColor }}>Rank</p>
                <span style={{ color: theme.primaryColor }}>{contestData.ranking}</span>
            </div>
            <div id="total_solved_questions">
                <p style={{ color: theme.secondaryColor }}>Solved</p>
                <span style={{ color: theme.primaryColor }}>{contestData.problemsSolved}</span>
                <span style={{ color: theme.secondaryColor }}>{" /4"}</span>
            </div>
        </div>
    )
}

export default DynamicContestData