import path from "path";

const Database = require('better-sqlite3');

//#region 1、获取db

/**
 * 获取db
 */
export const getDB = () => {
  const db = new Database(path.join(__dirname, 'proj.sqlite.db'))
  return db
}

//#endregion

//#region 2、创建table

/**
 * 判断表是否存在
 *
 * 如果存在返回效果：{ name: 'country' }
 */
export const isTableExists = (tablename: string ) => {
  const db = getDB()
  // 查询表是否存在
  const tableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?");
  // 检查表是否存在
  const isTableExists = tableExists.get(tablename);
  return isTableExists
}

/**
 * 所有表的名称
 */
type TablesType =
"collectedTools" |
"openedTools"

const createCollectedToolsTableSQL = `
      CREATE TABLE IF NOT EXISTS collectedTools (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        collectedtools_id text NOT NULL UNIQUE
      );
    `

// type TablesParamsType = collectedToolsParam | otherTableParam
export type TablesParamsType = collectedToolsParamType

export type collectedToolsParamType = {
  id?: string,
  collectedtools_id: string
}

/**
 * 判断表是否存在，如果不存在就创建
 * @param tablename
 */
export const isTableExistsThenCreateTable = (tablename: TablesType) => {

  /**
   * 创建Table：collectedTools
   */
  const createCollectedToolsTable = () => {
    //console.log('*** Test -> 创建表')
    const db = getDB()


    const createTableStmt = db.prepare(createCollectedToolsTableSQL)

    createTableStmt.run()
    //console.log("创建表成功")
    db.close()

  }

  console.log('1.1 isTableExists(tablename)： ', isTableExists(tablename))

  if(!isTableExists(tablename)) {
    switch (tablename) {
      case "collectedTools":
        createCollectedToolsTable()
        //console.log('isTableExists(tablename): ', isTableExists(tablename))
        break

      default:
        break
    }

  }
}

//#endregion


//#region 3、插入数据到表

export const insertIntoTable = (tablename: TablesType, tableparams: TablesParamsType) => {

  const db = getDB()

  switch (tablename) {
    case "collectedTools":

      console.log('tableparams.collectedtools_id: ', tableparams, tableparams.collectedtools_id)
      const insertjob = db.prepare('INSERT INTO collectedTools (collectedtools_id) VALUES (?)')
      const result = insertjob.run(tableparams.collectedtools_id)

      console.log("result: ", result)
      db.close()

      break

    default:
      break
  }


}

//#endregion

//#region 4、从表内查询数据

export const getAllDataFromTable = (tablename: TablesType) => {
  const db = getDB()

  switch (tablename) {
    case "collectedTools":

      const getAllData = db.prepare('SELECT * FROM collectedTools')
      const result = getAllData.all()

      return result

    default:
      db.close()
      return
  }
}

//#endregion


export const testDB = () => {
  const db = getDB()
  // 准备查询语句
  const stmt = db.prepare("SELECT name FROM sqlite_master WHERE type='table'");

  // 执行查询
  const tables = stmt.all();

  // 遍历结果集
  tables.forEach((table:any) => {
    console.log('tabkle-name: ', table.name);

  });

  // 关闭数据库连接
  db.close();
}
