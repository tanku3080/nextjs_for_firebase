"use client";
import { useState } from "react";
import { sendDB } from "@/app/logic/db_status";
import ChatLogLayout from "@/app/mod/chatLogLayout";

export default function BasicChat() {
  const [inputVal, setVal] = useState<string>("");
  ChatLogLayout();
  return (
    <>
      <div className="flex">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setVal(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
          placeholder="メッセージを入力"
        />
        <button
          onClick={() => {
            sendDB(inputVal);
            setVal("");
          }}
          name="Send"
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition"
        >
          送信
        </button>
      </div>
    </>
  );
}
