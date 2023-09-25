import React, { useState, useEffect, useRef } from "react";
// import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import "./project.css";

const NumberedInputList = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([{ lineNumber: 1, text: "" }]);
  const [separatorHeight, setSeparatorHeight] = useState("100%");
  const [error, setError] = useState({ errorCode: 0, errorText: "" }); // Initial height

  const innerContainerRef = useRef(null);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleExecute = () => {
    const newOutput = [
      ...output,
      { lineNumber: output.length + 1, text: input },
    ];
    if (
      input.length != 42
    ) {
      setError({
        errorCode: 1,
        errorText: `Error: Line ${JSON.stringify(output.pop().lineNumber)} Invalid Ethereum address and wrong amount`,
      });
    }
    else if (
      input.charAt(0) != "0" &&
      input.charAt(1) != "x"
    ) {
      setError({
        errorCode: 1,
        errorText: `Error: Line ${output.map(
          (item) => item.lineNumber
        )} Invalid Ethereum address`,
      });
    }
    setOutput(newOutput);
    setInput("");
  };

  const updateSeparatorHeight = () => {
    if (innerContainerRef.current) {
      const scrollHeight = innerContainerRef.current.scrollHeight;
      const clientHeight = innerContainerRef.current.clientHeight;
      const heightPercentage = (clientHeight / scrollHeight) * 100 + "%";
      setSeparatorHeight(heightPercentage);
    }
  };


  useEffect(() => {}, []);
  return (
    <div className="outer-container">
      <div className="upper-heading">
        <span>Address with Amounts</span>
        <span>Upload File</span>
      </div>
      <div className="inner-container" ref={innerContainerRef}>
        <div class="left">
          <p>
            <div>
              <pre>
                {output.map((item) => (
                  <div key={item.lineNumber}>
                    <span>{item.lineNumber}</span>
                  </div>
                ))}
              </pre>
            </div>
          </p>
        </div>
        <div className="separator" style={{ minHeight: separatorHeight }}></div>
        <div class="right">
          <pre>
            {output.map((item) => (
              <div key={item.text}>
                <span>{item.text}</span>
              </div>
            ))}
          </pre>
          <input value={input} onChange={handleInputChange}></input>
        </div>
      </div>
      <div className="below-discription">
        <span>Separated by ',' or '' or '='</span>
        <span style={{ color: "rgba(234, 240, 246, 0.6)" }}>Show Example</span>
      </div>
      {error && error.errorCode != 0 && (
        <span className="error-container">
          {" "}
          {error && error.errorCode != 0 ? error.errorText : ""}{" "}
        </span>
      )}
      <button
        class="px-6 py-2 text-purple-100 rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
        style={{
          marginTop: "10px",
          marginLeft: "15px",
          marginRight: "15px",
          marginBottom: "15px",
        }}
        onClick={handleExecute}
      >
        Next
      </button>
    </div>
  );
};

export default NumberedInputList;
