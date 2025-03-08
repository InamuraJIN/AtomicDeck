import React from "react";

// 共通パラメータ（上部にまとめた変数）
// これらの変数は、画面中央上部に表示される i, P と D, S の位置やフォントサイズ、
// 画面上左上に表示される SN と P のフォントサイズおよび位置、
// そして、ボタンのフォントサイズ・表示位置に利用されます。

const TOP_DISPLAY_STYLE = { fontSize: "15px", marginTop: "20px" };   // 画面中央上部 (i,P / D,S) の表示スタイル
const SN_DISPLAY_STYLE = { fontSize: "50px", marginTop: "60px" };       // 画面上左上 (SN,P) の表示スタイル
const BUTTON_FONT_SIZE = "40px";                                      // ボタンのフォントサイズ
// ボタンの表示位置は、既存の CSS やレイアウト構造に従います。

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
    <div className="app">
      <div className="atomic-display" style={TOP_DISPLAY_STYLE}>
        {atomicDisplay}
      </div>

      <div className="display" style={SN_DISPLAY_STYLE}>
        <div>{cardSuit}{cardValue}</div>
        {currentScreen === 2 && numberInput && <div>{numberInput}</div>}
      </div>

      {currentScreen === 2 && dValue && (
        <div className="atomic-display" style={TOP_DISPLAY_STYLE}>
          {dValue}
        </div>
      )}

      {!isHidden && (
        <div className="button-container">
          {currentScreen === 1 ? (
            <>
              <div className="row">
                <button
                  className="symbol-button"
                  style={{ fontSize: BUTTON_FONT_SIZE }}
                  onClick={() => handleCardClick("♥")}
                >
                  5
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
