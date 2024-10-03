import { useState, useEffect } from "react";
import { getDB } from "../logic/db_status";
import { initConfig } from "../logic/initConfig";

initConfig();

export default function ChatLogLayout() {
  // 初期値を空配列に設定
  const [messages, setMessages] = useState<
    { sender: string; msg: any; timestamp: any }[]
  >([]);

  // メッセージを取得して状態に保存する
  useEffect(() => {
    const fetchData = async () => {
      const result = await getDB();
      setMessages(result); // 型が一致するためエラーは解消されます
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-[80vh] p-4">
      <div className="flex-1 overflow-y-auto bg-gray-100 rounded-lg p-4 mb-4 shadow-md">
        <div className="flex flex-col gap-2">
          {messages.length === 0 ? (
            <p>No messages available</p>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === "自分"
                    ? "self flex justify-end"
                    : "other flex justify-start"
                }`}
              >
                <div
                  className={`${
                    message.sender === "自分"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  } rounded-lg p-2 max-w-xs`}
                >
                  {message.sender !== "自分" && `${message.sender}: `}{" "}
                  {/* 他のユーザー名表示 */}
                  {message.msg}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
