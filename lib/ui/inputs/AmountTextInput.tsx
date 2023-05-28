import { Ref, forwardRef, ReactNode, useState } from "react";
import styled from "styled-components";
import { HStack } from "../Stack";
import { centerContentCSS } from "../utils/centerContentCSS";

import { TextInput, TextInputProps } from "./TextInput";

type AmountTextInputProps = Omit<TextInputProps, "value" | "onValueChange"> & {
  value: number | undefined;
  onValueChange?: (value: number | undefined) => void;
  unit: ReactNode;
  shouldBePositive?: boolean;
  shouldBeInteger?: boolean;
  suggestion?: ReactNode;
};

const UnitContainer = styled.div`
  border-radius: 8px;
  position: absolute;
  left: 12px;
  ${centerContentCSS};
`;

const Input = styled(TextInput)`
  padding-left: 36px;
`;

export const AmountTextInput = forwardRef(function AmountInputInner(
  {
    onValueChange,
    onChange,
    max,
    inputOverlay,
    unit,
    value,
    shouldBePositive,
    shouldBeInteger,
    suggestion,
    label,
    placeholder,
    type = "number",
    ...props
  }: AmountTextInputProps,
  ref: Ref<HTMLInputElement> | null
) {
  const valueAsString = value?.toString() ?? "";
  const [inputValue, setInputValue] = useState<string>(valueAsString);

  return (
    <Input
      {...props}
      type={type}
      label={
        <HStack
          alignItems="center"
          justifyContent="space-between"
          gap={16}
          fullWidth
        >
          {label}
          {suggestion}
        </HStack>
      }
      placeholder={placeholder ?? "Enter amount"}
      value={
        Number(valueAsString) === Number(inputValue)
          ? inputValue
          : valueAsString
      }
      ref={ref}
      inputOverlay={unit ? <UnitContainer>{unit}</UnitContainer> : undefined}
      onValueChange={(value) => {
        if (shouldBePositive) {
          value = value.replace(/-/g, "");
        }

        if (value === "") {
          setInputValue("");
          onValueChange?.(undefined);
          return;
        }

        const parse = shouldBeInteger ? parseInt : parseFloat;
        const valueAsNumber = parse(value);
        if (isNaN(valueAsNumber)) {
          return;
        }

        setInputValue(
          valueAsNumber.toString() !== value ? value : valueAsNumber.toString()
        );
        onValueChange?.(valueAsNumber);
      }}
    />
  );
});