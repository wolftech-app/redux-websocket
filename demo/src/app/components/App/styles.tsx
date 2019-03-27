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
  display: flex;
  flex: 1;
  flex-basis: 33.333%;
`;

export const Panel = styled.div`
  flex: 1;
  overflow: auto;
  padding: 114px 0 0 0;
`;

export const PanelHeader = styled.p`
  font-family: ${sansSerif};
  color: #fff;
  font-size: 20px;
  padding-left: 15px;
  padding-right: 15px;
`;

export const ControlPanel = styled(Panel)`
  background-color: #354353;
  padding-top: 0;
`;

export const MessageLogPanel = styled(Panel)`
  background-color: #1d252f;
`;

export const DevToolsPanel = styled(Panel)`
  background-color: #171e26;
  border-left: 2px solid #212f3f;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  // padding: 0;
  // padding-top: 114px;

  ${media.desktop`
    max-width: 100%;
  `}
`;
