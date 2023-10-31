
import { ipcMain } from 'electron';

import {
  insertIntoTable,
  deleteFromTable,
  isTableExistsThenCreateTable,
  getAllDataFromTable,
  testDB
} from '../../db/db'

import {
  TablesParamsType,
  collectedToolsParamType
} from '../../db/db'

export const tabsHandlers = () => {
  // 保存到数据库：将打开的tools
  ipcMain.on('SaveToTable:openedTools', (event, data) => {
    console.log(`Message received from ${event.sender.id}: ${data}`);

    // 1.保存到sqlite数据库


    event.returnValue = ''
  });

  // 保存到数据库：收藏tools
  ipcMain.on('SaveToTable:collectTools', (event, data) => {
    console.log(`Message received from ${event.sender.id}: ${data}`);

    // 1.保存到sqlite数据库
    try {

      async function runAsyncCode() {
        await isTableExistsThenCreateTable("collectedTools");

        const param: collectedToolsParamType = {
          collectedtools_id: data
        };
        await insertIntoTable("collectedTools", param);

      }

      runAsyncCode().catch(error => {
        // 处理异步函数中的错误
      });
      event.returnValue = '保存成功'

    } catch (err) {
      console.log("保存失败: ", err)
      event.returnValue = '保存失败'
    }

  });

  // 保存到数据库：取消收藏tools
  ipcMain.on('SaveToTable:cancleCollectTools', (event, data) => {
    console.log(`Message received from ${event.sender.id}: ${data}`);

    // 1.保存到sqlite数据库
    try {
      // 插入数据
      const param:collectedToolsParamType = {
        collectedtools_id: data
      }
      deleteFromTable("collectedTools", param)

      //event.returnValue = '取消收藏成功'
    } catch (err) {
      console.log("取消收藏失败: ", err)
      event.returnValue = '取消收藏失败'
    }

  });


  // 查询数据库：获取所有的
  ipcMain.on('GetAllDataFromTable:collectTools', (event, data) => {
    console.log(`Message received from ${event.sender.id}: ${data}`);

    try {
      // 查询数据
      const res = getAllDataFromTable("collectedTools")

      event.returnValue = res
    } catch (err) {
      console.log("获取失败: ", err)
      event.returnValue = null
    }

  });

  // 测试数据库
  ipcMain.on('db:test', (event, data) => {

    testDB()
    event.returnValue='ok'

  });

}
