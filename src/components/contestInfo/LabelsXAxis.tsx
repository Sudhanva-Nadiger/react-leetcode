import { ContestInfo } from '../../types';

type Props = {
    height: number;
    width: number;
    padding: number;
    chartWidth: number;
    data: (ContestInfo & { x: number, y: number })[];
    maximumXFromData: number;
    FONT_SIZE: number;
}

const LabelsXAxis = ({
    data,
    height,
    padding,
    chartWidth,
    maximumXFromData,
    FONT_SIZE
}: Props) => {
    const y = height - padding + FONT_SIZE * 2;

    return data.map((element, index) => {
        const x =
            (element.x / maximumXFromData) * chartWidth + padding - FONT_SIZE / 2;
        const display = ((index === 0) || (index === data.length - 1)) ? "block" : "none";
        return (
            <text
                key={index}
                x={x}
                y={y}
                style={{
                    fill: "red",
                    fontSize: FONT_SIZE,
                    fontFamily: "Helvetica",
                    display: display
                }}
            >
                {new Date(element.contest.startTime * 1000).getFullYear()}
            </text>
        );
    });
};

export default LabelsXAxis