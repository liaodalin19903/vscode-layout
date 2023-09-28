import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';


import { createTabsSlice } from './framework/tabs.store'

// 全局状态
export const useStore = create(
  (set:any, get:any) => ({
    ...createTabsSlice(set, get)
  }),
)
