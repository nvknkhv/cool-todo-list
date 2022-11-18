import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  VStack,
  ButtonGroup,
  useOutsideClick,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { FilterFilled, Filter } from '~/assets/icons';
import { useAppDispatch } from '~/app/hooks';
import { setFilter, resetFilter } from '~/reducers/filtersSlice';
import { Tag } from '~/model/enums';

const FilterItem: FC<{
  field: 'tags' | 'description';
  children: React.ReactNode;
  value: string | Tag[];
  onClose: () => void;
  onReset: () => void;
  isActive: boolean;
}> = ({
  field,
  children,
  value,
  onClose: resetFilterValue,
  onReset,
  isActive = false,
}) => {
  const { t } = useTranslation(['Fields', 'Common']);
  const dispatch = useAppDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const triggerButtonRef = React.useRef(null);
  const popupContentRef = React.useRef(null);

  useOutsideClick({
    ref: popupContentRef,
    handler: (event) => {
      if (event.target !== triggerButtonRef?.current) {
        setIsFilterOpen(false);
      }
    },
  });

  return (
    <Popover
      isOpen={isFilterOpen}
      onClose={() => {
        resetFilterValue();
      }}
      autoFocus={false}
    >
      <PopoverTrigger>
        <Button
          rightIcon={isFilterOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          leftIcon={isActive ? <FilterFilled /> : <Filter />}
          variant="ghost"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          ref={triggerButtonRef}
        >
          {t(`Fields:${field}`)}
        </Button>
      </PopoverTrigger>
      <PopoverContent p={3} ref={popupContentRef}>
        <PopoverArrow />
        <PopoverBody>
          <VStack spacing={4}>
            {children}
            <ButtonGroup display="flex" justifyContent="flex-end">
              <Button
                variant="ghost"
                onClick={() => {
                  dispatch(resetFilter({ field }));
                  setIsFilterOpen(false);
                  onReset();
                }}
                isDisabled={isEmpty(value)}
              >
                {t('Common:Button.clear')}
              </Button>
              <Button
                colorScheme="orange"
                onClick={() => {
                  if (isEmpty(value)) {
                    dispatch(resetFilter({ field }));
                  } else {
                    dispatch(setFilter({ field, value }));
                  }
                  setIsFilterOpen(false);
                }}
              >
                {t('Common:Button.apply')}
              </Button>
            </ButtonGroup>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default FilterItem;
