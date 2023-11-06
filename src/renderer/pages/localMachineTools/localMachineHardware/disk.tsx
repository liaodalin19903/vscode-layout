import React, { useEffect, useState } from 'react'

import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

interface DISKDataType {
  "device": string, // 设备 -
  "type": string,  // 类型 -
  "name": string,  // 名称 -
  "vendor": string,  // 厂商 -

  "size": number,  // 大小 -
  "bytesPerSector": null | string | number,  // 每个扇区字节数 -
  "totalCylinders": null | string | number,  // 总柱面数
  "totalHeads": null | string | number,  // 总磁头数
  "totalSectors": null | string | number,  // 总扇区数
  "totalTracks": null | string | number,  // 总磁道数
  "tracksPerCylinder": null | string | number,  // 每个柱面的磁道数
  "sectorsPerTrack": null | string | number,  // 每个磁道的扇区数
  "firmwareRevision": string,  //  固件版本
  "serialNum": string,  // 序列号
  "interfaceType": string,  // 接口类型
  "smartStatus": string,  // SMART 状态
  "temperature": null | string | number  // 温度
}

import { convertBytesToReadable } from './ram'
import { defaultInfo } from './cpu'

const convertDISKDataToCollapsePropsItem = (DISKData: DISKDataType[]):CollapseProps['items'] => {

  const items: CollapseProps['items'] = []
  DISKData.forEach((disk, index) => {
    const children = (
      <div style={{ overflow: 'scroll', height: 'calc(100vh)'}}>
        <div>
        <p>厂商：{defaultInfo(disk.vendor)}</p>
        <p>设备：{defaultInfo(disk.device)}</p>
        <p>类型：{defaultInfo(disk.type)}</p>
        <p>名称：{defaultInfo(disk.name)}</p>

        <p>大小：{defaultInfo(disk.size)}</p>
        <p>扇区大小：{defaultInfo(disk.bytesPerSector)}</p>
        <p>总柱面数：{defaultInfo(disk.totalCylinders)}</p>
        <p>总磁头数：{defaultInfo(disk.totalHeads)}</p>
        <p>总扇区数：{defaultInfo(disk.totalSectors)}</p>
        <p>总磁道数：{defaultInfo(disk.totalTracks)}</p>
        <p>每个柱面的磁道数：{defaultInfo(disk.tracksPerCylinder)}</p>
        <p>每个磁道的扇区数：{defaultInfo(disk.sectorsPerTrack)}</p>

        <p>固件版本：{defaultInfo(disk.firmwareRevision)}</p>
        <p>序列号：{defaultInfo(disk.serialNum)}</p>
        <p>接口类型：{defaultInfo(disk.interfaceType)}</p>
        <p>SMART状态：{defaultInfo(disk.smartStatus)}</p>
        <p>温度：{defaultInfo(disk.temperature)}</p>
        </div>
      </div>
    )

    const tmpItem = {
      key: index,
      label:  disk.vendor + "/" + convertBytesToReadable(disk.size),
      children: children
    }
    items.push(tmpItem)

  })
  return items
}

function disk() {

  const [DISKData, setDISKData] = useState<DISKDataType[]>([])
  const [items, setItems] = useState<CollapseProps['items']>([])

  // R2M:localMachineTools:getDISKInfo
  useEffect(() => {

    const DISKData = window.electron.ipcRenderer.sendSync("R2M:localMachineTools:getDISKInfo")

    console.log('res: ', DISKData )
    setDISKData(DISKData)

    const tmpItems = convertDISKDataToCollapsePropsItem(DISKData)
    setItems(tmpItems)


  }, [])
  return (
    <div>
      <Collapse accordion items={items} />
    </div>
  )
}

export default disk
