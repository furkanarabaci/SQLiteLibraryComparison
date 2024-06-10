export default {
  TABLE_NAME: 'dbpath.sqlite',
  KEY_NAME: 'test',
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS Users (user_id INTEGER PRIMARY KEY NOT NULL, name TEXT);`,
  INSERT_QUERY: 'INSERT INTO Users (name) VALUES (?)',
  ROW_COUNT: 1000
}