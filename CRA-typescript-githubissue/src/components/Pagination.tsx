import cx from 'clsx';
import styles from './Pagination.module.css';

interface OnClickProps {
  onClick: (page: number) => void;
}

interface PageButtonPops extends OnClickProps {
  onClick: (page: number) => void;
  number: number;
  selected: boolean;
}

function PageButton({ onClick, number, selected }: PageButtonPops) {
  return (
    <button
      type="button"
      className={cx(styles.button, { [styles.selected]: selected })}
      onClick={() => onClick(number)}
    >
      {number}
    </button>
  );
}

interface Props extends OnClickProps {
  currentPage: number;
  maxPage: number;
}

export default function Pagination({ currentPage, maxPage, onClick }: Props) {
  return (
    <div>
      <button
        type="button"
        className={cx(styles.button, styles.blueButton)}
        disabled={currentPage === 1}
      >
        {'< Previous'}
      </button>
      {new Array(maxPage).fill(null).map((_, idx) => (
        <PageButton
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          number={idx + 1}
          onClick={onClick}
          selected={currentPage ? idx + 1 === currentPage : idx === 0}
        />
      ))}
      <button
        type="button"
        className={cx(styles.button, styles.blueButton)}
        disabled={currentPage === maxPage}
      >
        {'Next >'}
      </button>
    </div>
  );
}
