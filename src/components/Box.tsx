const Box = ({
  box,
  index,
  handleChange,
  isEvenRow,
  isEvenCol,
}: {
  box: number;
  index: number;
  handleChange: (index: number) => void;
  isEvenRow: boolean;
  isEvenCol: boolean;
}) => {
  return (
    <div
      key={`row_${index}`}
      className={`board-item ${box ? "active" : ""}`}
      onClick={() => handleChange(index)}
      style={{
        backgroundColor:
          (!isEvenRow && !isEvenCol) ||
          (isEvenRow && isEvenCol)
            ? "white"
            : "black",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50px",
        width: "50px",
        border: "1px solid black",
      }}
    >
    </div>
  );
};

export default Box;
