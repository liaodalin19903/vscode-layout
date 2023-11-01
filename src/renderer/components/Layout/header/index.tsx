import classNames from "classnames";
import React from 'react'

import "@vscode/codicons/dist/codicon.css";
import styles from "./header.module.css";
import { Button } from "antd";


// import { useContextMenu } from 'mantine-contextmenu'
//import {IconCopy, IconDownload} from 'mantine-contextmenu'

import {
  convertTabsDataToTreeDirectoryData,
  convertTreeDirectoryDataToTabsData
}
from '../../Common/utils/tabsAndTreeDirectoryUtil'

import {
  TabsWithBreadcrumbsProps,
  TabsWithBreadcrumbs
}
from '../../Common/TabsWithBreadcrumbs'

import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';


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

                  /*
                  let lmtTreeData: DataNode[] = [
                    {
                      title: '本机硬件信息',
                      key: '001',
                      children: [
                        { title: 'CPU', key: '001-001', isLeaf: true, selectable: false },
                        { title: 'RAM', key: '001-002', isLeaf: true, selectable: false },
                        { title: '磁盘', key: '001-003', isLeaf: true, selectable: false },
                      ],
                      selectable: false,
                      icon: false,
                    },
                    {
                      title: '本机网络信息',
                      key: '002',
                      children: [
                        { title: '本机网卡', key: '002-001', isLeaf: true, selectable: false },
                      ],
                      selectable: false,
                      icon: false
                    },
                  ];

                  const res1 = convertTreeDirectoryDataToTabsData(lmtTreeData)
                  console.log('res1: ', res1)
                  */


                  let tabsData =   [
                    {
                      title: "title",
                      breadcrumbs: [],
                      key: "001",
                      children: [
                        {
                          title: "title2",
                          breadcrumbs: ['000'],
                          key: "001-001",
                        }
                      ]
                    }
                  ]

                  const res2 = convertTabsDataToTreeDirectoryData(tabsData)
                  console.log(res2)



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
