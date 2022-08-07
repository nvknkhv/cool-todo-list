import React from 'react';
import { languageList } from '~/i18n';
import { localeSelector, setLocale } from '~/reducers/localeSlice';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { Select } from '@chakra-ui/react';

const LocaleSwitcher = () => {
  const locale = useAppSelector(localeSelector);
  const dispatch = useAppDispatch();
  return (
    <Select
      colorScheme="orange"
      focusBorderColor="none"
      bgColor="white"
      defaultValue={locale}
      onChange={({ target }) => {
        if (target.type === 'select-one') {
          const language = target.selectedOptions[0].value;
          dispatch(setLocale({ language }));
        }
      }}
    >
      {Object.entries(languageList).map(([key, title]) => {
        return (
          <option key={key} value={key}>
            {title}
          </option>
        );
      })}
    </Select>
  );
};

export default LocaleSwitcher;
