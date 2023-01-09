import TodoItem from "../ListItem/TodoItem";
import styles from "./TodoList.module.css";
import { useTodoState } from "../Todo/TodoProvider";

const TodoList = () => {
  const todoState = useTodoState();
  return (
    <section>
      <ol className={styles.olContainer}>
        {todoState.todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              text={todo.text}
              isChecked={todo.isChecked}
              id={todo.id}
            />
          );
        })}
      </ol>
    </section>
  );
};

export default TodoList;
