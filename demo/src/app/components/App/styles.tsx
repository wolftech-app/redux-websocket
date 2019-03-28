import styled from 'styled-components';

import * as Typography from '../../styles/js/typography';
import Colors from '../../styles/js/colors';
import media from '../../styles/js/media';

export const AppWrapper = styled.div`
  background-color: ${Colors.SATURN};
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  max-width: 1920px;
`;

export const Header = styled.header`
  border-bottom: 2px solid black;
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
`;

export const Link = styled.a`
  color: blue;
  text-decoration: none;

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
  ${Typography.TypeStyleSirius};
  color: ${Colors.SUN};
  padding-left: 20px;
  padding-right: 20px;
`;

export const ControlPanel = styled(Panel)`
  background-color: ${Colors.URANUS};
  padding-top: 0;
`;

export const MessageLogPanel = styled(Panel)`
  background-color: ${Colors.NEPTUNE};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  ${PanelHeader} {
    flex: 0 0;
  }
`;

export const DevToolsPanel = styled(Panel)`
  background-color: ${Colors.PLUTO};
  border-left: 2px solid ${Colors.NEBULA};
  display: flex;
  flex-direction: column;
  max-width: 500px;

  ${media.desktop`
    max-width: 100%;
  `}
`;
