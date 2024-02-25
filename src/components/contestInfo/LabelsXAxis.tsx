import { ContestInfo } from '../../types';
import '../../index.css';
type Props = {
    height: number;
    width: number;
    padding: number;
    chartWidth: number;
    data: (ContestInfo & { x: number, y: number })[];
    maximumXFromData: number;
    FONT_SIZE: number;
    secondaryColor?: string;
}


/**
 * Component for rendering labels on the X-axis of a chart.
 * 
 * @param {object} props - Props for the LabelsXAxis component.
 * @param {number} props.height - The height of the chart.
 * @param {number} props.width - The width of the chart.
 * @param {number} props.padding - The padding of the chart.
 * @param {number} props.chartWidth - The width of the chart area.
 * @param {Array<ContestInfo & { x: number, y: number }>} props.data - The data points for the X-axis labels.
 * @param {number} props.maximumXFromData - The maximum X-value from the data.
 * @param {number} props.FONT_SIZE - The font size of the labels.
 * @param {string} [props.secondaryColor="rgba(209,213,219,1)"] - The color of the labels.
 * 
 * @returns An array of JSX elements representing the X-axis labels.
 */

const LabelsXAxis = ({
    data,
    height,
    padding,
    chartWidth,
    maximumXFromData,
    FONT_SIZE,
    secondaryColor = "rgba(209,213,219,1)"
}: Props) => {
    const y = height - padding + FONT_SIZE * 2;

    return data.map((element, index) => {
        const x = (element.x / maximumXFromData) * chartWidth + padding - FONT_SIZE / 2;
        const year = new Date(element.contest.startTime * 1000).getFullYear()
        return (
            <text
                id={`x_axis_label_${index}`}
                key={index}
                x={x}
                y={y}
                style={{
                    fill: secondaryColor,
                    fontSize: FONT_SIZE,
                }}
            >
                {year}
            </text>
        );
    });
};

export default LabelsXAxis