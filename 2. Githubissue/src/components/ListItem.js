import dayjs from "dayjs";
import styles from "./ListItem.module.css";
import ListItemLayout from "./ListItemLayout.js";
import Badge from "./Badge.js";
import relativeTime from "dayjs/plugin/relativeTime";

export default function listItem(props) {
  const { data } = props;

  const state = data.state === "open" ? "opened" : " was closed";
  const date = data.state === "open" ? data.created_at : data.closed_at;
  dayjs.extend(relativeTime);

  return (
    <ListItemLayout>
      <div>
        <div role="button" className={styles.title}>
          {data.title}
          {data.labels.length > 0 &&
            data.labels.map((badgeProps, idx) => (
              <Badge key={idx} {...badgeProps} />
            ))}
        </div>
        <div className={styles.description}>
          #{data.number} {state} {dayjs(date).fromNow()} by {data.user.login}
        </div>
      </div>
    </ListItemLayout>
  );
}
