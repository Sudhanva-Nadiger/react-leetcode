import { ContestRanking } from "../../types"

type Props = {
    contestData: ContestRanking;
    theme?: {
        primaryColor?: string;
        secondaryColor?: string;
        bgColor?: string;
    }
}

function ContestStaticData({
    contestData,
    theme = {
        primaryColor: "rgba(34,211,238,1)",
        secondaryColor: "rgba(209,213,219,1)",
        bgColor: "rgba(68,64,60,1)"
    },
}: Props) {
    return (
        <div id="overall_contest_info_container" className="flex flex-wrap mb-1 gap-1 justify-between p-2">
            <div id="contest_overall_rating">
                <h2 style={{ color: theme.secondaryColor }} className="font-semibold">Contest Rating</h2>
                <span style={{ color: theme.primaryColor }} className="text-3xl">{Math.round(contestData.rating)}</span>
            </div>
            <div id="contest_global_ranking">
                <p style={{ color: theme.secondaryColor }}>Global Ranking</p>
                <span style={{ color: theme.primaryColor }} className="font-semibold">{contestData.globalRanking.toLocaleString()}</span>
                <span style={{ color: theme.secondaryColor }} className="font-semibold">{" /" + contestData.totalParticipants.toLocaleString()}</span>
            </div>
            <div id="total_attended_contest">
                <p style={{ color: theme.secondaryColor }}>Attended</p>
                <span style={{ color: theme.primaryColor }}>{contestData.attendedContestsCount}</span>
            </div>
        </div>
    )
}

export default ContestStaticData