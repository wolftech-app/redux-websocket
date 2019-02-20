import * as React from 'react';
import { Option, Select } from './styles';

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: {
    name: string;
    value: string;
  }[];
  placeholder?: string;
}

const DropDown = ({onChange, options, placeholder}: Props) => (
  <Select onChange={onChange} placeholder={placeholder}>
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
