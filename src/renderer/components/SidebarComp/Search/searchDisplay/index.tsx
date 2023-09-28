
import React from 'react'

import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

import styles from './index.module.css'

function SearchDisplay(props: CollapseProps) {

  //const items: CollapseProps['items'] = props['items'] 

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <p>{text}</p>,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <p>{text}</p>,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <p>{text}</p>,
    },
  ]

  const onChange = (key: string | string[]) => {
    console.log(key)
  }
  
  return (
    <div> 
      <div className={styles.searchDisplayCotainer}>
        <Collapse size="small" className={styles.searchDisplayContent } items={items} defaultActiveKey={['0']} onChange={onChange}></Collapse>
      </div>
    </div>
  )
}

export default SearchDisplay