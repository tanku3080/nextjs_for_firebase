import { get, push, ref, set } from "firebase/database";
import { initApp } from "./initConfig";

export const sendDB = async (msg: string) => {
  const otherIDRes = await IpAddressGet();
  const msgRef = dbRef(otherIDRes);
  const newMsgRef = push(msgRef);
  //メッセージをDBに送信する処理を入れる
  await set(newMsgRef, {
    msg: msg,
    timestamp: nowData(),
  })
    .then(() => {
      console.log("message send");
    })
    .catch((e) => {
      console.log("message error\n", e);
    });
};
//ここが鬼門で、値を取得した結果をどうやってoage.tsxにもっていくか？悩んでいる
export const getDB = async () => {
  const uniqueID = await IpAddressGet();
  const dbref = ref(initApp);
  try {
    const ss = await get(dbref);
    if (ss.exists()) {
      const userDb = ss.val();
      const userKeys = Object.keys(userDb);
      console.log("ユーザー数:", userKeys.length);

      //ユーザー識別
      const msg = [];
      for (const userKey of userKeys) {
        const userMsg = userDb[userKey];

        const UserOrOther = userKey === uniqueID ? "自分" : "自分以外";

        //timestamp比較
        for (const msgKey in userMsg) {
          const msgDt = userMsg[msgKey];
          msg.push({
            sender: UserOrOther,
            msg: msgDt.msg,
            timestamp: msgDt.timestamp,
          });
        }
      }
      msg.sort((a, b) => compareTimestamps(a.timestamp, b.timestamp));
      return msg;
    } else {
      console.log("No Data");
      return [];
    }
  } catch (e) {
    console.error("エラー発生:\n", e);
  }
};

/**
 * データパスを参照するための処理
 * @param input データ取得に用いるキー
 * @param uniqueID ユーザー識別用のidをセットする
 * @returns
 */
export const dbRef = (input: string) => {
  const _ref = ref(initApp, input);
  return _ref;
};

/**
 * 日本時間(UTC準拠)を返す関数
 * @returns UTCから9時間変更分の日本時間を返す
 */
const nowData = () => {
  const dt = new Date();
  dt.setTime(dt.getTime() + 9 * 60 * 60 * 1000);
  const dtString = dt.toISOString().replace("T", " ").substring(0, 19);
  return dtString;
};

/**
 * 取得したtimestampを良い感じに成型する
 * @param a 比較元
 * @param b 比較先
 * @returns
 */
export const compareTimestamps = (a: string, b: string) => {
  // "2024-10-03 18:37:47" を "2024-10-03T18:37:47" に変換
  const formatTimestamp = (timestamp: string) => {
    return timestamp.replace(" ", "T");
  };

  // タイムスタンプをDateオブジェクトに変換
  const dateA = new Date(formatTimestamp(a));
  const dateB = new Date(formatTimestamp(b));

  return dateA.getTime() - dateB.getTime();
};

/**
 * 個人を識別する為、ip addressをユニークキーとして使用
 * @returns
 */
const IpAddressGet = async () => {
  const res = await fetch("https://ipapi.co/json/");
  const dt = await res.json();
  return dt.ip;
};
