import { ipcMain } from 'electron';


export const tabsHandlers = () => {
  // 保存到数据库：将打开的tools
  ipcMain.on('SaveToDB: openedTools', (event, data) => {
    console.log(`Message received from ${event.sender.id}: ${data}`);
    
    // 1.保存到sqlite数据库
    

    event.returnValue = ''
  });

  
}