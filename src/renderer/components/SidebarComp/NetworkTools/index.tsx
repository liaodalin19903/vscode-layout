import React from 'react'
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';

import TreeDirectory from '../../Common/TreeDirectory'


import styles from './index.module.css'

import { pagesKey } from '../../../pages/1.config/pages.config'


export const lmtTreeData: DataNode[] = [
  {
    title: '网络工具',
    key: pagesKey.networkTools.networkTools,
    children: [
      { title: 'ping', key: pagesKey.networkTools.ping, isLeaf: true, selectable: false },
      { title: 'traceroute', key: pagesKey.networkTools.traceroute, isLeaf: true, selectable: false },
      { title: '端口嗅探', key: pagesKey.networkTools.portSniffing, isLeaf: true, selectable: false },
    ],
    selectable: false,
    icon: false,
  },
  {
    title: '网络分析',
    key: pagesKey.networkTools.ana,
    children: [
      { title: 'tcpdump', key: pagesKey.networkTools.anaPCAP, isLeaf: true, selectable: false },
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
      <div className={styles.LocalmachineHeaderContainer}>网络工具</div>
      <TreeDirectory data={lmtTreeData}></TreeDirectory>
    </div>
  )
}

export default index
