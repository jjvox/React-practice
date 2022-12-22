import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ListFilter.module.css';
import Modal from './Modal';
import { DataItem, Data } from '../model/Issues';

const GITHUB_API = 'https://api.github.com/repos/facebook/react';

export type List = Partial<DataItem> & { name: string }; // Partial 은 DataItem의 내용중 하나이상을 쓸수도 있다는 뜻

interface ItemProps {
  onClick: () => void;
  onClose: () => void;
  children: string;
  onChangeFilter: (value: Record<string, string>) => void;
  showModal: boolean;
  searchDataList: List[];
}

function ListFilterItem({
  onClick,
  onClose,
  children,
  onChangeFilter,
  showModal,
  searchDataList,
}: ItemProps) {
  const [list, setList] = useState(searchDataList);

  useEffect(() => {
    setList(searchDataList);
  }, [searchDataList]);
  return (
    <div className={styles.filterItem}>
      <button type="button" onClick={onClick}>
        {children}
        <span>▼</span>
      </button>
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

export default function ListFilter({
  onChangeFilter,
}: {
  onChangeFilter: (value: Record<string, string>) => void;
}) {
  const [showModal, setShowModal] = useState<string>();
  const [list, setList] = useState<List[]>([]);
  const filterList = ['Label', 'Milestone', 'Assignee'];

  async function getData(apiPath: string) {
    const { data }: Data = await axios.get(`${GITHUB_API}/${apiPath}`);

    let result: { name: string }[] = [];
    switch (apiPath) {
      case 'assignees':
        result = data.map((d) => ({
          name: d.login,
        }));
        break;
      case 'milestones':
        result = data.map((d) => ({
          name: d.title,
        }));
        break;
      case 'labels':
        result = data.map((d) => ({
          name: d.name,
        }));
        break;
      default:
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
    <div className={styles.filterLists}>
      {filterList.map((filter) => (
        <ListFilterItem
          key={filter}
          searchDataList={list}
          onClick={() => setShowModal(filter)}
          onClose={() => setShowModal(undefined)}
          showModal={showModal === filter}
          onChangeFilter={onChangeFilter}
        >
          {filter}
        </ListFilterItem>
      ))}
    </div>
  );
}
