from fastapi import FastAPI, HTTPException
import pandas as pd

app = FastAPI()

# AtomicSystem.txt のデータをロード
file_path = "AtomicSystem.txt"
with open(file_path, "r", encoding="utf-8") as file:
    atomic_data = [line.strip() for line in file.readlines()[1:] if line.strip()]  # 1行目を除く

@app.get("/calculate")
async def calculate(sn: str, p: int):
    if p < 1 or p > 52:
        raise HTTPException(status_code=400, detail="P must be between 1 and 52")
    
    # SNの位置を検索
    if sn not in atomic_data:
        raise HTTPException(status_code=400, detail="SN not found in data")
    
    target_index = atomic_data.index(sn) + 1  # 1-based index

    # D のカウント（奇数行のみ）
    d_count = 0
    for i in range(0, target_index, 2):
        d_count += 1

    # S のカウント（Dカウント後の奇数行から数える）
    s_count = p - d_count

    # S が 1 なら計算不可能
    if s_count < 2:
        return {"result": "計算不可能"}

    return {"D": d_count, "S": s_count}
