'use client'
import {useState } from "react";
import chatLogLayout from "@/app/mod/chatLogLayout";
import { sendDB,getDB } from "@/app/logic/db_status";

export default function BasicChat() {
  const [inputVal,setVal] = useState<string>('');
  const test = getDB();
  console.log(test)
    return (
      <>
      {chatLogLayout()}
      <div className="flex">
       <input
        type="text"
        value={inputVal}
        onChange={(e) => setVal(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
        placeholder="メッセージを入力"
       />
       <button
       onClick={()=>{
        sendDB(inputVal);
        setVal("");
       }}
        name="Send"
        className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition">
          送信
       </button>
      </div>
      </>
    );
  }
  