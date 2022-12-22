/* eslint-disable react/button-has-type */
import cx from 'clsx';
import styles from './Button.module.css';

interface Props {
  style?: React.CSSProperties;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  style,
  className,
  type = 'button',
  disabled,
}: Props) {
  return (
    <button
      className={cx(styles.button, className)}
      style={style}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
