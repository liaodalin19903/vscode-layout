import React from 'react'
import { useState } from 'react'

import styles from './VscodeLayout.module.css';

import { Allotment } from "allotment";
import "allotment/dist/style.css";

import { ActivityBar } from "./activebar/activity-bar";

import Header from './header'

import MainContent from './mainContent'

//#region 引入sidebar components
import OpenedTools from '../SidebarComp/OpenedTools'
import Search from '../SidebarComp/Search'
import CollectedTools from '../SidebarComp/CollectedTools'
import LocalMachineTools from '../SidebarComp/LocalMachineTools'
import NetworkTools from '../SidebarComp/NetworkTools'
import MultimediaTools from '../SidebarComp/MultimediaTools'
import DatabaseTools from '../SidebarComp/DatabaseTools'

const SidebarComps = [
  OpenedTools,
  Search,
  CollectedTools,
  LocalMachineTools,
  NetworkTools,
  MultimediaTools,
  DatabaseTools
]

//#endregion

function VscodeLayout({ }) {

  const [panelVisible, setPanelVisible] = useState(true);
  const [primarySideBar, setPrimarySideBar] = useState(true);
  const [secondarySideBar, setSecondarySideBar] = useState(false);

  const [activity, onActivityChanged] = useState(3)

  const ActivityComp = SidebarComps[activity];

  return (

    <div className={styles.container}>
      <div className={styles.header}>
        <Header
          showPanel={panelVisible}
          showPrimarySideBar={primarySideBar}
          showSecondarySideBar={secondarySideBar}
          onShowPanelChanged={setPanelVisible}
          onShowPrimarySideBarChanged={setPrimarySideBar}
          onShowSecondarySidebarChanged={setSecondarySideBar}
        ></Header>
      </div>
      <div className={styles.content}>
        <div className={styles.mainSidebar}>
        <ActivityBar
          checked={activity}   // activity
          items={[
            //"star-empty",
            "list",
            "sousuo",
            "shoucang1",
            "pc",
            "wangluo",
            "duomeiti",
            "database",
          ]}
          onClick={(index) => {

            onActivityChanged(index);
          }}
        />
        </div>
        <div className={styles.contentContainer}>
        <Allotment >
          <Allotment.Pane minSize={168} preferredSize={240} visible={primarySideBar}>
            <div className={styles.secondSidebar}>
              {/* mmkk - {activity} */}
              <ActivityComp></ActivityComp>
            </div>
          </Allotment.Pane>
          <Allotment.Pane >
            <div className={styles.content}>
              <MainContent />
            </div>
          </Allotment.Pane>
          <Allotment.Pane minSize={172} preferredSize={240}  visible={secondarySideBar}>
            <div className={styles.rightBar}>
              rightbar
            </div>
          </Allotment.Pane>
        </Allotment>

        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  )
}

export default VscodeLayout
