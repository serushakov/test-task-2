import styled from "styled-components";

const Root = styled.select`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
`;

type Option = {
  label: string;
  value: string;
};

interface Props {
  disabled?: boolean;
  className?: string;
  id?: string;
  options: Array<Option>;
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Select = ({ disabled, value, onChange, options, placeholder }: Props) => {
  return (
    <Root
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
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
