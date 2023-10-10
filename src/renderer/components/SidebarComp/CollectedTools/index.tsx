import React, { useEffect } from 'react'
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';

import { filterDataByKey } from './util'

import { lmtTreeData } from '../LocalMachineTools'

import TreeDirectory from '../../Common/TreeDirectory'

import styles from '../LocalMachineTools/index.module.css'

const originTreeData:DataNode[] =  [
  {
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

  treeData = filterDataByKey(originTreeData, keys)
  console.log('treeData: ', treeData)

  return (
    <div className={styles.LocalmachineContainer}>
      <div className={styles.LocalmachineHeaderContainer}>收藏工具</div>
      <TreeDirectory data={treeData}></TreeDirectory>
    </div>
  )
}

export default index
