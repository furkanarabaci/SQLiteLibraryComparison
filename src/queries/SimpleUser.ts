const ROW_COUNT = 1000;

const INSERT_QUERY = [...Array(ROW_COUNT).keys()].map((_, i) => `INSERT INTO Users (name) VALUES ('User_${i}')`);
const SELECT_QUERY = [...Array(ROW_COUNT).keys()].map((_, i) => `SELECT * FROM Users WHERE user_id=${i}`)

export default {
  tableName: 'simpleuser.sqlite',
  keyName: 'test',
  queries: [
    `CREATE TABLE IF NOT EXISTS Users (user_id INTEGER PRIMARY KEY NOT NULL, name TEXT);`,
    ...INSERT_QUERY,
    ...SELECT_QUERY
  ],
}