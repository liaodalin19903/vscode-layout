import { ipcMain } from 'electron';

const si = require('systeminformation');

export const ramHandlers = () => {
  // 获取ram 信息
  ipcMain.on('R2M:localMachineTools:getRAMInfo'  , (event, data) => {

    // promises style - new since version 3
    si.memLayout()
      .then((data: any) => {
        event.returnValue = data
      })
      .catch((error: any) => {
        console.error(error)
        event.returnValue = error
      });
  });
}
