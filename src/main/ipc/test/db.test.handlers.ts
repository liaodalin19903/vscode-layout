// Packages

import { ipcMain } from 'electron';

//const db = require('better-sqlite3')('../../db/proj.sqlite.db', {});
import Database from 'better-sqlite3';

export const testDBHandlers = () => {
  ipcMain.on('db:getProjectInfo'  , (event, data) => {
    console.log(`Message received from ${event.sender.id}: ${data}`);

    // Connect to db
    const db = new Database(':memory:', { verbose: console.log });
    // console.log('db: ', db, '123')


    // const row = db.prepare('SELECT * FROM users WHERE firstName = ?').get('John');
    // console.log(row.firstName, row.lastName, row.email);

    // event.returnValue = {
    //   "firstName": row.firstName
    // }
  });

}
