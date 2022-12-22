import styles from "./TodoItem.module.css";
import { BsCheckCircle } from "react-icons/bs";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useTodoDispatch } from "../Todo/TodoProvider";

interface TodoItemProps {
  text: string;
  isChecked: boolean;
  id: number;
}

const TodoItem = (props: TodoItemProps) => {
  const todoDispatch = useTodoDispatch();

  const handleToggleClick = () => {
    todoDispatch({
      type: "checked",
      payload: {
        id: props.id,
      },
    });
  };

  const handleRemoveClick = () => {
    todoDispatch({
      type: "remove",
      payload: {
        id: props.id,
      },
    });
  };

  return (
    <li className={styles.container}>
      <BsCheckCircle
        className={[
          styles.checkIcon,
          `${
            props.isChecked
              ? styles.CheckedCircleIcon
              : styles.unCheckedCircleIcon
          }`,
        ].join(" ")}
        onClick={handleToggleClick}
      />
      <span className={props.isChecked ? styles.strikethrough : ""}>
        {props.text}
      </span>
      <IoIosRemoveCircleOutline
        className={styles.removeIcon}
        onClick={handleRemoveClick}
      />
    </li>
  );
};

export default TodoItem;
