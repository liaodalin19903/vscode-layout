import { ipcMain } from 'electron';


export const cpuHandlers = () => {
  // 获取cpu 信息
  ipcMain.on('getCPUInfo'  , (event, data) => {
    console.log(`Message received from ${event.sender.id}: ${data}`);
    event.returnValue = 'res'
  });

  
}