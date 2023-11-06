// 搜索框内的搜索组件

import React, { useEffect, useState } from 'react'

import styles from './index.module.css'
import { Input } from 'antd';
import { DataNode } from 'antd/es/tree';
import TreeDirectory from '../../Common/TreeDirectory';

import { originTreeData } from '../CollectedTools'

import { filterKeysBySearchParams } from '../../../pages/1.config/pages.config'
import { filterDataByKeys } from '../CollectedTools/util'


function Search() {

  let [lmtTreeData, setLmtTreeData] = useState<DataNode[]>([]);

  useEffect(() => {
    setLmtTreeData(originTreeData)
  }, [])

  //#region
  // 过滤treeData，依据value和treeData的item的可搜索数组内的内容匹配
  const searchTreeData = (value: string):DataNode[] => {
    /*
     思路：1.对每个工具映射搜索字符串数组  2.模糊搜索->提出keys  3.用keys来过滤
    */
    const filteredKeys = filterKeysBySearchParams(value)
    lmtTreeData = filterDataByKeys(originTreeData, filteredKeys)

    return lmtTreeData
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(e.target.value)

    if(e.target.value === '') {
      // 清空
      setLmtTreeData(originTreeData)
    } else {
      // 过滤
      lmtTreeData = searchTreeData(e.target.value)
      //console.log("过滤：lmtTreeData：", lmtTreeData)
      setLmtTreeData(lmtTreeData)
    }

  }

  //#endregion


  return (
    <div>
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchHeaderConentContainer}>
          <span className={styles.searchHeaderTitle}>搜索 </span>
          <Input
            className={styles.searchInput}
            placeholder='请输入搜索内容'
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
              onChangeInput(e)
            }}
          ></Input>
        </div>
      </div>

      <div className={styles.searchDisplayCotainer}>
        {
          lmtTreeData.length ?
           <TreeDirectory data={lmtTreeData}></TreeDirectory> :
           null
        }

      </div>
    </div>
  )
}

export default Search
