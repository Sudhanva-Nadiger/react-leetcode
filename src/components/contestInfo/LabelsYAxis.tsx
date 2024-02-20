type Props = {
    FONT_SIZE: number,
    chartHeight: number,
    padding: number,
    maximumYFromData: number,
    data: number[][]
}

const LabelsYAxis = ({
    FONT_SIZE,
    data
}: Props) => {
    const PARTS = data.length;
    return new Array(PARTS).fill(0).map((_, index) => {
      const x = FONT_SIZE;

      return (
        <text
          key={index}
          x={x}
          y={data[index][1]}
          style={{
            fill: "#808080",
            fontSize: FONT_SIZE,
            fontFamily: "Helvetica",
            transform: "translate(0px, 30px)"
          }}
        >
          {(data[index][0]).toFixed(0)}
        </text>
      );
    
    })
}

export default LabelsYAxis;