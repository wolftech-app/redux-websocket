import * as React from 'react';
import { Option, Select } from './styles';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement>{
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: {
    name: string;
    value: string;
  }[];
  placeholder?: string;
}

const DropDown = ({
  onChange,
  options,
  placeholder,
  ...restProps
}: Props) => (
  <Select
    onChange={onChange}
    placeholder={placeholder}
    {...restProps}
  >
    {
      options.map(option => (
        <Option value={option.value} key={JSON.stringify(option)}>
          {option.name}
        </Option>
      ))
    }
  </Select>
);

export default DropDown;
