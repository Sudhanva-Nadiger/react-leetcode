import { Fragment } from "react";

type Props = {
    padding: number;
    width: number;
    height: number;
    chartHeight: number;
    numberOfHorizontalGuides: number;
    data: number[][]
}

const HorizontalGuides = ({
    padding,
    width,
    numberOfHorizontalGuides,
    data
}: Props) => {
    const startX = padding;
    const endX = width - padding;

    return new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
      return (
        <Fragment key={index}>
          <polyline
            style={{
                transform: "translate(2px, 30px)"
            }}
            fill="none"
            stroke={"#ccc"}
            strokeWidth=".5"
            points={`${startX},${data[index][1]} ${endX},${data[index][1]}`}
          />
        </Fragment>
      );
    });
};

export default HorizontalGuides;