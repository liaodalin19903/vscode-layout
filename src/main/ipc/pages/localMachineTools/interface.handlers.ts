import { ipcMain } from 'electron';

//const si = require('systeminformation');
var os = require('os');

export const interfacesHandlers = () => {
  // 获取ram 信息
  ipcMain.on('R2M:localMachineTools:getInterfacesInfo'  , (e, data) => {

    // promises style - new since version 3
    var networkInterfaces = os.networkInterfaces();
    e.returnValue = networkInterfaces
  })
}


