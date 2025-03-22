import React from "react";

export const Layout = ({ headerStatus, inputSN, inputP, navigation, onPressButton, onPressDigit, onPressCircle, onPressReset }) => {
  // Function to display header text based on the provided formulas
  const getHeaderText = () => {
    const B1 = inputSN || 0;
    const B2 = inputP || 0;
    
    // Formula: ="P:" & TEXT(B1/2, "0") & "-" & B1
    const pText = `P:${Math.floor(B1/2)}-${B1}`;
    
    // Formula: =IF(OR(B1-B2<0, B2-(B1-B2)<0), "NON", "D:" & (B1 - B2) & " S:" & (B2 - (B1 - B2)))
    let dsText = "NON";
    if ((B1-B2) >= 0 && (B2-(B1-B2)) >= 0) {
      dsText = `D:${B1-B2} S:${B2-(B1-B2)}`;
    }
    
    return headerStatus === 1 ? pText : dsText;
  };

  return (
    <div className="container">
      {/* Fixed header */}
      <div className="fixedHeader">
        <div className="headerText">{getHeaderText()}</div>
      </div>

      {/* Main content area with scroll capability */}
      <div className="scrollContent">
        <div className="content">
          {navigation === 1 ? (
            <div className="inputSNContainer">
              <div className="inputSNText">{inputSN}</div>
            </div>
          ) : (
            <div className="inputPContainer">
              <div className="inputPText">{inputP}</div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed bottom buttons area */}
      <div className="buttonContainer">
        {navigation === 1 ? (
          <>
            <div className="buttonRow">
              <button className="button" onClick={() => onPressDigit(1)}>
                <span className="buttonText">1</span>
              </button>
              <button className="button" onClick={() => onPressDigit(2)}>
                <span className="buttonText">2</span>
              </button>
              <button className="button" onClick={() => onPressDigit(3)}>
                <span className="buttonText">3</span>
              </button>
            </div>
            <div className="buttonRow">
              <button className="button" onClick={() => onPressDigit(4)}>
                <span className="buttonText">4</span>
              </button>
              <button className="button" onClick={() => onPressDigit(5)}>
                <span className="buttonText">5</span>
              </button>
              <button className="button" onClick={() => onPressDigit(6)}>
                <span className="buttonText">6</span>
              </button>
            </div>
            <div className="buttonRow">
              <button className="button" onClick={() => onPressDigit(7)}>
                <span className="buttonText">7</span>
              </button>
              <button className="button" onClick={() => onPressDigit(8)}>
                <span className="buttonText">8</span>
              </button>
              <button className="button" onClick={() => onPressDigit(9)}>
                <span className="buttonText">9</span>
              </button>
            </div>
            <div className="buttonRow">
              <button className="button" onClick={onPressReset}>
                <span className="buttonText">C</span>
              </button>
              <button className="button" onClick={() => onPressDigit(0)}>
                <span className="buttonText">0</span>
              </button>
              <button className="button" onClick={onPressCircle}>
                <span className="buttonText">○</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="buttonRow">
              <button className="button" onClick={() => onPressDigit(1)}>
                <span className="buttonText">1</span>
              </button>
              <button className="button" onClick={() => onPressDigit(2)}>
                <span className="buttonText">2</span>
              </button>
              <button className="button" onClick={() => onPressDigit(3)}>
                <span className="buttonText">3</span>
              </button>
            </div>
            <div className="buttonRow">
              <button className="button" onClick={() => onPressDigit(4)}>
                <span className="buttonText">4</span>
              </button>
              <button className="button" onClick={() => onPressDigit(5)}>
                <span className="buttonText">5</span>
              </button>
              <button className="button" onClick={() => onPressDigit(6)}>
                <span className="buttonText">6</span>
              </button>
            </div>
            <div className="buttonRow">
              <button className="button" onClick={() => onPressDigit(7)}>
                <span className="buttonText">7</span>
              </button>
              <button className="button" onClick={() => onPressDigit(8)}>
                <span className="buttonText">8</span>
              </button>
              <button className="button" onClick={() => onPressDigit(9)}>
                <span className="buttonText">9</span>
              </button>
            </div>
            <div className="buttonRow">
              <button className="button" onClick={onPressReset}>
                <span className="buttonText">C</span>
              </button>
              <button className="button" onClick={() => onPressDigit(0)}>
                <span className="buttonText">0</span>
              </button>
              <button className="button" onClick={onPressCircle}>
                <span className="buttonText">○</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};