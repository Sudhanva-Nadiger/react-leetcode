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
}

const LineChart = ({
    data,
    height = 150,
    width = 500,
    precision = 2,
}: Props) => {

    const values = useMemo(
        () => LineChartCalculations(width, height, data, precision), 
        [data, height, precision, width]
    );

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
        >
            <LabelsXAxis 
                height={height} 
                width={width} 
                data={data} 
                {...values} 
            />

            <polyline
                fill="none"
                stroke="#0074d9"
                strokeWidth={STROKE}
                points={values.points}
            />
        </svg>
    );
};

export default LineChart;