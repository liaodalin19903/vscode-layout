import React from 'react'
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';

import TreeDirectory from '../../Common/TreeDirectory'


import styles from './index.module.css'

import { pagesKey } from '../../../pages/1.config/pages.config'


export const lmtTreeData: DataNode[] = [
  {
    title: '本机硬件信息',
    key: pagesKey.localMachineTools.localMachineHardware,
    children: [
      { title: 'CPU', key: pagesKey.localMachineTools.cpu, isLeaf: true, selectable: false },
      { title: 'RAM', key: pagesKey.localMachineTools.ram, isLeaf: true, selectable: false },
      { title: '磁盘', key: pagesKey.localMachineTools.disk, isLeaf: true, selectable: false },
    ],
    selectable: false,
    icon: false,
  },
  {
    title: '本机网络信息',
    key: pagesKey.localMachineTools.localMachineNetwork,
    children: [
      { title: '本机网卡', key: pagesKey.localMachineTools.localMachineInterfaces, isLeaf: true, selectable: false },
    ],
    selectable: false,
    icon: false
  },
];

// 基于是否收藏，更新工具名称
const updateToolnameBaseOnIsCollected = () => {

  const res = window.electron.ipcRenderer.sendSync("GetAllDataFromTable:collectTools")
  const collectedToolsKeys = res.map((item: { collectedtools_id: any }) => item.collectedtools_id);

  function updateTitle(node: DataNode) {
    if (collectedToolsKeys.includes(node.key)) {
      if(!node.title!.toString().includes("(已收藏)"))
      node.title = `${node.title}(已收藏)`;
    }
    if (node.children) {
      node.children.forEach((child) => {
        updateTitle(child);
      });
    }
  }

  lmtTreeData.forEach((node) => {
    updateTitle(node);
  });

}


function index() {

  updateToolnameBaseOnIsCollected()


  return (
    <div className={styles.LocalmachineContainer}>
      <div className={styles.LocalmachineHeaderContainer}>本机信息</div>
      <TreeDirectory data={lmtTreeData}></TreeDirectory>
    </div>
  )
}

export default index
