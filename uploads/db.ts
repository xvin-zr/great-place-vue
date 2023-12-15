import config from "./config";
import mysql from "mysql2/promise";

async function query(sql: string) {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute(sql);

  return results;
}

export async function fetchUserInfo(sql: string) {
  const userInfo = await query(sql);

  return userInfo;
}
