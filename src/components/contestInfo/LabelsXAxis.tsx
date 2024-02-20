import { ContestInfo } from '../../types';

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
                    fontFamily: "Helvetica",
                }}
            >
                {year}
            </text>
        );
    });
};

export default LabelsXAxis