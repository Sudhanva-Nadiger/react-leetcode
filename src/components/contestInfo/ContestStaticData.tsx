import { ContestRanking } from "../../types"

type Props = {
    contestData:ContestRanking;
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
    <div className="flex justify-between p-2">
        <div>
            <h2 style={{color: theme.secondaryColor}} className="font-semibold">Contest Ranking</h2>
            <span style={{color: theme.primaryColor}} className="text-3xl">{Math.round(contestData.rating)}</span>
        </div>
        <div>
            <p style={{color: theme.secondaryColor}}>Global Ranking</p>
            <span style={{color: theme.primaryColor}} className="font-semibold">{contestData.globalRanking.toLocaleString()}</span>
            <span style={{color:theme.secondaryColor}} className="font-semibold">{" /" + contestData.totalParticipants.toLocaleString()}</span>
        </div>
        <div>
            <p style={{color: theme.secondaryColor}}>Attended</p>
            <span style={{color: theme.primaryColor}}>{contestData.attendedContestsCount}</span>
        </div>
    </div>
  )
}

export default ContestStaticData