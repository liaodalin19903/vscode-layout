import { TabsWithBreadcrumbs } from '../../components/Common/TabsWithBreadcrumbs';

interface TabsSlice {
  tabs: TabsWithBreadcrumbs,
  addTab: (tab: TabsWithBreadcrumbs[number]) => {},
  removeTab: (key: string) => {},
}

import AppIntro from '../../pages/1.config/appIntro'

export const createTabsSlice = (set:any, get:any): TabsSlice => ({

  tabs: [
   { title: '简介', breadcrumbs: ['简介'], key: '000-000', children: AppIntro },
  ],


  addTab: (tab) => {
    //console.log('mmkk2 tab: ', tab)
    return set((state) => ({ tabs: state.tabs.concat(tab) }))
  },

  removeTab: (key: string) => {
    return set((state) => ({
     tabs: state.tabs.filter(tab => tab.key !== key)
    }))
  },
});
