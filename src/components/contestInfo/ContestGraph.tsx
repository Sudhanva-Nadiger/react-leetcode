import { useMemo } from "react";
import '../../index.css';
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


/**
 * Component for rendering a line chart.
 * 
 * @param {object} props - Props for the LineChart component.
 * @param {ContestInfo[]} props.data - The data points for the line chart.
 * @param {number} [props.height=150] - The height of the chart.
 * @param {number} [props.width=500] - The width of the chart.
 * @param {number} [props.precision=2] - The precision of the chart.
 * @param {number} props.activeIndex - The index of the active data point.
 * @param {function} props.setActiveIndex - Function to set the active index.
 * 
 * @returns A React component for rendering a line chart.
 */
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

    if(values === undefined) return <></>

    const {
        padding,
        chartWidth,
        chartHeight,
        maximumXFromData,
        maximumYFromData
    } = values;

    return (
        <svg
            viewBox={`0 30 ${width} ${height}`}
            id="line_chart_container"
            style={{
                transform: 'scaleY(0.7)'
            }}
        >
            <LabelsXAxis
                height={height}
                width={width}
                data={[data[0], data[data.length - 1]]}
                {...values}
            />

            <polyline
                width={"100%"}
                height={"50"}
                id="line_chart_path"
                className="w-full"
                fill="none"
                stroke="rgb(202,138,4)"
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
                        fill="rgb(202,138,4)"
                    />
                ))}
            </g>
        </svg>
    );
};

export default LineChart;