import { ipcMain } from 'electron';

const si = require('systeminformation');

export const cpuHandlers = () => {
  // 获取cpu 信息
  ipcMain.on('R2M:localMachineTools:getCPUInfo'  , (event, data) => {

    // promises style - new since version 3
    si.cpu()
      .then((data: any) => {
        event.returnValue = data
      })
      .catch((error: any) => {
        console.error(error)
        event.returnValue = error
      });
  });


}
