import React, { useEffect, useState } from 'react';
import { Dropdown, MenuProps, Space, Tree } from 'antd';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';

import styles from './index.module.css'


const { DirectoryTree } = Tree;

import { useStore } from "../../../store";

import { pagesKey, pagesBreadcrumbs, pagesForTabChildren } from '../../../pages/1.config/pages.config'


const App: React.FC<{data: DataNode[]}> = (props: {data: DataNode[]}) => {

  const { tabs, addTab } = useStore();

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  useEffect(()=> {
    //console.log('mmkk: ', props)

  }, [])

  // 收藏的工具的keys
  let collectedToolsKeys:string[] = []

  const res = window.electron.ipcRenderer.sendSync("GetAllDataFromTable:collectTools")
  collectedToolsKeys = res.map((item: { collectedtools_id: any }) => item.collectedtools_id);



  // 生成dropdown的key
  const genDropdownItems = (key: string | number)  => {

    const whetherCollectName =  collectedToolsKeys.includes(key.toString()) ? '取消收藏' : '收藏'

    const items: MenuProps["items"] = [
      {
        label: <div
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          if(whetherCollectName === '收藏') {
            console.log('收藏: ', key)

            const res = window.electron.ipcRenderer.sendSync("SaveToTable:collectTools", key)
            console.log(res)

            updateIsOpenObj(key, false)
          }else {
            // 取消收藏
            window.electron.ipcRenderer.sendMessage("SaveToTable:cancleCollectTools", key)
            updateIsOpenObj(key, false)
          }



        }}>{ whetherCollectName }</div>,
        key: key+'_dpi0',
      },
      {
        label: <div onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          console.log('多开: ', key)
          updateIsOpenObj(key, false)
        }}>多开</div>,
        key: key+'_dpi1',
      },
      {
        type: 'divider',
      },
      {
        label: '3rd menu item',
        key: key+'_dpi3',
      },
    ];
    return {items}
  }

  // 定义一个数组状态变量，初始值为空数组
  const [isOpenObj, setIsOpenObj] = useState([]);

  // 更新数组状态的方法
  const updateIsOpenObj = (key, flag) => {
    // 使用浅拷贝的方式复制一份当前数组
    const newIsOpenObj = {...isOpenObj};
    // 反转指定索引位置的值（true 变为 false，false 变为 true）
    newIsOpenObj[key] = flag;
    // 更新数组状态
    setIsOpenObj(newIsOpenObj);
  };

  return (
    <>
      <DirectoryTree
        className={styles.customAntTreeSwitcher}
        multiple
        defaultExpandAll={true}
        onSelect={onSelect}
        onExpand={onExpand}
        treeData= {props.data}
        blockNode={true}
        titleRender={(nodeData) => {

          setIsOpenObj[nodeData.key] = false

          const nodeEle = (
            <span
              style={{display: 'inline',  width: '100%'}}
              onClick={() => {
                //#region 添加到Tabs
                function extractObjectByKey(key: string | number, data: DataNode[]): DataNode | undefined {
                  for (const item of data) {
                    if (item.key === key) {
                      return item;
                    }
                    if (item.children) {
                      const child = extractObjectByKey(key, item.children);
                      if (child) {
                        return child;
                      }
                    }
                  }
                  return undefined;
                }

                const nodeDataItem = extractObjectByKey(nodeData.key, props.data)

                if(!nodeDataItem) {
                  return
                }

                const keyCount = tabs.filter(item => item.key.toString().includes(nodeDataItem.key.toString())).length

                const childrenEle = pagesForTabChildren(nodeDataItem.key)

                const tab = {
                  title: nodeDataItem.title,
                  //children: childrenEle(), //nodeDataItem.children,
                  key: nodeDataItem.key + '_' + keyCount.toString(),
                  ...{breadcrumbs: pagesBreadcrumbs[nodeData.key]}
                }

                addTab(tab)
                //#endregion
              }}
              onContextMenu={(event) => {
                event.preventDefault();
                event.stopPropagation();

                updateIsOpenObj(nodeData.key, true)
              }}
              >{nodeData.title}

                <Dropdown
                key={nodeData.key}
                //menu={{ items }}
                menu={genDropdownItems(nodeData.key)}
                trigger={['click']}
                open={isOpenObj[nodeData.key as number]}
                onOpenChange={()=>{
                  updateIsOpenObj(nodeData.key, false)
                }}
                >
                  <a onClick={(e) => {
                    e.preventDefault()
                  }}>
                    <Space>
                    </Space>
                  </a>
                </Dropdown>

              </span>
          )
          // 如果是子组件
          if(nodeData.children) {
            return nodeData.title
          }
          return nodeEle
        }}
      />

    </>
  );
};

export default App;
