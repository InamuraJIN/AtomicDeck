import React, { useState } from "react";
import { Layout } from "./Layout";
import './App.css';

export default function App() {
  const [headerStatus, setHeaderStatus] = useState(1);
  const [navigation, setNavigation] = useState(1);
  const [inputSN, setInputSN] = useState("");
  const [inputP, setInputP] = useState("");
  const [showButtons, setShowButtons] = useState(true);
  const [showUp, setShowUp] = useState(false);

  // Function to handle digit button presses
  const onPressDigit = (digit) => {
    if (navigation === 1) {
      if (inputSN.length < 2) {
        setInputSN(inputSN + digit.toString());
      }
    } else {
      if (inputP.length < 2) {
        setInputP(inputP + digit.toString());
      }
    }
  };

  // Function to handle Circle button press
  const onPressCircle = () => {
    if (navigation === 1) {
      // On screen 1, retain header text and navigate to screen 2
      setNavigation(2);
      // Header remains with the same status and content
    } else {
      // On screen 2, hide buttons and show up arrow
      setShowButtons(false);
      setShowUp(true);
      setHeaderStatus(2); // Switch to displaying D/S values
    }
  };

  // Function to handle Reset button press
  const onPressReset = () => {
    if (navigation === 1) {
      setInputSN("");
    } else {
      setInputP("");
    }
  };

  // Function to handle up arrow press
  const onPressUp = () => {
    setShowButtons(true);
    setShowUp(false);
    setNavigation(1);
    setHeaderStatus(1);
    // Reset input values
    setInputSN("");
    setInputP("");
  };

  return (
    <div className="app-container">
      {showButtons ? (
        <Layout
          headerStatus={headerStatus}
          inputSN={inputSN}
          inputP={inputP}
          navigation={navigation}
          onPressDigit={onPressDigit}
          onPressCircle={onPressCircle}
          onPressReset={onPressReset}
        />
      ) : (
        <div className="upArrowContainer">
          {/* Display the fixed header when buttons are hidden */}
          <div className="fixedHeader">
            <div className="headerText">
              {(() => {
                const B1 = Number(inputSN) || 0;
                const B2 = Number(inputP) || 0;
                
                // Formula: =IF(OR(B1-B2<0, B2-(B1-B2)<0), "NON", "D:" & (B1 - B2) & " S:" & (B2 - (B1 - B2)))
                if ((B1-B2) < 0 || (B2-(B1-B2)) < 0) {
                  return "NON";
                } else {
                  return `D:${B1-B2} S:${B2-(B1-B2)}`;
                }
              })()}
            </div>
          </div>
          
          {/* Display fixed position value when showing up arrow */}
          <div className="fixedPosition">
            <div className="positionText">{inputP}</div>
          </div>
          
          {/* Up arrow for returning to input mode */}
          <button className="upArrow" onClick={onPressUp}>
            <span className="upArrowText">^</span>
          </button>
        </div>
      )}
    </div>
  );
}