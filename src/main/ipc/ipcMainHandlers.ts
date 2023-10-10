
//#region 1、framework

import { tabsHandlers } from './framework/tabs.handlers'

//#endregion

//#region 2、pages


import { cpuHandlers } from './pages/localMachineTools/cpu.handlers'

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

  //#endregion


  //#region 3、test
  // test handlers
  testHandlers()

  testDBHandlers()
  //#endregion


};
