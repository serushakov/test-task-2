import styled from "styled-components";

const Root = styled.select`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
`;

type Option<ValueT> = {
  label: string;
  value: ValueT;
};

interface Props<ValueT> {
  disabled?: boolean;
  className?: string;
  id?: string;
  options: Array<Option<ValueT>>;
  value: ValueT | undefined;
  onChange: (value: ValueT) => void;
  placeholder?: string;
}

const Select = <T extends string = string>({
  disabled,
  value,
  onChange,
  options,
  placeholder,
}: Props<T>) => {
  return (
    <Root
      disabled={disabled}
      onChange={(event) => onChange(event.target.value as T)}
      value={value}
    >
      {placeholder && (
        <option disabled selected>
          {placeholder}
        </option>
      )}

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Root>
  );
};

export { Select };
