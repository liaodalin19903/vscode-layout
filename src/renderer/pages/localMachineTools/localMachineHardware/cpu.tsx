import React, { useEffect, useState } from 'react'

// key：用于Tabs； 如果相同就在后面`-（+1） `
import { pagesKey } from '../../1.config/pages.config'

import { Card, Divider } from 'antd';

interface CPUDataType {
    "manufacturer": string,
    "brand": string,
    "vendor": string,
    "family": string,
    "model": string,
    "stepping": string,
    "revision": string,
    "voltage": string,
    "speed": number,
    "speedMin": number,
    "speedMax": number,
    "governor": string,
    "cores": number,
    "physicalCores": number,
    "performanceCores": number,
    "efficiencyCores": number,
    "processors": number,
    "socket": string,
    "flags": string,
    "virtualization": boolean,
    "cache": {
        "l1d": number,
        "l1i": number,
        "l2": number,
        "l3": null | number
    }
}

export const defaultInfo = (info: string | number | boolean | null | undefined) => {

  if(typeof defaultInfo === 'boolean') {
    defaultInfo ? '是' : '否'
  }

  return info ? info : '暂无信息'
}

const CPU = () => {

  const [CPUData, setCPUData] = useState<CPUDataType>()

  useEffect(() => {

    const CPUData = window.electron.ipcRenderer.sendSync("R2M:localMachineTools:getCPUInfo")
    setCPUData(CPUData)
    console.log('res: ', CPUData )

  }, [])

  return (

    <div style={{ overflow: 'scroll', height: 'calc(100vh - 104px)'}}>
      <div style={{ padding: '16px' }}>
      <Card title="CPU" size="small" bordered={true} style={{ width: 300 }}>

        <Divider orientation="left">基本信息</Divider>

        <p>制造商（manufacturer）:{ defaultInfo(CPUData?.manufacturer)}</p>
        <p>品牌（brand）:{defaultInfo(CPUData?.brand)}</p>
        <p>供应商（vendor）:{defaultInfo(CPUData?.vendor)}</p>
        <p>族（family）:{defaultInfo(CPUData?.family)}</p>
        <p>型号（model）:{defaultInfo(CPUData?.model)}</p>
        <p>步进（stepping）:{defaultInfo(CPUData?.stepping)}</p>
        <p>修订版（revision）:{defaultInfo(CPUData?.revision)}</p>


        <Divider orientation="left">速度</Divider>

        <p>电压（voltage）:{defaultInfo(CPUData?.voltage)}</p>
        <p>速度（speed）:{defaultInfo(CPUData?.speed)}</p>
        <p>最低速度（speedMin）:{defaultInfo(CPUData?.speedMin)}</p>
        <p>最大速度（speedMax）:{defaultInfo(CPUData?.speedMax)}</p>
        <p>调度数（governor）:{defaultInfo(CPUData?.governor)}</p>

        <Divider orientation="left">处理器</Divider>

        <p>核心数（cores）:{defaultInfo(CPUData?.cores)}</p>
        <p>物理核心数（physicalCores）:{defaultInfo(CPUData?.physicalCores)}</p>
        <p>高性能核心数（performanceCores）:{defaultInfo(CPUData?.performanceCores)}</p>
        <p>高效能核心数（efficiencyCores）:{defaultInfo(CPUData?.efficiencyCores)}</p>
        <p>处理器数目（processors）:{defaultInfo(CPUData?.processors)}</p>
        <p>虚拟化支持（virtualization）:{defaultInfo(CPUData?.virtualization)}</p>

        <p>插槽（socket）:{defaultInfo(CPUData?.socket)}</p>
        <p>标志位（flags）:{defaultInfo(CPUData?.flags)}</p>

        <Divider orientation="left">缓存</Divider>
        <p>一级数据缓存（l1d）:{defaultInfo(CPUData?.cache.l1d)}</p>
        <p>一级指令缓存（l1i）:{defaultInfo(CPUData?.cache.l1i)}</p>
        <p>二级缓存（l2）:{defaultInfo(CPUData?.cache.l2)}</p>
        <p>三级缓存（l3）:{defaultInfo(CPUData?.cache.l3)}</p>



      </Card>
      </div>
    </div>
  )
}

export default CPU
