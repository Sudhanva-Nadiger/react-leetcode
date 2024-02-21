import { ContestInfo } from "../types";

export function getPath(url: string) {
    const arr = url.split('/')
    return arr[arr.length-1];
}

export function getCordinates(history: ContestInfo[]) {
    if(history.length === 0) return [];

    if(history.length === 1) return [{
        x: 0,
        y: 0,
        ...history[0]
    }]
    const startTime = history[0].contest.startTime;
    const endTime = history[history.length - 1].contest.startTime;
    const [minRating, maxRating] = history.reduce(
        ([min, max], { rating }) => [Math.min(min, rating), Math.max(max, rating)],
        [Infinity, -Infinity],
    );

    const width = 500;
    const height = 150;

    const x_scale = width / (endTime - startTime);
    const y_scale = height / (maxRating - minRating);

    const points = history.map((d) => {
        const { rating } = d;
        const time = d.contest.startTime;
        const x = Math.round((time - startTime) * x_scale);
        const y = Math.round((maxRating - rating) * y_scale);
        
        return {
        x,
        y,
        ...d
        };
    });

    return points;
}

export function LineChartCalculations(width: number, height: number, data: (ContestInfo & { x: number, y: number })[], precision: number) {
    if(data.length === 0) return undefined;

    const FONT_SIZE = width / 50;

    const maximumXFromData = Math.max(...data.map(e => e.x)) || 1;
    const maximumYFromData = Math.max(...data.map(e => e.y)) || 1;

    const digits =
        parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;

    const padding = (FONT_SIZE + digits) * 2;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = data.map((element) => {
                const x = (element.x / maximumXFromData) * chartWidth + padding;
                const y = (element.y / maximumYFromData) * chartHeight + padding;
                return `${x},${y}`;
            }).join(" ");

    return {
        FONT_SIZE,
        padding,
        maximumXFromData,
        maximumYFromData,
        chartHeight,
        chartWidth,
        points
    }
}

export function calcOpacity(count: number, max = 8): number {
    return Math.sin(Math.min(1, (count + 0.5) / max) * Math.PI * 0.5);
}
