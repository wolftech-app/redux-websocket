import styled from 'styled-components';

import media from '../../styles/js/media';
import { sansSerif } from '../../styles/js/typography';

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  max-width: 1920px;
  background-color: #212f3f;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 2px solid black;
  padding: 10px;
`;

export const Link = styled.a`
  text-decoration: none;
  color: blue;

  &:vistited {
    color: blue;
  }
`;

export const Title = styled.h1`
  margin: 0 0 5px 0;
`;

export const PanelContainer = styled.div`
  display: flex;
  flex: 1;

  ${media.desktop`
    flex-direction: column;
  `}
`;

export const PanelGroup = styled.div`
  border-right: 2px solid black;
  display: flex;
  flex: 1;
  flex-basis: 33.333%;

  ${media.desktop`
    border-bottom: 2px solid black;
    border-right: none;
  `}
`;

export const Panel = styled.div`
  flex: 1;
  overflow: auto;
  padding: 10px;

  &:not(:last-child) {
    border-right: 2px solid black;
  }
`;

export const PanelHeader = styled.p`
  font-family: ${sansSerif};
  color: #fff;
  font-size: 20px;
`;

export const ControlPanel = styled(Panel)`
  background-color: #354353;
`;

export const MessageLogPanel = styled(Panel)`
  background-color: #1d252f;
`;

export const DevToolsPanel = styled(Panel)`
  background-color: #171e26;
  max-width: 500px;
  display: flex;
  flex-direction: column;

  ${media.desktop`
    max-width: 100%;
  `}
`;
