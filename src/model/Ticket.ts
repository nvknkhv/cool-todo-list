import { Tag, Status } from '~/model/enums';

export interface Comment {
  author: string;
  text: string;
}

export interface Ticket {
  description: string;
  comments: Comment[];
  status: Status;
  tags: Tag[];
  ticketId: string;
  title: string;
}

export type TicketFormValues = Omit<Ticket, 'tags'> & {
  tags: { value: Tag; label: Tag }[];
};

export interface TicketColumn {
  tickets: Ticket[];
  status: Status;
}

export interface Action {
  callback: () => void;
  icon: React.ReactElement;
  text: string;
}
