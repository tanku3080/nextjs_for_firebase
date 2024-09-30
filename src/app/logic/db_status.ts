import { get,push, onValue, ref } from "firebase/database";
import {initApp } from "./initConfig";

export const sendDB = async(msg:string) =>{
    const msgRef = dbRef('msg');
    const newMsgRef = push(msgRef);

    //メッセージをDBに送信する処理を入れる
    await push(newMsgRef,{
        msg:msg,
        timestamp:nowData()
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

const nowData = ()=>{
    const dt = new Date();
    dt.setTime(dt.getTime() + (9*60*60*1000));
    const dtString = dt.toISOString().replace('T',' ').substring(0,19);
    return dtString;
}