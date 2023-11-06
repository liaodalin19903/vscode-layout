import { ipcMain } from 'electron';

const si = require('systeminformation');

export const diskHandlers = () => {
  // 获取ram 信息
  ipcMain.on('R2M:localMachineTools:getDISKInfo'  , (event, data) => {
    console.log(`Message received from ${event.sender.id}: ${data}`);

    // promises style - new since version 3

    si.diskLayout((data: any) => {
      event.returnValue = data
    })
    .catch((error: any) => {
      console.error(error)
      event.returnValue = error
    });
  });
}
