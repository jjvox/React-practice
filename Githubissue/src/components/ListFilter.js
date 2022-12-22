import styles from "./ListFilter.module.css";
import Modal from "./Modal.js";
import { useEffect, useState } from "react";
import axios from "axios";

const GITHUB_API = "https://api.github.com/repos/facebook/react";

export default function ListFilter({ onChangeFilter }) {
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState([]);
  const filterList = ["Label", "Milestone", "Assignee"];

  async function getData(apiPath) {
    const { data } = await axios.get(`${GITHUB_API}/${apiPath}`);

    let result = [];
    switch (apiPath) {
      case "assignees":
        result = data.map((d) => ({
          name: d.login,
        }));
        break;
      case "milestones":
        result = data.map((d) => ({
          name: d.title,
        }));
        break;
      case "labels":
      default:
        result = data;
    }
    setList(result);
  }

  useEffect(() => {
    if (showModal) {
      const apiPath = `${showModal.toLowerCase()}s`;
      getData(apiPath);
    }
  }, [showModal]);

  return (
    <>
      <div className={styles.filterLists}>
        {filterList.map((filter) => (
          <ListFilterItem
            key={filter}
            filter={filter}
            searchDataList={list}
            onClick={() => setShowModal(filter)}
            onClose={() => setShowModal()}
            showModal={showModal === filter}
            onChangeFilter={onChangeFilter}
          >
            {filter}
          </ListFilterItem>
        ))}
      </div>
    </>
  );
}

function ListFilterItem({
  onClick,
  onClose,
  children,
  onChangeFilter,
  showModal,
  searchDataList,
  filter,
}) {
  const [list, setList] = useState(searchDataList);

  useEffect(() => {
    setList(searchDataList);
  }, [searchDataList]);

  return (
    <div className={styles.filterItem}>
      <span role="button" onClick={onClick}>
        {children} <span>▼</span>
      </span>
      <div className={styles.modalContainer}>
        <Modal
          title={children}
          opened={showModal}
          onClose={onClose}
          placeholder="Filter labels"
          searchDataList={list}
          onClickCell={(params) => {
            onChangeFilter(params);
          }}
        />
      </div>
    </div>
  );
}
