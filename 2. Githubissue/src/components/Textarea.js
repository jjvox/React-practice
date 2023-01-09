import { forwardRef } from "react";
import cx from "clsx";
import styles from "./Textarea.module.css";

export default forwardRef(function TextFiled(
  { type = "input", name, placeholder, onChange, value, error },
  ref
) {
  return type === "input" ? (
    <input
      onChange={onChange}
      value={value}
      name={name}
      className={cx(styles.input, styles.border, {
        [styles.error]: Boolean(error),
      })}
      placeholder={placeholder}
      ref={ref}
    ></input>
  ) : (
    <textarea
      onChange={onChange}
      value={value}
      name={name}
      className={cx(styles.textarea, styles.border, styles.input, {
        [styles.error]: Boolean(error),
      })}
      placeholder={placeholder}
      ref={ref}
    ></textarea>
  );
});
