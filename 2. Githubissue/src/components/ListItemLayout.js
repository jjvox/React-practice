import cx from "clsx";
import styles from "./ListItemLayout.module.css";

export default function ListItemLayout({ children, className, style }) {
  return (
    // className을 props로 가져와서 확장 할 수 있다.
    <div className={cx(styles.wrapper, className)} style={style}>
      <input type="checkbox" className={styles.checkbox} />
      {children}
    </div>
  );
}
