
//#region 1、framework

import { tabsHandlers } from './framework/tabs.handlers'

//#endregion

//#region 2、pages


import { cpuHandlers } from './pages/localMachineTools/cpu.handlers'
import { ramHandlers } from './pages/localMachineTools/ram.handlers'
import { diskHandlers } from './pages/localMachineTools/disk.handlers'
import { interfacesHandlers } from './pages/localMachineTools/interface.handlers'

//#endregion

//#region 3、test
import { testDBHandlers } from './test/db.test.handlers'
import { testHandlers } from './test/test.handlers'

//#endregion


export const registerIpcMainHandlers = () => {

  //#region 1、framework
  tabsHandlers()

  //#endregion

  //#region 2、pages

  // localMachineTools handlers
  cpuHandlers()
  ramHandlers()
  diskHandlers()
  interfacesHandlers()

  //#endregion


  //#region 3、test
  // test handlers
  testHandlers()

  testDBHandlers()
  //#endregion


};
