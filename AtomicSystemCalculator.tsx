import { useState, useEffect } from "react";

export default function AtomicSystemCalculator() {
  const [snList, setSnList] = useState<string[]>([]);
  const [inputSN, setInputSN] = useState("");
  const [inputP, setInputP] = useState("");
  const [result, setResult] = useState<string | null>(null);

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

  const calculatePValues = (i: number) => {
    let possibleP: number[] = [];
    let j = 0;
    let minP = i % 2 === 0 ? i / 2 : (i + 1) / 2;

    for (j = 0; j <= i - minP; j++) {
      let D = i % 2 === 0 ? i / 2 - j : (i - 1) / 2 - j;
      let S = i % 2 === 0 ? 2 * j : 1 + 2 * j;
      possibleP.push(D + S);
    }

    return possibleP;
  };

  const calculateDS = (i: number, P: number) => {
    let j = P - (i % 2 === 0 ? i / 2 : (i + 1) / 2);
    if (j < 0 || j > i - (i % 2 === 0 ? i / 2 : (i + 1) / 2)) return "NOT";

    let D = i % 2 === 0 ? i / 2 - j : (i - 1) / 2 - j;
    let S = i % 2 === 0 ? 2 * j : 1 + 2 * j;

    return `D${D},S${S}`;
  };

  const handleCalculate = () => {
    let i = snList.indexOf(inputSN) + 1;
    let P = parseInt(inputP);

    if (inputSN && i > 0) {
      let possibleP = calculatePValues(i);
      if (!inputP) {
        setResult(`i=${i} P=${possibleP.join(",")}`);
      } else {
        let dsResult = calculateDS(i, P);
        setResult(dsResult === "NOT" ? `i=${i} NOT` : dsResult);
      }
    } else {
      setResult("Invalid SN input");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Atomic System Calculator</h2>

      {snList.length > 0 ? (
        <>
          <div className="mb-2">
            <label className="block text-sm font-medium">SN (例: HT-A)</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={inputSN}
              onChange={(e) => setInputSN(e.target.value.toUpperCase())}
              placeholder="Enter SN..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">P (1-52)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={inputP}
              onChange={(e) => setInputP(e.target.value)}
              placeholder="Enter P..."
            />
          </div>
          <button
            onClick={handleCalculate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            計算
          </button>
        </>
      ) : (
        <p className="text-gray-500">AtomicSystem.csv を読み込んでいます...</p>
      )}

      {result && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          {result}
        </div>
      )}
    </div>
  );
}
