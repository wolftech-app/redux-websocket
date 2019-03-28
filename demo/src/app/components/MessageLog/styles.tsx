import styled from 'styled-components';

import Colors from '../../styles/js/colors';
import * as Typography from '../../styles/js/typography';

interface MessageLogContainerProps {
  type: 'OUTGOING' | 'INCOMING';
}

export const MessageLogWrapper = styled.div`
  height: 100%;
  position: relative;
`;

export const MessageLogContainer = styled.div`
  height: 100%;
  overflow: auto;
  padding: 0;
`;

export const AutoScrollCheckBox = styled.input``;

export const AutoScrollLabel = styled.label`
  background-color: #fff;
  bottom: 10px;
  left: 10px;
  position: absolute;
`;

export const Message = styled.div`
  margin-bottom: 10px;
`;

export const MetaContainer = styled.div<MessageLogContainerProps>`
  color: #dddddd;
  font-size: 12px;
  text-align: ${({ type }) => (type === 'OUTGOING' ? 'left' : 'right')};
  ${({ type }) => (
    type === 'OUTGOING'
      ? 'border-left: 2px solid #ffce94;'
      : 'border-right: 2px solid #f194ff;'
  )}
`;

export const MetaData = styled.div`
  ${Typography.TypeStyleEridanus};
  color: ${Colors.VACUUM};
`;

export const MetaType = styled(MetaData)`
  color: ${Colors.DUST};
`;

export const MessageContainer = styled.div<MessageLogContainerProps>`
  border-right: ${props => (props.type === 'INCOMING' ? '5px solid red' : null)};
  border-left: ${props => (props.type === 'OUTGOING' ? '5px solid blue' : null)};
  display: flex;
  justify-content: ${props => (props.type === 'OUTGOING' ? 'flex-start' : 'flex-end')};
  ${({ type }) => (
    type === 'OUTGOING'
      ? 'border-left: 2px solid #ff8b00;'
      : 'border-right: 2px solid #de00ff;'
  )}
`;

export const MessageContents = styled.pre`
  font-size: 12px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;
