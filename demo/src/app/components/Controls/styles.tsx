import styled, { css } from 'styled-components';
import Colors from '../../styles/js/colors';
import * as Typography from '../../styles/js/typography';

const sharedInputStyles = css`
  ${Typography.TypeStyleArcturus}
  background-color: ${Colors.NEPTUNE};
  border: none;
  border-radius: 3px;
  color: ${Colors.SUN};
  line-height: 16px;
  outline: none;

  &::placeholder {
    color: ${Colors.CUPID};
  }
`;

export const Container = styled.div`
  padding: 20px;
`;

export const TextArea = styled.textarea`
  ${sharedInputStyles}
  margin-bottom: 10px;
  padding: 10px;
  resize: vertical;
  width: 100%;
`;

export const Input = styled.input`
  ${sharedInputStyles}
  display: block;
  margin-bottom: 10px;
  padding: 5px 10px;
  width: 100%;
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;
`;
