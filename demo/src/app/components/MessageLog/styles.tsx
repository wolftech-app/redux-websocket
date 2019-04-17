import styled from 'styled-components';
import { rgba } from 'polished';

import Colors from '../../styles/js/colors';
import * as Typography from '../../styles/js/typography';

interface MessageLogContainerProps {
  type: 'OUTGOING' | 'INCOMING';
}

export const MessageLogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  position: relative;
`;

export const MessageLogContainer = styled.div`
  height: 100%;
  overflow: auto;
  padding: 0;
  scroll-behavior: smooth;
`;

export const AutoScrollCheckBox = styled.input``;

export const AutoScrollLabel = styled.label`
  ${Typography.TypeStyleProcyon};
  background-color: ${Colors.NEPTUNE};
  color: ${Colors.VACUUM};
  flex: 0 0;
  font-size: 12px;
  padding: 10px 20px 30px;
  width: 100%;

  input {
    margin-right: 5px;
  }
`;

export const Message = styled.div``;

export const MetaContainer = styled.div<MessageLogContainerProps>`
  padding-bottom: 8px;
  padding-top: 8px;
  text-align: ${({ type }) => (type === 'OUTGOING' ? 'left' : 'right')};

  ${({ type }) => {
    if (type === 'OUTGOING') {
      return `
        padding-left: 18px;
        text-align: left;
        border-left: 2px solid #ffce94;
      `;
    }

    return `
      padding-right: 20px;
      text-align: right;
      border-right: 2px solid #f194ff;
    `;
  }}
`;

export const MetaData = styled.div`
  ${Typography.TypeStyleEridanus};
  color: ${Colors.VACUUM};
`;

export const MetaType = styled(MetaData)`
  color: ${Colors.DUST};
`;

export const MessageContainer = styled.div<MessageLogContainerProps>`
  display: flex;

  ${({ type }) => {
    if (type === 'OUTGOING') {
      return `
        border-left: 2px solid #ff8b00;
      `;
    }

    return `
      border-right: 2px solid #de00ff;
    `;
  }}
`;

export const MessageContents = styled.pre<MessageLogContainerProps>`
  // Because styled-components injects their tag first in the <head>, we need
  // this techique to override some of the prism styles.
  // See: https://www.styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  && {
    font-size: 12px;
    white-space: pre-wrap;
    word-wrap: break-word;
    padding: 10px 18px;
    margin: 0;
    background-color: ${rgba(Colors.SUN, 0.02)};
    width: 100%;
    display: flex;

    .token {
      text-shadow: none;
      font-weight: 700;

      &.string {
        color: ${Colors.PUCK};
      }

      &.punctuation {
        color: ${Colors.JUPITER};
      }

      &.number {
        color: ${Colors.COMET};
      }
    }
  }

  ${({ type }) => {
    if (type === 'INCOMING') {
      return `
        justify-content: flex-end !important;
      `;
    }

    return null;
  }}
`;
