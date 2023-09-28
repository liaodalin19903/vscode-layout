import React, { useEffect } from 'react'

import TabsWithBreadcrumbs from '../../Common/TabsWithBreadcrumbs'

import {TabsWithBreadcrumbsProps} from '../../Common/TabsWithBreadcrumbs'

import styles from './index.module.css'

import { useStore } from '../../../store'


function mainContent() {

  const { tabs } = useStore((state: any) => state)
  /*
  useEffect(() => {
    
    const unsubscribe = useStore.subscribe(
      (state) => {
        console.log('mmkk3 改变了tabs: ', state.tabs)
      },
    )

    return () => unsubscribe?.()

  }, [tabs])
  */

  return (
    <div className={styles.myTabsWithBreadcumpsContainer}>
      <div className= {styles.myTabsWithBreadcumps}>
        <TabsWithBreadcrumbs data={tabs}></TabsWithBreadcrumbs>
      </div>
    </div>
  )
}

export default mainContent
