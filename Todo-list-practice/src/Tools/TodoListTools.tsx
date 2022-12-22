import styles from "./TodoListTools.module.css";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useTodoDispatch, useTodoState } from "../Todo/TodoProvider";

const TodoListTools = () => {
  const todoState = useTodoState();
  const todoDispatch = useTodoDispatch();

  const isTodoAllChecked = () => {
    return todoState.todos.every((todo) => todo.isChecked);
  };

  const handleToggleAllClick = () => {
    todoDispatch({
      type: "allChecked",
      payload: isTodoAllChecked(),
    });
  };

  const handleRemoveAllClick = () => {
    todoDispatch({
      type: "allRemove",
    });
  };

  return (
    <section className={styles.container}>
      <button className={styles.button} onClick={handleToggleAllClick}>
        <IoCheckmarkDoneCircleOutline
          className={[
            styles.checkAllIcon,
            `${isTodoAllChecked() ? styles.CheckedCircleIcon : ""}`,
          ].join(" ")}
        />
        {isTodoAllChecked() ? "전체해제" : "전체완료"}
      </button>
      {/* className 두개를 배열로 넣은 다음 join(" ") 를 이용해 하나의 문자열로 바꿨다.  */}
      <button
        className={[styles.button, styles.removeAllButton].join(" ")}
        onClick={handleRemoveAllClick}
      >
        <MdDelete className={styles.removeAllIcon} />
        전체삭제
      </button>
    </section>
  );
};

export default TodoListTools;
