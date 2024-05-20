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

// 2、网络工具
import Ping from '../networkTools/networkTools/ping'
import Traceroute from '../networkTools/networkTools/traceroute'

import PortSniffing from '../networkTools/networkTools/portSniffing'

import AnaPCAP from "../networkTools/networkAna/anaPCAP"
// 3、


//#endregion

/**
 * 【需要更新条件】：
 *
 */
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
    networkTools: '003-01',  // 网络工具

    ping: '003-001',
    traceroute: '003-002',
    portSniffing: '003-003', // 端口嗅探

    ana: '003-02',  // 网络分析
    anaPCAP: "003-004"
  }
}

/**
 * 【需要更新条件】：pagesKey增加就增加
 *
 * 功能：直接对搜索参数进行搜索返回搜索到的工具的keys
 */
export const filterKeysBySearchParams = (searchParam: string): string[] => {

  //#region key对应的被搜索数据：字符串数组
  interface SearchData {
    [key: string]: string[];
  }
  const searchData: SearchData = {
    "000-000": ["简介"],

    "001-001": ["CPU", "中央处理器"],
    "001-002": ["RAM", "内存条"],
    "001-003": ["DISK", "磁盘", "硬盘", "存储"],

    "002-001": ["INTERFACE", "网卡", "en"],

    "003-001": ["ping", "通", "ICMP"],
    "003-002": ["traceoute", "path", "路径", "路由"],
    "003-003": ["port", "端口", "端口嗅探"],
    "003-004": ["网络分析", "wireshark", "pcap", "抓包"],

  }

  // 搜索方法
  // https://segmentfault.com/q/1010000044352055
  function searchKeys(searchParam: string): string[] {
    const loweredSearchParam = searchParam.toLowerCase();

    const keys: string[] = Object.keys(searchData).filter((key: string) => {
      const keywords: string[] = searchData[key];
      return keywords.some((keyword: string) => keyword.toLowerCase().includes(loweredSearchParam));
    });

    return keys;
  }




  //#endregion

  const result: string[] = searchKeys(searchParam);

  return result
}

/**
 * 【需要更新条件】：
 *
 */
export const pagesBreadcrumbs = {
  '000-000': ['软件简介'],
  '001-001': ['本机信息', '本机硬件信息', 'CPU'],
  '001-002': ['本机信息', '本机硬件信息', 'RAM'],
  '001-003': ['本机信息', '本机硬件信息', '磁盘'],

  '002-001': ['本机信息', '本机网络信息', '本机网卡'],

  '003-001': ['计算机网络', '网络工具', 'ping'],
  '003-002': ['计算机网络', '网络工具', 'traceroute'],
  '003-003': ['计算机网络', '网络工具', '端口嗅探'],
  '003-004': ['计算机网络', '网络分析', 'pcap包分析'],


}


// export const getJsxByName = (name: string): ()=>JSX.Element => {

//   switch(name) {
//     //#region 1、LocalMachineTools
//     case "Cpu":
//       return Cpu
//     case "Ram":
//       return Ram
//     case "Disk":
//       return Disk
//     case "LocalMachineInterfaces":
//       return LocalMachineInterfaces
//     //#endregion
//     default:
//       return () => {return <></>}

//   }

// }


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
    // 2、网络工具
    case pagesKey.networkTools.ping:
      return Ping
    case pagesKey.networkTools.traceroute:
      return Traceroute
    case pagesKey.networkTools.portSniffing:
      return PortSniffing
    case pagesKey.networkTools.anaPCAP:
      return AnaPCAP

    //#endregion
    default:
      return () => {return <></>}

  }
}

/**
 * 【需要更新条件】：左侧icon增加就更新
 */
export const iconToName = (key: string):string => {

  switch(key) {
    case "list":
      return "已打开的页面"
    case "sousuo":
      return "搜索"
    case "shoucang1":
      return "收藏"
    case "pc":
      return "本机信息"
    case "wangluo":
      return "网络工具"
    case "duomeiti":
      return "多媒体工具"
    case "database":
      return "数据库工具"

    default:
      return ''
  }
}



