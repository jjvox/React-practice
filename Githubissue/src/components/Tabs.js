import styles from "./Tabs.module.css";
import cx from "clsx";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const tabList = [
  { name: "Code", pathname: "/code" },
  { name: "Issues", pathname: "/issues" },
  { name: "Pull Request", pathname: "/pulls" },
  { name: "Actions", pathname: "/actions" },
  { name: "Projects", pathname: "/projects" },
  { name: "Security", pathname: "/security" },
];

export default function Tabs() {
  const { pathname } = useLocation();

  return (
    <ul className={styles.tabList}>
      {tabList.map((tab, idx) => (
        <Tab
          key={`${idx}`}
          item={tab}
          selected={(pathname === "/" ? "/issues" : pathname) === tab.pathname}
        />
      ))}
    </ul>
  );
}

function Tab(props) {
  const { item, selected, number } = props;

  // Link 태그 - 페이지를 새로 불러 오는 것을 막고 history api를 이용해 브라우저 주소의 경로만 바꿔준다.

  return (
    <>
      <li>
        <Link to={item.pathname} className={styles.link}>
          {/* 
          cx내부 {}에 있는 ':' 뒤의 내용이 true가 될때만 [] 안의 class가 들어간다.
        */}
          <button className={cx(styles.tab, { [styles.selected]: selected })}>
            <span>{item.name}</span>
            {number && <div className={styles.circle}>{number}</div>}
          </button>
        </Link>
      </li>
    </>
  );
}
