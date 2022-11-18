import { v4 as uuidv4 } from 'uuid';
import { Status, Tag } from '~/model/enums';
import { Ticket } from '~/model/Ticket';

const defaultTickets: Record<Status, Ticket[]> = {
  [Status.Todo]: [
    {
      ticketId: uuidv4(),
      title: 'ДЗ сборка (webpack)',
      status: Status.Todo,
      description:
        'Cсылка на документацию: https://webpack.js.org/contribute/writing-a-plugin/',
      tags: [Tag.Medium, Tag.Development, Tag.Research],
      comments: [
        {
          author: 'Иван Иванов',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
      ],
    },
    {
      ticketId: uuidv4(),
      title: 'Сделать ДЗ по TS',
      status: Status.Todo,
      description: 'К дедлайну обязательно',
      tags: [Tag.Low, Tag.Critical],
      comments: [],
    },
  ],
  [Status.InProgress]: [
    {
      ticketId: uuidv4(),
      title: 'Отдохнуть',
      status: Status.InProgress,
      description: 'Без дедлайна',
      tags: [],
      comments: [],
    },
  ],
  [Status.Done]: [
    {
      ticketId: uuidv4(),
      title: 'ДЗ по асинхронности',
      status: Status.Done,
      description: 'Дедлайн - 01.01.2022',
      tags: [Tag.Medium],
      comments: [
        {
          author: 'Наташа',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
      ],
    },
    {
      ticketId: uuidv4(),
      title: 'ДЗ по реакту',
      status: Status.Done,
      description: '',
      tags: [Tag.High],
      comments: [
        {
          author: 'Наташа',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
      ],
    },
  ],
};

export default defaultTickets;
