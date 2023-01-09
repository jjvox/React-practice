import styles from "./Button.module.css";
import cx from "clsx";

export default function Button({
  children,
  className,
  type = "button",
  disabled,
}) {
  return (
    <button
      className={cx(styles.button, className)}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
