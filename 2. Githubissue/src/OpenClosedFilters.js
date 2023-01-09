import styles from "./OpenClosedFilters.module.css";
import cx from "clsx";

export default function OpenClosedFilters({ isOpenMode, onClickMode }) {
  return (
    <div>
      <OpenClosedFilter
        state="Open"
        selected={isOpenMode}
        onClick={() => onClickMode("open")}
      />
      <OpenClosedFilter
        state="Closed"
        selected={!isOpenMode}
        onClick={() => onClickMode("closed")}
      />
    </div>
  );
}
function OpenClosedFilter({ state, onClick, selected }) {
  return (
    <span
      role="button"
      className={cx(styles.textFilter, { [styles.selected]: selected })}
      onClick={onClick}
    >
      {state}
    </span>
  );
}
