import React, { forwardRef } from 'react';
import type { MutableRefObject, ReactElement, RefAttributes } from 'react';
import type { GroupBase, SelectInstance } from 'react-select';
import Select from 'react-select';
import type { Props as SelectProps } from 'react-select';
import { withAsyncPaginate } from 'react-select-async-paginate';
import type {
  UseAsyncPaginateParams,
  ComponentProps,
} from 'react-select-async-paginate';

import useChakraSelectProps from './useChakraSelectProps';

type AsyncPaginateProps<
  OptionType,
  Additional,
  IsMulti extends boolean,
> = SelectProps<OptionType> &
  UseAsyncPaginateParams<OptionType, GroupBase<OptionType>, Additional> &
  ComponentProps<OptionType, GroupBase<OptionType>, IsMulti>;

type AsyncPaginateType = <OptionType, Additional, IsMulti extends boolean>(
  props: AsyncPaginateProps<OptionType, Additional, IsMulti> &
    RefAttributes<SelectInstance<OptionType, IsMulti, GroupBase<OptionType>>>,
) => ReactElement;

const AsyncPaginateStyled = forwardRef(
  <OptionType, Additional, IsMulti extends boolean>(
    props: AsyncPaginateProps<OptionType, Additional, IsMulti>,
    ref:
      | ((instance: SelectInstance<OptionType, IsMulti> | null) => void)
      | MutableRefObject<SelectInstance<OptionType, IsMulti> | null>
      | null,
  ) => {
    const chakraSelectProps = useChakraSelectProps(props);
    return <Select ref={ref} {...chakraSelectProps} />;
  },
) as AsyncPaginateType;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const CustomAsyncPaginate = withAsyncPaginate(AsyncPaginateStyled);
export default CustomAsyncPaginate;
