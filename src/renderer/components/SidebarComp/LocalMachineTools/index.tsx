import React from 'react'
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';

import TreeDirectory from '../../Common/TreeDirectory'


import styles from './index.module.css'

import { pagesKey } from '../../../pages/1.config/pages.config'


const treeData: DataNode[] = [
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

function index() {
  return (
    <div className={styles.LocalmachineContainer}>
      <div className={styles.LocalmachineHeaderContainer}>本机信息</div>
      <TreeDirectory data={treeData}></TreeDirectory>
    </div>
  )
}

export default index
