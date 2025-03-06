import React, { useState } from "react";

export default function App() {
  const [selectedSymbol, setSelectedSymbol] = useState("");

  const handleClick = (symbol) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div className="app">
      {/* 左上の表示領域 */}
      <div className="display">{selectedSymbol}</div>

      {/* ボタンコンテナ */}
      <div className="button-container">
        <button className="symbol-button" onClick={() => handleClick("HT")}>♡</button>
        <button className="symbol-button" onClick={() => handleClick("CL")}>♧</button>
        <button className="symbol-button" onClick={() => handleClick("DM")}>♢</button>
        <button className="symbol-button" onClick={() => handleClick("SP")}>♤</button>
      </div>
    </div>
  );
}
