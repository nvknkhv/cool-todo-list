import React from 'react';
import { createIcon } from '@chakra-ui/icons';

export const Dots = createIcon({
  displayName: 'Dots',
  viewBox: '0 0 13 3',
  path: (
    <svg
      width="13"
      height="3"
      viewBox="0 0 13 3"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="1.5" cy="1.5" r="1.5" fill="#929292" />
      <circle cx="6.5" cy="1.5" r="1.5" fill="#929292" />
      <circle cx="11.5" cy="1.5" r="1.5" fill="#929292" />
    </svg>
  ),
});

export const FilterFilled = createIcon({
  displayName: 'FilterFilled',
  viewBox: '0 0 16 16',
  path: (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 2v1.67l-5 4.759V14H6V8.429l-5-4.76V2h14z"
      ></path>
    </svg>
  ),
});

export const Filter = createIcon({
  displayName: 'Filter',
  viewBox: '0 0 16 16',
  path: (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 2v1.67l-5 4.759V14H6V8.429l-5-4.76V2h14zM7 8v5h2V8l5-4.76V3H2v.24L7 8z"
      ></path>
    </svg>
  ),
});
