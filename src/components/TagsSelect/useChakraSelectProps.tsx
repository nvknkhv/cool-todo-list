import { useFormControl } from '@chakra-ui/react';
import type { GroupBase, Props } from 'react-select';
import {
  chakraComponents,
  SelectedOptionStyle,
  Size,
  TagVariant,
} from 'chakra-react-select';

const useChakraSelectProps = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  components = {},
  size = 'md',
  colorScheme = 'orange',
  isDisabled,
  isInvalid,
  inputId,
  tagVariant,
  hasStickyGroupHeaders = false,
  selectedOptionStyle = 'color',
  selectedOptionColor = 'orange.300',
  focusBorderColor = 'orange.300',
  errorBorderColor,
  chakraStyles = {},
  onFocus,
  onBlur,
  ...props
}: Props<Option, IsMulti, Group>): Props<Option, IsMulti, Group> => {
  // Combine the props passed into the component with the props that can be set
  // on a surrounding form control to get the values of `isDisabled` and
  // `isInvalid`
  const inputProps = useFormControl({
    id: inputId,
    isDisabled,
    isInvalid,
    onFocus,
    onBlur,
  });

  // The chakra UI global placeholder color
  // https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/styles.ts#L13
  //const placeholderColor = useColorModeValue('gray.400', 'whiteAlpha.400');

  // Ensure that the size used is one of the options, either `sm`, `md`, or `lg`
  let realSize: Size = size;
  const sizeOptions: Size[] = ['sm', 'md', 'lg'];
  if (!sizeOptions.includes(size)) {
    realSize = 'md';
  }

  // Ensure that the tag variant used is one of the options, either `subtle`,
  // `solid`, or `outline` (or undefined)
  let realTagVariant: TagVariant | undefined = tagVariant;
  const tagVariantOptions: TagVariant[] = ['subtle', 'solid', 'outline'];
  if (tagVariant !== undefined) {
    if (!tagVariantOptions.includes(tagVariant)) {
      realTagVariant = 'subtle';
    }
  }

  // Ensure that the tag variant used is one of the options, either `subtle`,
  // `solid`, or `outline` (or undefined)
  let realSelectedOptionStyle: SelectedOptionStyle = selectedOptionStyle;
  const selectedOptionStyleOptions: SelectedOptionStyle[] = ['color', 'check'];
  if (!selectedOptionStyleOptions.includes(selectedOptionStyle)) {
    realSelectedOptionStyle = 'color';
  }

  // Ensure that the color used for the selected options is a string
  let realSelectedOptionColor: string = selectedOptionColor;
  if (typeof selectedOptionColor !== 'string') {
    realSelectedOptionColor = 'blue';
  }

  return {
    // Allow overriding of custom components
    components: {
      ...chakraComponents,
      ...components,
    },
    // Custom select props
    colorScheme,
    size: realSize,
    tagVariant: realTagVariant,
    selectedOptionStyle: realSelectedOptionStyle,
    selectedOptionColor: realSelectedOptionColor,
    hasStickyGroupHeaders,
    chakraStyles,
    focusBorderColor,
    errorBorderColor,
    // Extract custom props from form control
    onFocus: inputProps.onFocus,
    onBlur: inputProps.onBlur,
    isDisabled: inputProps.disabled,
    isInvalid: !!inputProps['aria-invalid'],
    inputId: inputProps.id,
    ...props,
    // aria-invalid can be passed to react-select, so we allow that to
    // override the `isInvalid` prop
    'aria-invalid':
      props['aria-invalid'] ?? inputProps['aria-invalid'] ? true : undefined,
  } as Props<Option, IsMulti, Group>;
};

export default useChakraSelectProps;
