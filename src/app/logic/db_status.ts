import { get,push, onValue, ref, onChildAdded } from "firebase/database";
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

export const getDB = () =>{
    const msgRef = dbRef('msg');
    const msgGet = get(msgRef);
    // return onChildAdded(msgRef,(snapShot)=>{
    //     const val = snapShot.val().toISOString();
    //     const red = val;
    //     console.log("値確認:/n",red);
    // })
    // onValue(msgRef,(snapShot) => {
    //     console.log("監視");
    //     const data = snapShot.val();
    //     console.log(data);
    //     if (data) {
    //         const array = Object.values(data);
    //         console.log("内容物確認\n",array);
    //         get(data).then(() =>{
    //             console.log("getした");
    //         }).catch((e) =>{
    //             console.log("無理だ\n",e);
    //         })
    //     }
    //     return data
    // })
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