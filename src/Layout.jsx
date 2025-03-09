import React from "react";

// 共通パラメータ（変更可能な変数）
// ヘッダー（i,P / D,S）の表示スタイル
const TOP_DISPLAY_STYLE = { 
  fontSize: "15px", 
  marginTop: "0px", 
  backgroundColor: "#555555", // カラーコードで指定可能（例：#555555）
  textAlign: "center", 
  padding: "5px"
}; 

// 画面上左上（SN, P）の表示スタイル
const SN_DISPLAY_STYLE = { 
  fontSize: "50px", 
  marginTop: "10px"
};

// ボタンのフォントサイズ
const BUTTON_FONT_SIZE = "25px";

// グラデーションボタン用のスタイル
const BUTTON_GRADIENT = { 
  background: "linear-gradient(to bottom, #E0E0E0, #B0B0B0)" // 変更可能なカラーコード
};

// ボタンコンテナのスタイル（PC とスマホで分岐）
const isMobile = window.innerWidth < 768; // スマホ判定（768px 以下）
const BUTTON_CONTAINER_STYLE = isMobile 
  ? { 
      width: "100vw", 
      position: "fixed", 
      bottom: "0", 
      left: "50%", 
      transform: "translateX(-50%)", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center"
    }
  : { 
      width: "100%", 
      maxWidth: "400px", 
      margin: "0 auto" 
    };

// ページ全体のスタイル：スマホの場合はスクロールを防止し、すべて固定表示
const PAGE_CONTAINER_STYLE = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: "hidden"
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
      {/* ヘッダー：画面中央上部に i,P または D,S を表示 */}
      {currentScreen === 1 ? (
        <header style={TOP_DISPLAY_STYLE}>{atomicDisplay}</header>
      ) : currentScreen === 2 && dValue ? (
        <header style={TOP_DISPLAY_STYLE}>{dValue}</header>
      ) : null}

      {/* 画面上左上：SN と入力された文字列 */}
      <div className="display" style={SN_DISPLAY_STYLE}>
        <div>{cardSuit}{cardValue}</div>
        {currentScreen === 2 && numberInput && <div>{numberInput}</div>}
      </div>

      {/* ボタンレイアウト */}
      {!isHidden ? (
        <div className="button-container" style={BUTTON_CONTAINER_STYLE}>
          {currentScreen === 1 ? (
            <>
              <div className="row">
                <button
                  className="symbol-button"
                  style={{ fontSize: BUTTON_FONT_SIZE, ...BUTTON_GRADIENT }}
                  onClick={() => handleCardClick("♥")}
                >
                  ♥
                </button>
                <button
                  className="symbol-button"
                  style={{ fontSize: BUTTON_FONT_SIZE, ...BUTTON_GRADIENT }}
                  onClick={() => handleCardClick("♣")}
                >
                  ♣
                </button>
                <button
                  className="symbol-button"
                  style={{ fontSize: BUTTON_FONT_SIZE, ...BUTTON_GRADIENT }}
                  onClick={() => handleCardClick("♦")}
                >
                  ♦
                </button>
                <button
                  className="symbol-button"
                  style={{ fontSize: BUTTON_FONT_SIZE, ...BUTTON_GRADIENT }}
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
                    style={{ fontSize: BUTTON_FONT_SIZE, ...BUTTON_GRADIENT }}
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
                    style={{ fontSize: BUTTON_FONT_SIZE, ...BUTTON_GRADIENT }}
                    onClick={() => handleCardClick(displayText[0] + num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="row">
                <button
                  className="delete-button"
                  style={{ fontSize: BUTTON_FONT_SIZE, ...BUTTON_GRADIENT }}
                  onClick={() => handleCardClick("×")}
                >
                  ×
                </button>
                {["J", "Q", "K"].map((face) => (
                  <button
                    key={face}
                    className="num-button"
                    style={{ fontSize: BUTTON_FONT_SIZE, ...BUTTON_GRADIENT }}
                    onClick={() => handleCardClick(displayText[0] + face)}
                  >
                    {face}
                  </button>
                ))}
                <button
                  className="ok-button"
                  style={{ fontSize: BUTTON_FONT_SIZE, ...BUTTON_GRADIENT }}
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
                      style={{ fontSize: BUTTON_FONT_SIZE, ...BUTTON_GRADIENT }}
                      onClick={() =>
                        val === "×"
                          ? handlePositionReset()
                          : val === "〇"
                          ? setIsHidden(true)
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
      ) : (
        // トグルボタン：ボタン群非表示時、画面右下最下部に固定
        <button
          className="toggle-button"
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            fontSize: BUTTON_FONT_SIZE,
            ...BUTTON_GRADIENT
          }}
          onClick={() => setIsHidden(false)}
        >
          ^
        </button>
      )}
    </div>
  );
}
