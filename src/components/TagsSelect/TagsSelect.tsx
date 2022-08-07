import React from 'react';
import type { Response } from 'react-select-async-paginate/ts/types';
import type { MultiValue } from 'react-select';

import { TAGS } from '~/assets/tagsConfig';
import TagsService from '~/services/TagsService';

import CustomAsyncPaginate from './CustomAsyncPaginate';
import { Wrapper } from './styled';
import type { OptionType, Additional } from './types';

const loadOptions = async (
  inputValue: string,
): Promise<Response<OptionType, any, Additional>> => {
  if (inputValue) {
    const tags = await TagsService.getKeywords(inputValue);
    const options = tags.map((item) => ({
      label: item,
      value: item,
    }));
    return {
      options,
      hasMore: false,
      additional: {
        page: 1,
      },
    };
  }
  return {
    options: TAGS.map((item) => ({
      label: item,
      value: item,
    })),
    hasMore: false,
    additional: {
      page: 1,
    },
  };
};

const TagsSelect: React.FC<{
  value?: MultiValue<OptionType>;
  defaultValue?: MultiValue<OptionType>;
  isClearable?: boolean;
  onChange: (value: MultiValue<OptionType>) => void;
}> = ({ isClearable = false, onChange, value, defaultValue = [] }) => {
  return (
    <Wrapper>
      <CustomAsyncPaginate
        isMulti
        isClearable={isClearable}
        menuPosition="fixed"
        value={value}
        defaultValue={defaultValue}
        loadingMessage={() => null}
        noOptionsMessage={() => null}
        loadOptions={loadOptions}
        additional={{
          page: 1,
        }}
        onChange={onChange}
        menuPlacement="bottom"
        placeholder=""
      />
    </Wrapper>
  );
};

export default TagsSelect;
