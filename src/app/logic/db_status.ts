import { set,get,push, onValue, ref } from "firebase/database";
import { initConfig,initApp } from "./initConfig";

initConfig();
export const sendDB = (user:string,msg:string) =>{
    const msgRef = dbRef('msg');
    const newMsgRef = push(msgRef);

    //メッセージをDBに送信する処理を入れる
    set(newMsgRef,{
        user:user,
        msg:msg,
        timestamp:Date.now()
    }).then(() => {
        console.log("message send");
    }).catch((e) =>{
        console.log("message error\n",e);
    })
}

export const getDB = (result:(msg:string[]) => void) =>{
    const msgRef = dbRef('msg');

    onValue(msgRef,(keep) => {
        const data = keep.val();
        if (data) {
            get(data).then(() =>{
                console.log("getした");
            }).catch((e) =>{
                console.log("無理だ\n",e);
            })
        }
        else result([]);
    })
}

/**
 * データパスを参照するための処理
 * @param input データ取得に用いるキー
 * @returns 
 */
const dbRef = (input:string) =>{
    const _ref = ref(initApp,input);
    return _ref;
}