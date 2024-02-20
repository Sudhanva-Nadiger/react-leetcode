import { useMemo } from "react";

import { ContestInfo } from "../../types";
import { LineChartCalculations } from "../../utils";

import LabelsXAxis from "./LabelsXAxis";
const STROKE = 1;

type Props = {
    data: (ContestInfo & { x: number, y: number })[];
    height?: number;
    width?: number;
    precision?: number;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}

const LineChart = ({
    data,
    height = 150,
    width = 500,
    precision = 2,
    activeIndex,
    setActiveIndex
}: Props) => {

    const values = useMemo(
        () => LineChartCalculations(width, height, data, precision), 
        [data, height, precision, width]
    );

    const {
        padding,
        chartWidth,
        chartHeight,
        maximumXFromData,
        maximumYFromData
    } = values;

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            id="line_chart_container"
        >
            <LabelsXAxis 
                height={height} 
                width={width} 
                data={[data[0], data[data.length - 1]]} 
                {...values} 
            />

            <polyline
                id="line_chart_path"
                className="w-full"
                fill="none"
                stroke="#0074d9"
                strokeWidth={STROKE}
                points={values.points}
            />

            <g id="line_chart_points">
                {data.map((element, index) => (
                    <circle
                        id={`point_${index}`}
                        onPointerMove={() => setActiveIndex(index)}
                        onPointerLeave={() => setActiveIndex(-1)}
                        key={index}
                        cx={(element.x / maximumXFromData) * chartWidth + padding}
                        cy={(element.y / maximumYFromData) * chartHeight + padding}
                        r={STROKE * (activeIndex === index ? 3 : 2)}
                        fill="#0074d9"
                    />
                ))}
            </g>
        </svg>
    );
};

export default LineChart;