import React, { useState } from "react";

export default function App() {
  const [displayText, setDisplayText] = useState([]); // 左上の表示
  const [currentScreen, setCurrentScreen] = useState(1); // 1: マークとカードの選択, 2: 数字の入力
  const [isHidden, setIsHidden] = useState(false); // ボタンを隠すかどうか

  // ボタンを押したときの処理
  const handleCardClick = (value) => {
    if (value === "×") {
      setDisplayText([]); // 入力をリセット
      setCurrentScreen(1); // 初期画面に戻す
    } else if (value === "〇") {
      setCurrentScreen(2); // 数字入力画面へ
    } else {
      setDisplayText([value]); // カードをセット
    }
  };

  const handleNumberClick = (value) => {
    if (value === "×") {
      setDisplayText([]); // 入力をリセット
      setCurrentScreen(1); // 初期画面に戻す
    } else if (value === "〇") {
      setIsHidden(true); // ボタンを隠す
    } else {
      // 数値を追加（1~52のみ許可）
      const number = parseInt(value, 10);
      if (number >= 1 && number <= 52) {
        setDisplayText((prev) => [...prev, value]);
      }
    }
  };

  return (
    <div className="app">
      {/* 左上の表示領域 */}
      <div className="display">
        {displayText.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>

      {/* 右下の^ボタン（隠されたボタンを再表示） */}
      {isHidden && (
        <button className="toggle-button" onClick={() => setIsHidden(false)}>^</button>
      )}

      {/* ボタン表示エリア */}
      {!isHidden && (
        <div className="button-container">
          {currentScreen === 1 ? (
            // ボタン配置例01（カード選択）
            <>
              <div className="row">
                <button className="symbol-button" onClick={() => handleCardClick("♥")}>♥</button>
                <button className="symbol-button" onClick={() => handleCardClick("♣")}>♣</button>
                <button className="symbol-button" onClick={() => handleCardClick("♦")}>♦</button>
                <button className="symbol-button" onClick={() => handleCardClick("♠")}>♠</button>
              </div>
              <div className="row">
                {["A", "2", "3", "4", "5"].map((num) => (
                  <button key={num} className="num-button" onClick={() => handleCardClick(displayText[0] + num)}>
                    {num}
                  </button>
                ))}
              </div>
              <div className="row">
                {["6", "7", "8", "9", "10"].map((num) => (
                  <button key={num} className="num-button" onClick={() => handleCardClick(displayText[0] + num)}>
                    {num}
                  </button>
                ))}
              </div>
              <div className="row">
                <button className="delete-button" onClick={() => handleCardClick("×")}>×</button>
                {["J", "Q", "K"].map((face) => (
                  <button key={face} className="num-button" onClick={() => handleCardClick(displayText[0] + face)}>
                    {face}
                  </button>
                ))}
                <button className="ok-button" onClick={() => handleCardClick("〇")}>〇</button>
              </div>
            </>
          ) : (
            // ボタン配置例02（数字入力）
            <>
              {[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["×", "0", "〇"]].map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                  {row.map((num) => (
                    <button
                      key={num}
                      className={num === "×" ? "delete-button" : num === "〇" ? "ok-button" : "num-button"}
                      onClick={() => handleNumberClick(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
