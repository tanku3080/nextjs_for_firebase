import { onChildAdded,push,ref, Unsubscribe } from "firebase/database";
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

//ここが鬼門で、値を取得した結果をどうやってoage.tsxにもっていくか？悩んでいる
export const getDB = ():Unsubscribe =>{  
    const msgRef = dbRef('msg');
    return onChildAdded(msgRef,(ss) =>{
        const val = ss.val();
        console.log(val);
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

/**
 * 日本時間(UTC準拠)を返す関数
 * @returns UTCから9時間変更分の日本時間を返す
 */
const nowData = ()=>{
    const dt = new Date();
    dt.setTime(dt.getTime() + (9*60*60*1000));
    const dtString = dt.toISOString().replace('T',' ').substring(0,19);
    return dtString;
}