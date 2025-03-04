import { useState } from "react";

export default function App() {
  const [sn, setSn] = useState("♣3");
  const [p, setP] = useState(8);
  const [result, setResult] = useState(null);

  const calculate = async () => {
    const response = await fetch(`http://localhost:8000/calculate?sn=${sn}&p=${p}`);
    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">D, S 計算アプリ</h2>

        <div className="mb-3">
          <label className="block">SN (スートナンバー):</label>
          <input
            type="text"
            value={sn}
            onChange={(e) => setSn(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mb-3">
          <label className="block">P (ポジション):</label>
          <input
            type="number"
            value={p}
            onChange={(e) => setP(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>

        <button onClick={calculate} className="bg-blue-500 text-white px-4 py-2 rounded">
          計算
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            {result.result ? (
              <p className="text-red-500">{result.result}</p>
            ) : (
              <p>D: {result.D}, S: {result.S}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
