import React, { useState } from "react";

import "@vscode/codicons/dist/codicon.css";

import classNames from "classnames";

import styles from "./activity-bar.module.css";
import { Popover } from "antd";

import { iconToName } from '../../../pages/1.config/pages.config'

export type ActivityBarProps = {
  checked: number;
  items: string[];
  onClick: (index: number) => void;
};

export const ActivityBar = ({ checked, items, onClick }: ActivityBarProps) => {

  const [clicked, setClicked] = useState(-1)

  return (
    <div className={styles.activitybar}>
      <div className={styles.content}>
        <ul className={styles.actionsContainer}>
          {items.map((item, index) => (
            <Popover key={index} placement="right" content={iconToName(item)} trigger="click" open={clicked === index ? true : false}>

            <li
              key={index}
              className={classNames(styles.actionItem, {
                [styles.checked]: index === checked,
              })}
              onMouseOver={()=> {
                console.log('onMouseOver...')
                // const content = (
                //   <p>测试字符串</p>
                // )

                setClicked(index)
              }}
            >

              <a
                className={classNames(
                  `iconfont icon-${item}`,
                  checked === index ? styles.actionActiveLabel : styles.actionDeactiveLabel
                )}
                onClick={() => {
                  onClick(index)
                  setClicked(-1)
                }}
              ></a>

            </li>
            </Popover>

          ))}
        </ul>
      </div>
    </div>
  );
};
