import { BadgeProps } from '../components/Badge';

export interface DataItem {
  login: string;
  title: string;
  name: string;
}

export interface Data {
  data: DataItem[];
}

export interface ListItem {
  id: string;
  labels: BadgeProps[];
  state: 'open' | 'close';
  created_at: string;
  closed_at: string;
  title: string;
  number: number;
  user: {
    login: string;
  };
}
