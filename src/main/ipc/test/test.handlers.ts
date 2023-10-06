import path from 'path'
import fs from 'fs'

// Packages
import { IpcMainEvent } from 'electron'

import { ipcMain } from 'electron';


export const testHandlers = () => {
  ipcMain.on('message'  , (event, data) => {
    console.log(`Message received from ${event.sender.id}: ${data}`);
    event.sender.send('response', 'Response message from main process.');
  });

  // 添加更多的ipcMain监听器
  ipcMain.on('getMember', (event, data) => {
    console.log(`getMember received from ${event.sender.id}: ${data}`);
    event.sender.send('getMember-reply', 'Response message from main process.');
  })

  // listen the channel `message` and resend the received message to the renderer process
  ipcMain.on('message', (event: IpcMainEvent, message: any) => {
    console.log(message)
    setTimeout(() => event.sender.send('message', 'hi from electron'), 500)
  })

  ipcMain.on('searchRendererPages', (event: IpcMainEvent, message: any) => {
    console.log(message)

    const currentDir = __dirname;
    const filePath = path.join(currentDir, '../renderer/pages/about.tsx');

    fs.readFile(filePath, "utf8",function(err, data){
      console.log(err);
      console.log('data: ', data);

      event.returnValue = data 

    });
  })

}

