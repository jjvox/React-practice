import cx from 'clsx';
import styles from './ListItemLayout.module.css';

interface Props {
  style?: React.CSSProperties;
  children: React.ReactNode;
  className?: string;
}

export default function ListItemLayout({ children, className, style }: Props) {
  return (
    <div className={cx(styles.wrapper, className)} style={style}>
      <input type="checkbox" className={styles.checkbox} />
      {children}
    </div>
  );
}
