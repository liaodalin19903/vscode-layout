const Database = require('better-sqlite3');

const db = new Database('proj.sqlite.db')

const getAllTables = () => {
  // 准备查询语句
  const stmt = db.prepare("SELECT name FROM sqlite_master WHERE type='table'");

  // 执行查询
  const tables = stmt.all();

  // 遍历结果集
  tables.forEach((table: { name: any; }) => {
    console.log(table.name);
  });
}

getAllTables()

// 关闭数据库连接
db.close();
