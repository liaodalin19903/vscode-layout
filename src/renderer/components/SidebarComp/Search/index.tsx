// 搜索框内的搜索组件

import React from 'react'

import SearchHeader from './searchHeader'
import SearchDisplay from './searchDisplay'


function Search() {
  return (
    <div>
      <SearchHeader></SearchHeader>
      <SearchDisplay></SearchDisplay>
    </div>
  )
}

export default Search