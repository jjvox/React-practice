import styles from "./Badge.module.css";

export default function Badge({ name, color }) {
  return (
    // 받아오는 color 값에 따라 class가 바뀐다.
    <span className={styles.badge} style={{ background: `#${color}` }}>
      {name}
    </span>
  );
}
