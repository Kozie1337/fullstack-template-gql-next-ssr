import { createConnection } from "typeorm";

export default async function establishConnection() {
  let reconnectionCount = 0;
  const establishDbConnection = async () => {
    if (reconnectionCount > 5) {
      console.log("Failed connection to db after 5 total attempts.");
      return;
    }
    try {
      await createConnection();
      console.log("Established Typeorm connection to postgres");
    } catch (err) {
      console.log(
        `Failed connecting to db. attempts left:${5 - reconnectionCount}`
      );
      await new Promise((r) => setTimeout(r, 3000));
      reconnectionCount++;
      establishDbConnection();
    }
  };
  establishDbConnection();
}
