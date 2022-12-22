import cx from 'clsx';
import React from 'react';
import styles from './OpenClosedFilters.module.css';

interface Props {
  state: string;
  onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
  selected: boolean;
}

function OpenClosedFilter({ state, onClick, selected }: Props) {
  return (
    <button
      type="button"
      className={cx(styles.textFilter, { [styles.selected]: selected })}
      onClick={onClick}
    >
      {state}
    </button>
  );
}

interface FiltersProps {
  isOpenMode: boolean;
  onClickMode: (v: string) => void;
}

export default function OpenClosedFilters({
  isOpenMode,
  onClickMode,
}: FiltersProps) {
  return (
    <div>
      <OpenClosedFilter
        state="Open"
        selected={isOpenMode}
        onClick={() => onClickMode('open')}
      />
      <OpenClosedFilter
        state="Closed"
        selected={!isOpenMode}
        onClick={() => onClickMode('closed')}
      />
    </div>
  );
}
