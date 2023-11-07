import { Flex, Button, Popover, Card, Space } from 'antd'
import React, { useEffect, useState } from 'react'

interface AddressInfo {
  address: string;
  netmask: string;
  family: string;
  mac: string;
  internal: boolean;
  cidr: string;
  scopeid?: number;
}

interface interfaceDataType {
  [key: string]: AddressInfo[];
}

export interface NetworkInterfacesProps {
  ifs: {
    [key: string]: AddressInfo[];
  };
}


function localMachineInterfaces() {

  // R2M:localMachineTools:getInterfacesInfo
  //let interfacesData:interfaceDataType = {}

  const [interfacesData, setInterfacesData] = useState<interfaceDataType>({})

  useEffect(() => {

    const res = window.electron.ipcRenderer.sendSync("R2M:localMachineTools:getInterfacesInfo")

    setInterfacesData(res)

  }, [])

  return (
    <div>
      <Card>
        <div style={{ overflow: 'scroll', height: 'calc(100vh - 134px)'}}>
          <div>网卡信息</div>
          <Space size={[8, 16]} wrap align='start'>

            {
              Object.entries(interfacesData).map((([key, addresses]: [string, AddressInfo[]]) => (
                <Card
                  title={key}
                  key={key}
                  style={{ width: '350px' }}
                >
                  {addresses.map((address, index) => (

                    <p key={index} style={ {justifyContent: 'space-between',
                      display: 'flex'} } >

                    {address.address}

                    <Popover
                      placement="topLeft"
                      title={'详情'}
                      content={
                        <div>
                          <p> { 'IP类型 : ' + (address.internal ? '内网IP' : '公网IP' )} </p>
                          <p> { 'IP地址: ' + address.address  }</p>
                          <p> { 'cidr: ' + address.cidr } </p>
                          <p> { '掩码: ' + address.netmask  } </p>
                          <p> { 'family: ' + address.family } </p>
                          <p> { 'mac: ' + address.mac } </p>
                          <p> { 'scopeid: ' + (address.scopeid ? address.scopeid : '无') } </p>
                        </div>
                      }
                      trigger="click"
                    >
                      <Button style={{marginLeft: '8px'}}> 查看详情 </Button>
                    </Popover>

                    </p>
                  ))}
                </Card>
              )))
            }
          </Space>
        </div>
      </Card>
    </div>
  )
}

export default localMachineInterfaces

