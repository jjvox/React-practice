import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import styles from './ListItem.module.css';
import ListItemLayout from './ListItemLayout';
import { ListItem } from '../model/Issues';
import Badge from './Badge';

interface Props {
  data: ListItem;
}

export default function listItem({ data }: Props) {
  const state = data.state === 'open' ? 'opened' : ' was closed';
  const date = data.state === 'open' ? data.created_at : data.closed_at;
  dayjs.extend(relativeTime);

  return (
    <ListItemLayout>
      <div>
        <div role="button" className={styles.title}>
          {data.title}
          {data.labels.length > 0 &&
            data.labels.map((badgeProps) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Badge key={badgeProps.name} {...badgeProps} />
            ))}
        </div>
        <div className={styles.description}>
          #{data.number}
          {state}
          {dayjs(date).fromNow()}
          by
          {data.user.login}
        </div>
      </div>
    </ListItemLayout>
  );
}
