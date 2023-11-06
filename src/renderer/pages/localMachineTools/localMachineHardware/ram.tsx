import React, { useEffect, useState } from 'react'

import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

import { defaultInfo } from './cpu'

interface RAMDataType {
  size: number,  // 容量 -
  bank: string,  // 内存插槽 -
  type: string,  // 内存类型 -
  ecc: boolean,  // ECC -
  clockSpeed: number,  // 时钟速度 -
  formFactor: string,  // 外形尺寸 -
  manufacturer: string,  // 制造商 -
  partNum: string,  // 零件编号 -
  serialNum: string,  // 序列号 -
  voltageConfigured: number,  // 配置电压
  voltageMin: number,  // 最小电压
  voltageMax: number  // 最大电压
}

export const convertBytesToReadable = (bytes: number) => {
  const units = ["bytes", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;
  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }
  return `${bytes.toFixed(2)} ${units[unitIndex]}`;
};

function Ram() {
  const [RAMData, setRAMData] = useState<RAMDataType[]>([])

  //const items: CollapseProps['items'] = []
  const [items, setItems] = useState<CollapseProps['items']>([])

  useEffect(() => {

    const RAMData = window.electron.ipcRenderer.sendSync("R2M:localMachineTools:getRAMInfo")
    setRAMData(RAMData)
    console.log('res: ', RAMData )

    const tmpItems = convertRAMDataToCollapsePropsItem(RAMData)
    setItems(tmpItems)

  }, [])

  // 将获取的RAM数据数组转换为：CollapseProps/items
  const convertRAMDataToCollapsePropsItem = (ramData: RAMDataType[]): CollapseProps['items'] => {
    //console.log('lml: ',ramData )
    const items: CollapseProps['items'] = []
    ramData.forEach((item: RAMDataType) => {

      const children = (
        <>
          <p>插槽: {defaultInfo(item.bank)}</p>
          <p>制造商: {defaultInfo(item.manufacturer)}</p>
          <p>外形尺寸: {defaultInfo(item.formFactor)}</p>
          <p>零件编号: {defaultInfo(item.partNum)}</p>
          <p>序列号: {defaultInfo(item.serialNum)}</p>
          <p>内存类型: {defaultInfo(item.type)}</p>
          <p>内存大小: {convertBytesToReadable(item.size)}</p>
          <p>ECC: {defaultInfo(item.ecc)}</p>
          <p>时钟速度: {defaultInfo(item.clockSpeed)}</p>

          <p>配置电压: {defaultInfo(item.voltageConfigured)}</p>
          <p>最小电压: {defaultInfo(item.voltageMin)}</p>
          <p>最大电压: {defaultInfo(item.voltageMax)}</p>
        </>
      )

      const tmpItem = {
        key: item.bank,
        label: "插槽:" + item.bank + "/" + item.manufacturer + "/" + convertBytesToReadable(item.size),
        children: children
      }
      items.push(tmpItem)
    })

    return items
  }

  return (
    <div>
      <Collapse accordion items={items} />
    </div>
  )
}

export default Ram
