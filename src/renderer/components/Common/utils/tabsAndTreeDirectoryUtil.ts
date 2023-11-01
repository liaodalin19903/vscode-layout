/**
 * Tabs 和 TreeDirectory 的Util
 */

import {
  TabsWithBreadcrumbsProps,
  TabsWithBreadcrumbs
}
from '../TabsWithBreadcrumbs'

import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';

import { pagesKey, pagesBreadcrumbs, pagesForTabChildren } from '../../../pages/1.config/pages.config'

import { originTreeData } from '../../../components/SidebarComp/CollectedTools'
import { filterDataByKeys } from '../../../components/SidebarComp/CollectedTools/util'


/**
 *
 *
  // 举例：DataNode[]
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


  // 举例：TabsWithBreadcrumbs
  [
    {
      title: React.ReactNode;
      breadcrumbs: string[];
      key: string | number;
      children?: React.ReactNode | string;
    }
  ]

 *
 */

/**
 * 将Tabs的数据转为TreeDirectory数据
 *
 * 原理：从各个TreeDirectory数据中过滤出来
 */
export const convertTabsDataToTreeDirectoryData = (tabsData: TabsWithBreadcrumbs):DataNode[] => {
  console.log('tabsData: ', tabsData)

  const ori_keys:string[] = tabsData.map(tab => tab.key as string)

  // 遍历：去掉key("001-003_0")里面的("_0")
  const keys = ori_keys.map(key => key.split(/[_]/)[0]);

  return filterDataByKeys(originTreeData, keys)

}

/**
 * 将TreeDirectory的数据转为Tabs数据
 */
export const convertTreeDirectoryDataToTabsData = (tabsData:DataNode[]): TabsWithBreadcrumbs => {

  return tabsData.map((node) => {
    const { title, key, children } = node;

    console.log('mmkk: ', key, pagesBreadcrumbs[key as string])

    const tab = {
      title: title as React.ReactNode,
      breadcrumbs: pagesBreadcrumbs[key as string], // Breadcrumbs are not available in TreeDirectory data
      key,
      children: children ? convertTreeDirectoryDataToTabsData(children) : undefined,
    };
    return tab;
  });

}



