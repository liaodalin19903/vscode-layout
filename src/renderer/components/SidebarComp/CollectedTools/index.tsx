import React, { useEffect } from 'react'
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';

import { filterDataByKeys } from './util'

import { lmtTreeData } from '../LocalMachineTools'

import TreeDirectory from '../../Common/TreeDirectory'

import styles from '../LocalMachineTools/index.module.css'

export const originTreeData:DataNode[] =  [
  {
    title: "简介",
    key: "00",
    children: [{
      title: "简介",
      key: "000-000",
      isLeaf: true,
      selectable: false
    }],
    selectable: false
  }
  ,{
    title: "本机信息",
    key: "01",
    children: lmtTreeData,
    selectable: false
  }
]

function index() {

  let treeData: DataNode[] = []

  // 获取收藏的keys
  const res = window.electron.ipcRenderer.sendSync("GetAllDataFromTable:collectTools")
  const keys:string[] = res.map((item: { collectedtools_id: any }) => item.collectedtools_id);

  treeData = filterDataByKeys(originTreeData, keys)

  return (
    <div className={styles.LocalmachineContainer}>
      <div className={styles.LocalmachineHeaderContainer}>收藏工具</div>
      <TreeDirectory data={treeData}></TreeDirectory>
    </div>
  )
}

export default index
