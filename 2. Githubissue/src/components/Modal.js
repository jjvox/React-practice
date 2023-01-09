import { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import cx from "clsx";

export default function Modal({
  opened,
  title,
  onClose,
  placeholder,
  searchDataList,
  onClickCell,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(searchDataList);
  console.log(filteredData);
  console.log(searchValue);

  useEffect(() => {
    setFilteredData(searchDataList);
  }, [searchDataList]);

  useEffect(() => {
    if (searchValue === "") {
      setFilteredData(searchDataList);
    } else {
      const filteredSearchList = searchDataList.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
      );
      setFilteredData(filteredSearchList);
    }
  }, [searchDataList, searchValue]);

  return (
    <div className={cx(styles.modal, { [styles.opened]: opened })}>
      <div className={styles.header}>
        <span>Filter by {title}</span>
        <button onClick={onClose}>X</button>
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
              const isLabel = title.toLowerCase() === "label";
              const paramKey = isLabel ? "labels" : title.toLowerCase();

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
