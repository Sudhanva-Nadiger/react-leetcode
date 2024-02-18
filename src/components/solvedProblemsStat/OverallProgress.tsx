import { useState } from "react";

type Props = {
    totalQuestions: number,
    totalSolved: number,
    primaryColor?: string,
    secondaryColor?: string
}

function OverallProgress({
    totalQuestions,
    totalSolved,
    primaryColor = "rgba(34,211,238,1)",
    secondaryColor = "rgba(209,213,219,1)"
}: Props) {

    const [showPercentage, setShowPercentage] = useState(false);

    const solvedPercentage = ((totalSolved! / totalQuestions!) * 100).toFixed(2);
    const radius = 60;
    const circumference = 2 * Math.PI *radius
    const offset = circumference * ((100 - parseFloat(solvedPercentage))/100)

    const percentageBefore = solvedPercentage.split(".")[0]
    const percentageAfter = solvedPercentage.split(".")[1] + "%";

    return (
        <svg 
            onMouseOver={() => {
                setShowPercentage(true)
            }}
            onMouseOut={() => {
                setShowPercentage(false)
            }} 
            width="160" height="160" 
            viewBox="0 0 160 160" 
            style={{transform:"rotate(-90deg)"}}
            className="h-[75%] w-[75%]"
        >
            <circle r={radius} cx="80" cy="80" 
                fill="transparent" 
                stroke="#e0e0e0"
                stroke-width="5px" 
                opacity={0.3}
            />
            <circle 
                r={radius} cx="80" cy="80" 
                fill="transparent" stroke={"rgb(202,138,4)"}
                strokeWidth="6px" 
                strokeDasharray={circumference} 
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{borderRadius:"50%"}}
            >
                <animate attributeName="stroke-dashoffset" values={`360;${offset}`} dur="2s"></animate>
            </circle>

            <text x="50%" y="50%" 
                fill={primaryColor} font-size="30px" 
                textAnchor="middle" 
                fontWeight="bold"
                style={{transform:"rotate(90deg) translate(0, -156px)"}}
            >   
                {showPercentage ? percentageBefore : totalSolved}
                {showPercentage && <tspan font-size="12px">{"." + percentageAfter}</tspan>}
            </text>
            
            <text x="62px" y="100px"
                fill={secondaryColor} font-size="12px" 
                style={{transform:"rotate(90deg) translate(0, -156px)"}}
            >   
                solved
            </text>
        </svg>
    )
}

export default OverallProgress