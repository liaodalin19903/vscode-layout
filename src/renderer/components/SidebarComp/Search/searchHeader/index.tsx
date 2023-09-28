// 搜索头部
import React from 'react'

import styles from './index.module.css'
import { Input } from 'antd';



function SearchHeader() {
  return (
    <div>
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchHeaderConentContainer}>
          <span className={styles.searchHeaderTitle}>搜索 </span>
          <Input className={styles.searchInput} placeholder='请输入搜索内容'></Input>
        </div>
      </div>
    </div>
  )
}

export default SearchHeader