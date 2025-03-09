import React from "react";

// 共通パラメータ（変更可能な変数）
const TOP_DISPLAY_STYLE = { 
  fontSize: "15px", 
  marginTop: "0px", 
  backgroundColor: "#555555", // 例：#555555（カラーコード）
  textAlign: "center", 
  padding: "5px"
}; // ヘッダー（画面中央上部 i,P / D,S）の表示スタイル

const SN_DISPLAY_STYLE = { 
  fontSize: "50px", 
  marginTop: "10px"
}; // 画面上左上 (SN,P) の表示スタイル

const BUTTON_FONT_SIZE = "25px"; // ボタンのフォントサイズ

// ボタンコンテナのスタイル（PCとスマホで分岐）
const isMobile = window.innerWidth < 768; // スマホ判定（768px以下をスマホとする）
const BUTTON_CONTAINER_STYLE = isMobile 
  ? { 
      width: "100vw", 
      position: "fixed", 
      bottom: "0", 
      left: "50%", 
      transform: "translateX(-50%)" 
    }
  : { 
      width: "100%", 
      maxWidth: "400px", 
      margin: "0 auto" 
    };

// ページ全体のスタイル
const PAGE_CONTAINER_STYLE = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: isMobile ? "hidden" : "visible"
};

export default function Layout({
  cardSuit,
  cardValue,
  displayText,
  numberInput,
  atomicDisplay,
  dValue,
  currentScreen,
  isHidden,
  handleCardClick,
  handlePositionClick,
  handlePositionReset,
}) {
  return (
    <div className="app" style={PAGE_CONTAINER_STYLE}>
      <header style={TOP_DISPLAY_STYLE}>
        {currentScreen === 1 ? atomicDisplay : (currentScreen === 2 && dValue ? dValue : "")}
      </header>

      <div className="display" style={SN_DISPLAY_STYLE}>
        <div>{cardSuit}{cardValue}</div>
        {currentScreen === 2 && numberInput && <div>{numberInput}</div>}
      </div>

      {!isHidden && (
        <div className="button-container" style={BUTTON_CONTAINER_STYLE}>
          {currentScreen === 1 ? (
            <>
              <div className="row">
                <button
                  className="symbol-button"
                  style={{ fontSize: BUTTON_FONT_SIZE }}
                  onClick={() => handleCardClick("♥")}
                >
                  ♥
                </button>
                <button
                  className="symbol-button"
                  style={{ fontSize: BUTTON_FONT_SIZE }}
                  onClick={() => handleCardClick("♣")}
                >
                  ♣
                </button>
                <button
                  className="symbol-button"
                  style={{ fontSize: BUTTON_FONT_SIZE }}
                  onClick={() => handleCardClick("♦")}
                >
                  ♦
                </button>
                <button
                  className="symbol-button"
                  style={{ fontSize: BUTTON_FONT_SIZE }}
                  onClick={() => handleCardClick("♠")}
                >
                  ♠
                </button>
              </div>
              <div className="row">
                {["A", "2", "3", "4", "5"].map((num) => (
                  <button
                    key={num}
                    className="num-button"
                    style={{ fontSize: BUTTON_FONT_SIZE }}
                    onClick={() => handleCardClick(displayText[0] + num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="row">
                {["6", "7", "8", "9", "10"].map((num) => (
                  <button
                    key={num}
                    className="num-button"
                    style={{ fontSize: BUTTON_FONT_SIZE }}
                    onClick={() => handleCardClick(displayText[0] + num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="row">
                <button
                  className="delete-button"
                  style={{ fontSize: BUTTON_FONT_SIZE }}
                  onClick={() => handleCardClick("×")}
                >
                  ×
                </button>
                {["J", "Q", "K"].map((face) => (
                  <button
                    key={face}
                    className="num-button"
                    style={{ fontSize: BUTTON_FONT_SIZE }}
                    onClick={() => handleCardClick(displayText[0] + face)}
                  >
                    {face}
                  </button>
                ))}
                <button
                  className="ok-button"
                  style={{ fontSize: BUTTON_FONT_SIZE }}
                  onClick={() => handleCardClick("〇")}
                >
                  〇
                </button>
              </div>
            </>
          ) : (
            <>
              {[
                ["1", "2", "3"],
                ["4", "5", "6"],
                ["7", "8", "9"],
                ["×", "0", "〇"]
              ].map((row, idx) => (
                <div key={idx} className="row">
                  {row.map((val) => (
                    <button
                      key={val}
                      className={
                        val === "×"
                          ? "delete-button"
                          : val === "〇"
                          ? "ok-button"
                          : "num-button"
                      }
                      style={{ fontSize: BUTTON_FONT_SIZE }}
                      onClick={() =>
                        val === "×"
                          ? handlePositionReset()
                          : handlePositionClick(val)
                      }
                    >
                      {val}
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
