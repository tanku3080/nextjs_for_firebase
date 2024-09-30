import { initConfig } from "../logic/initConfig";

initConfig();
export default function chatLogLayout(input: string[]) {
   //将来的には名前：msgという形式にしたいが、現状は無しでいい。 
    return(
        <div className="flex flex-col min-h-[80vh] p-4">
            <div className="flex-1 overflow-y-auto bg-gray-100 rounded-lg p-4 mb-4 shadow-md">
                <div className="flex flex-col gap-2">
                    {/* 自分のメッセージ */}
                    {input.map((msg:string) => (
                   // eslint-disable-next-line react/jsx-key
                   <div className="message self flex justify-end">
                   <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">{msg}</div>
                   </div>
                    ))}
    
                   {/* 他のユーザーのメッセージ */}
                   <div className="message other flex justify-start">
                    <div className="bg-gray-300 text-black rounded-lg p-2 max-w-xs">User2: どもです</div>
                   </div>
                </div>
            </div>
        </div>
    )
}