import { ContestInfo } from "../types";

/**
 * Extracts the last segment of a URL path.
 * @param {string} url - The URL from which to extract the path.
 * @returns {string} The last segment of the URL path.
 * @example
 * // returns 'page.html'
 * getPath('https://example.com/path/to/page.html');
 */
export function getPath(url: string): string {
    const arr = url.split('/')
    return arr[arr.length-1];
}

/**
 * Calculates coordinates for plotting a rating history graph based on contest information.
 * @param {ContestInfo[]} history - Array of contest information representing rating history.
 * @returns {object[]} An array of objects containing x and y coordinates along with contest information.
 */
export function getCordinates(history: ContestInfo[]): ({ x: number, y: number } & ContestInfo)[]{
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

/**
 * Calculates various parameters required for rendering a line chart.
 * @param {number} width - The width of the chart area.
 * @param {number} height - The height of the chart area.
 * @param {Array<ContestInfo & { x: number, y: number }>} data - Array of data points with x and y coordinates.
 * @param {number} precision - The precision of the data values.
 * @returns  An object containing calculated parameters for rendering the chart, or undefined if data is empty.
 */
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

/**
 * Calculates opacity based on the count and maximum value.
 * @param {number} count - The count value.
 * @param {number} [max=8] - The maximum value. Default is 8.
 * @returns {number} The calculated opacity value.
 */
export function calcOpacity(count: number, max: number = 8): number {
    return Math.sin(Math.min(1, (count + 0.5) / max) * Math.PI * 0.5);
}
