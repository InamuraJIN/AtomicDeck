import React, { useState, useEffect } from "react";
import Layout from "./Layout";

export default function App() {
  // カード入力用の状態
  const [cardSuit, setCardSuit] = useState("");   // 例: "♥"
  const [cardValue, setCardValue] = useState("");   // 例: "10" または "A" など
  const [displayText, setDisplayText] = useState([]);
  
  // 位置入力用の状態（配置例02）
  const [numberInput, setNumberInput] = useState("");
  // CSVデータ（AtomicSystem.csv）の内容（各行を文字列として保持）
  const [snList, setSnList] = useState([]);
  // CSVから算出した結果（例："i=8 P=4-8"）
  const [atomicDisplay, setAtomicDisplay] = useState("");  
  // 画面2で計算された D,S の表示用
  const [dValue, setDValue] = useState("");  
  // 画面切替（1: カード入力画面、2: 位置入力画面）
  const [currentScreen, setCurrentScreen] = useState(1);
  // ボタン隠し（〇ボタン押下後のトグル用）
  const [isHidden, setIsHidden] = useState(false);

  // CSV読み込み
  useEffect(() => {
    fetch("/AtomicSystem.csv")
      .then((response) => response.text())
      .then((text) => {
        const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
        if (lines[0] === "SN") lines.shift();
        setSnList(lines);
      })
      .catch((error) => console.error("CSV読み込みエラー:", error));
  }, []);

  // カード入力完了後、CSVを参照して atomicDisplay を更新する
  useEffect(() => {
    if (cardSuit && cardValue && snList.length > 0) {
      const suitMapping = { "♥": "HT", "♣": "CL", "♦": "DM", "♠": "SP" };
      const inputSN = suitMapping[cardSuit] + "-" + cardValue;
      const i = snList.indexOf(inputSN) + 1; // 存在しなければ 0 になる
      if (i > 0) {
        const possibleP = calculatePValues(i);
        const minP = Math.min(...possibleP);
        const maxP = Math.max(...possibleP);
        setAtomicDisplay(`i=${i} P=${minP}-${maxP}`);
      } else {
        setAtomicDisplay("SN not found");
      }
    }
  }, [cardSuit, cardValue, snList]);

  // P値算出関数
  const calculatePValues = (i) => {
    let possibleP = [];
    const minP = i % 2 === 0 ? i / 2 : (i + 1) / 2;
    for (let j = 0; j <= i - minP; j++) {
      const D = i % 2 === 0 ? i / 2 - j : (i - 1) / 2 - j;
      const S = i % 2 === 0 ? 2 * j : 1 + 2 * j;
      possibleP.push(D + S);
    }
    return possibleP;
  };

  // 画面1：カード入力用の処理（添付ファイルの状態そのまま）
  const handleCardClick = (value) => {
    if (value === "×") {
      setCardSuit("");
      setCardValue("");
      setAtomicDisplay("");
      setDisplayText([]);
    } else if (value === "〇") {
      if (cardSuit && cardValue) {
        setCurrentScreen(2);
        setNumberInput("");
        setDValue("");
      }
    } else {
      if (["♥", "♣", "♦", "♠"].includes(value)) {
        setCardSuit(value);
        setDisplayText([value]);
      } else {
        let newValue = value;
        if (cardSuit && value.startsWith(cardSuit)) {
          newValue = value.substring(cardSuit.length);
        }
        setCardValue(newValue);
        setDisplayText([cardSuit, newValue]);
      }
    }
  };

  // 画面2：位置入力用の処理（添付ファイルの状態そのまま）
  const handlePositionClick = (digit) => {
    let candidate;
    if (numberInput.length < 2) {
      candidate = numberInput + digit;
    } else {
      candidate = numberInput.slice(1) + digit;
    }
    const candidateInt = parseInt(candidate, 10);
    if (candidateInt <= 52) {
      setNumberInput(candidate);
      setAtomicDisplay("");  // i, P の表示を消す
      calculateDandS(candidateInt);
    } else {
      setNumberInput(digit);
      setAtomicDisplay("");
      calculateDandS(parseInt(digit, 10));
    }
  };

  // D, S の計算
  const calculateDandS = (position) => {
    if (position > 0) {
      const D = Math.floor(position / 2);
      const S = position - D;
      setDValue(`D=${D} S=${S}`);
    } else {
      setDValue("");
    }
  };

  // 位置入力リセット（×押下時）：画面1に戻る際、SNは保持しつつ i, P を再取得
  const handlePositionReset = () => {
    setNumberInput("");
    setDValue("");
    if (cardSuit && cardValue) {
      const suitMapping = { "♥": "HT", "♣": "CL", "♦": "DM", "♠": "SP" };
      const inputSN = suitMapping[cardSuit] + "-" + cardValue;
      const i = snList.indexOf(inputSN) + 1;
      if (i > 0) {
        const possibleP = calculatePValues(i);
        const minP = Math.min(...possibleP);
        const maxP = Math.max(...possibleP);
        setAtomicDisplay(`i=${i} P=${minP}-${maxP}`);
      } else {
        setAtomicDisplay("SN not found");
      }
    }
    setCurrentScreen(1);
  };

  return (
    <Layout
      cardSuit={cardSuit}
      cardValue={cardValue}
      displayText={displayText}
      numberInput={numberInput}
      atomicDisplay={atomicDisplay}
      dValue={dValue}
      currentScreen={currentScreen}
      isHidden={isHidden}
      handleCardClick={handleCardClick}
      handlePositionClick={handlePositionClick}
      handlePositionReset={handlePositionReset}
    />
  );
}
