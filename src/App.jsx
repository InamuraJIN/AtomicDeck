import React, { useState } from "react";

export default function App() {
  const [text, setText] = useState("");

  return (
    <div className="container">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ここに入力..."
      />
      <p>{text}</p>
    </div>
  );
}
