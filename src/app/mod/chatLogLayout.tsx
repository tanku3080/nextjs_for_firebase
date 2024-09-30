import { sendDB } from "../logic/db_status";
import { initConfig } from "../logic/initConfig";

initConfig();
export default function chatLogLayout() {
    return(
        <>
        <button type="submit" onClick={() => {
            sendDB("押されて送信した");
        }}>クリック</button>
        <div className="flex flex-col h-full p-4">
            <div className="flex-1 overflow-y-auto bg-gray-100 rounded-lg p-4 mb-4 shadow-md">
                <div className="flex flex-col gap-2">
                    {/* ここをいい感じの領域にする必要がある */}
                    <div className="bg-white rounded-lg p-2">User1: Hello!</div>
                    <div className="bg-white rounded-lg p-2">User2: Hi there!</div>
                </div>
            </div>
        </div>
            </>
    )
}