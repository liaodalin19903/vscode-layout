// 基于字符串返回对应的JSX

import React from "react"

//#region 
// 0、appIntro
import AppIntro from "./appIntro"


// 1、LocalMachineTools
import Cpu from '../localMachineTools/localMachineHardware/cpu'
import Ram from '../localMachineTools/localMachineHardware/ram'
import Disk from '../localMachineTools/localMachineHardware/disk'

import LocalMachineInterfaces from '../localMachineTools/localMachineNetwork/localMachineInterfaces'
//#endregion

export const pagesKey = {

  theProduct: {
    productInfo: '000-000'
  },

  localMachineTools: {
    localMachineHardware: '001',
    cpu: '001-001',
    ram: '001-002',
    disk: '001-003',

    localMachineNetwork: '002',
    localMachineInterfaces: '002-001'
    
  },

  networkTools: {

  }
}

export const pagesBreadcrumbs = {
  '000-000': ['软件简介'],
  '001-001': ['本机信息', '本机硬件信息', 'CPU'],
  '001-002': ['本机信息', '本机硬件信息', 'RAM'],
  '001-003': ['本机信息', '本机硬件信息', '磁盘'],

  '002-001': ['本机信息', '本机网络信息', '本机网卡']
}


export const getJsxByName = (name: string): ()=>JSX.Element => {

  switch(name) {
    //#region 1、LocalMachineTools
    case "Cpu": 
      return Cpu 
    case "Ram":
      return Ram
    case "Disk":
      return Disk
    case "LocalMachineInterfaces":
      return LocalMachineInterfaces 
    //#endregion
    default:
      return () => {return <></>}

  }

}


export const pagesForTabChildren = (key: string | number): ()=>JSX.Element => {
  switch(key) {
    //#region 
    // 0、theProduct
    case pagesKey.theProduct.productInfo: 
      return AppIntro 
    // 1、LocalMachineTools  
    case pagesKey.localMachineTools.cpu:
      return Cpu
    case pagesKey.localMachineTools.ram:
      return Ram
    case pagesKey.localMachineTools.disk:
      return Disk
    case pagesKey.localMachineTools.localMachineInterfaces:
      return LocalMachineInterfaces 


    //#endregion
    default:
      return () => {return <></>}

  }
}