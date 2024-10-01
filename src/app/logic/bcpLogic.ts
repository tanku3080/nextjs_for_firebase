import { onValue } from "firebase/database";
import { dbRef } from "./db_status";

interface MsgData {
  id: string;
  msg: string;
  otherID: string;
  timestamp: string;
}
export const getMsgDBSlice = (): Promise<MsgData[]> => {
  return new Promise((res, reject) => {
    const msgRef = dbRef("msg");
    onValue(msgRef, (ss) => {
      const db = ss.val();
      if (db) {
        const msgArray = Object.entries(db).map(([key, value]) => {
          const message = value as MsgData;
          return {
            id: key,
            msg: message.msg,
            otherID: message.otherID,
            timestamp: message.timestamp,
          };
        });
        res(msgArray);
      } else {
        reject("not deta");
      }
    });
  });
};

// const groupMessagesByOtherID = (
//   messages: MsgData[]
// ): Record<string, MsgData[]> => {
//   return messages.reduce((groups, message) => {
//     const { otherID } = message;
//     if (!groups[otherID]) {
//       groups[otherID] = [];
//     }
//     groups[otherID].push(message);
//     return groups;
//   }, {} as Record<string, MsgData[]>);
// };

// const sortMessagesByTimestamp = (messages: MsgData[]): MsgData[] => {
//   return messages.sort(
//     (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
//   );
// };
