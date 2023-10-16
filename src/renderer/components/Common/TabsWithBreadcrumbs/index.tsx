import { Tabs, TabsProps } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import { pagesForTabChildren } from '../../../pages/1.config/pages.config';
import { useStore } from "../../../store";

import AppIntro from '../../../pages/1.config/appIntro'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export type TabsWithBreadcrumbs = {
  title: React.ReactNode,
  breadcrumbs: string[],
  key: string | number,
  children?: React.ReactNode | string
}[]

export type TabsWithBreadcrumbsProps = {
  data: TabsWithBreadcrumbs
}


const TabsWithBreadcrumbs: React.FC<{data: TabsWithBreadcrumbs}> = (props: TabsWithBreadcrumbsProps) => {

  const [items, setItems] = useState([]);  // initialItems
  const [activeKey, setActiveKey] = useState(items[0] ? items[0].key : '000-000');
  const newTabIndex = useRef(0);

  // 生命周期
  useEffect(() => {
    // 组装数据
    const items:TabsProps['items'] = []
    if(props && props.data) {
      props.data.forEach( (item, index) => {

        let breadcrumbsEle = ''

        item.breadcrumbs.forEach((i, _) => {
          breadcrumbsEle = breadcrumbsEle + '  /  ' + i
        })

        const breadcrumbs = <div style={{marginTop:'-16px', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.05)'}}>{
          <div style={{fontSize: '12px', padding: '1px', marginLeft: '8px', color: 'rgb(130, 130, 130)'}}>{breadcrumbsEle}</div>
        }</div>

        const ChildrenEle = pagesForTabChildren(item.key.toString().split('_')[0])

        const tmpChildren = <div>
          {breadcrumbs}
          <div style={{padding: '8px'}}> <ChildrenEle></ChildrenEle> </div>
          </div>
        const tmpItem = {
          label: item.title,
          key: item.key.toString(),
          children: tmpChildren,
        }

        items.push(tmpItem)
      })
    }


    //console.log('mmkk:initialBrief:  ', initialBrief)

    setItems(items)
    console.log('mmkk3-2: ', items)

    if(items.length > 0) {
      setActiveKey(items[items.length-1].key)
    }

  }, [props])


  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({ label: 'New Tab', children: 'Content of new Tab', key: newActiveKey });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {

    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    //console.log('mmkk3: ', newPanes)
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs
      hideAdd
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  );
};

export default TabsWithBreadcrumbs;
