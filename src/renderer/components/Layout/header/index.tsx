import classNames from "classnames";
import React from 'react'

import "@vscode/codicons/dist/codicon.css";
import styles from "./header.module.css";
import { Button } from "antd";


// import { useContextMenu } from 'mantine-contextmenu'
//import {IconCopy, IconDownload} from 'mantine-contextmenu'

export type TitlebarProps = {
  showPanel: boolean;
  showPrimarySideBar: boolean;
  showSecondarySideBar: boolean;
  onShowPanelChanged: (visible: boolean) => void;
  onShowPrimarySideBarChanged: (visible: boolean) => void;
  onShowSecondarySidebarChanged: (visible: boolean) => void;
};

function header(
  {
    showPanel,
    showPrimarySideBar,
    showSecondarySideBar,
    onShowPanelChanged,
    onShowPrimarySideBarChanged,
    onShowSecondarySidebarChanged,
  }: TitlebarProps
) {


  return (
    <div className={styles.titlebar}>

      <div className={styles.titleContainer}>
        <div className={styles.titleContent}>
          <span>楟木天工-技术支持/运维/网络工具</span>
        </div>
      </div>

       <div className={styles.layoutControls}>
        <ul className={styles.rightActionsContainer}>
          <li>
            <a
              className={classNames(
                "codicon",
                showPrimarySideBar
                  ? "codicon-layout-sidebar-left"
                  : "codicon-layout-sidebar-left-off",
                styles.actionLabel
              )}
              role="button"
              aria-label="Toggle Primary Side Bar (⌘B)"
              title=""
              tab-index="0"
              onClick={(e) => {
                console.log(e)
                //e.preventDefault()
                console.log('mk')
                onShowPrimarySideBarChanged(!showPrimarySideBar)
              }}
              onContextMenu={()=> {

              }}

            ></a>
          </li>
          <li>
            <a
              className={classNames(
                "codicon",
                showPanel ? "codicon-layout-panel" : "codicon-layout-panel-off",
                styles.actionLabel
              )}
              role="button"
              aria-label="Toggle Primary Side Bar (⌘B)"
              title=""
              tab-index="0"
              onClick={() => {
                onShowPanelChanged(!showPanel)

              }}
            ></a>
          </li>
          <li>
            <a
              className={classNames(
                "codicon",
                showSecondarySideBar
                  ? "codicon-layout-sidebar-right"
                  : "codicon-layout-sidebar-right-off",
                styles.actionLabel
              )}
              role="button"
              aria-label="Toggle Primary Panel (⌘.)"
              title=""
              tab-index="0"
              onClick={() =>
                onShowSecondarySidebarChanged(!showSecondarySideBar)
              }
            ></a>
          </li>
          <li>
            <a
              className={classNames(
                "codicon codicon-settings-gear",
                styles.actionLabel
              )}
              role="button"
              aria-label="Toggle Secondary Side Bar"
              title=""
              tab-index="0"
              onClick= {
                () => {
                  console.log(111)

                  const res = window.electron.ipcRenderer.sendSync("db:test")
                  console.log(res)


                  //const res = global.ipcRenderer.sendSync('db:getProjectInfo', 'test')
                  //console.log(res)
                }
              }
            ></a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default header
