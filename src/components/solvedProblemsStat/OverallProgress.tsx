import { useState } from "react";
import '../../index.css';
type Props = {
    totalQuestions: number,
    totalSolved: number,
    primaryColor?: string,
    secondaryColor?: string
}

/**
 * Component for displaying overall progress of solving problems.
 * @param {object} props - The props object.
 * @param {number} props.totalQuestions - The total number of questions.
 * @param {number} props.totalSolved - The number of questions solved.
 * @param {string} [props.primaryColor="rgba(34,211,238,1)"] - The primary color.
 * @param {string} [props.secondaryColor="rgba(209,213,219,1)"] - The secondary color.
 * @returns The JSX element representing the overall progress.
 */
function OverallProgress({
    totalQuestions,
    totalSolved,
    primaryColor = "rgba(34,211,238,1)",
    secondaryColor = "rgba(209,213,219,1)"
}: Props) {

    const [showPercentage, setShowPercentage] = useState(false);

    const solvedPercentage = ((totalSolved! / totalQuestions!) * 100).toFixed(2);
    const radius = 55;
    const circumference = 2 * Math.PI *radius
    const offset = circumference * ((100 - parseFloat(solvedPercentage))/100)

    const percentageBefore = solvedPercentage.split(".")[0]
    const percentageAfter = solvedPercentage.split(".")[1] + "%";

    return (
        <svg
            id="circular_progress_container"
            onMouseOver={() => {
                setShowPercentage(true)
            }}
            onMouseOut={() => {
                setShowPercentage(false)
            }} 
            viewBox="0 0 160 160" 
            style={{transform:"rotate(-90deg)"}}
            className="h-[75%] w-[75%] flex items-start justify-start"
        >
            <circle id="base_circle" r={radius} cx="80" cy="80" 
                fill="transparent" 
                stroke="#e0e0e0"
                strokeWidth="5px" 
                opacity={0.3}
            />
            <circle 
                id="progress_circle"
                r={radius} cx="80" cy="80" 
                fill="transparent" stroke={"rgb(202,138,4)"}
                strokeWidth="6px" 
                strokeDasharray={circumference} 
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{borderRadius:"50%"}}
            >
                <animate id="animate_progress_circle" attributeName="stroke-dashoffset" values={`360;${offset}`} dur="2s"></animate>
            </circle>

            <text
                id="progress_percentage"
                x="50%" y="50%" 
                fill={primaryColor} fontSize="30px" 
                textAnchor="middle" 
                fontWeight="bold"
                style={{transform:"rotate(90deg) translate(0, -156px)"}}
            >   
                {showPercentage ? percentageBefore : totalSolved}
                {showPercentage && <tspan fontSize="12px">{"." + percentageAfter}</tspan>}
            </text>
            
            <text
                id="progress_label"
                x="62px" y="100px"
                fill={secondaryColor} fontSize="12px" 
                style={{transform:"rotate(90deg) translate(0, -156px)"}}
            >   
                solved
            </text>
        </svg>
    )
}

export default OverallProgress