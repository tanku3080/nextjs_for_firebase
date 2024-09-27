'use client'
import {useState } from "react";
import { initConfig } from "../../logic/initConfig";
import { sendDB } from "@/app/logic/db_status";

initConfig();

export default function BasicChat() {
  const [inputVal,setVal] = useState<string>('');
    return (
      <>
      <div className="flex flex-col h-full p-4">
       <div className="flex-1 overflow-y-auto bg-gray-100 rounded-lg p-4 mb-4 shadow-md">
         <div className="flex flex-col gap-2">
           {/* ここをいい感じの領域にする必要がある */}
           <div className="bg-white rounded-lg p-2">User1: Hello!</div>
           <div className="bg-white rounded-lg p-2">User2: Hi there!</div>
         </div>
       </div>
      </div>
      <div className="flex">
       <input
        type="text"
        value={inputVal}
        onChange={(e) => setVal(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
        placeholder="Type your message..."
       />
       <button
       onClick={()=>{
        sendDB(inputVal);
       }}
        name="Send"
        className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition">
          send
       </button>
      </div>
      </>
    );
  }
  