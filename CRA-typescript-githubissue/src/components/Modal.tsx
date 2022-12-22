import React, { useState, useEffect } from 'react';
import cx from 'clsx';
import styles from './Modal.module.css';
import { List } from './ListFilter';

interface Props {
  opened: boolean;
  title: string;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  placeholder?: string;
  searchDataList: List[];
  onClickCell: (value: Record<string, string>) => void;
}

export default function Modal({
  opened,
  title,
  onClose,
  placeholder,
  searchDataList,
  onClickCell,
}: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(searchDataList);

  useEffect(() => {
    setFilteredData(searchDataList);
  }, [searchDataList]);

  useEffect(() => {
    if (searchValue === '') {
      setFilteredData(searchDataList);
    } else {
      const filteredSearchList = searchDataList.filter(
        (item) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          item.name.toLowerCase().includes(searchValue.toLocaleLowerCase()),
        // eslint-disable-next-line function-paren-newline
      );
      setFilteredData(filteredSearchList);
    }
  }, [searchDataList, searchValue]);

  return (
    <div className={cx(styles.modal, { [styles.opened]: opened })}>
      <div className={styles.header}>
        <span>
          Filter by
          {title}
        </span>
        <button type="button" onClick={onClose}>
          X
        </button>
      </div>
      <div className={styles.input}>
        <input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className={styles.list}>
        {filteredData.map((data) => (
          <div
            key={data.name}
            onClick={() => {
              const isLabel = title.toLowerCase() === 'label';
              const paramKey = isLabel ? 'labels' : title.toLowerCase();

              onClickCell({ [paramKey]: data.name }); // 변수를 key로 넣을떈 [] 안에 넣는다.
            }}
            className={styles.item}
          >
            {data.name}
          </div>
        ))}
      </div>
    </div>
  );
}
