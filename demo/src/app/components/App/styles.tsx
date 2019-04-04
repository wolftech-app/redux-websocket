import styled from 'styled-components';
import { rgba } from 'polished';

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

export const Badge = styled.span`
  ${Typography.TypeFamilyMono}
  background-color: ${rgba('#000', 0.22)};
  border-radius: 10px;
  color: ${Colors.SUN};
  font-size: 11px;
  font-weight: 500;
  line-height: 20px;
  padding: 0 15px;
`;

export const LinkContainer = styled.div`
  align-items: center;
  display: flex;

  & > * {
    margin-right: 15px;
  }
`;

export const Header = styled.header`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: 30px 20px;
  width: 100%;

  ${media.desktop`
    padding: 20px;
  `}
`;

export const Link = styled.a`
  ${Typography.TypeStyleArcturus}
  color: ${Colors.SUN};
  line-height: 18px;
  text-decoration: none;

  &:vistited {
    color: ${Colors.SUN};
  }

  svg {
    margin-left: 5px;
  }

  path {
    fill: ${Colors.MARS};
  }
`;

export const Title = styled.h1`
  ${Typography.TypeStyleTriton}
  color: ${Colors.SUN};
  margin: 0 0 10px 0;
`;

export const PanelContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;

  ${media.desktop`
    flex-direction: column;
  `}
`;

export const PanelGroup = styled.div`
  display: flex;
  flex: 1;
  flex-basis: 33.333%;

  ${media.desktop`
    flex-basis: 60%;
  `}
`;

export const Panel = styled.div`
  flex: 1;
  overflow: auto;
  padding: 114px 0 0 0;

  ${media.desktop`
    padding: 0;
  `}
`;

export const PanelHeader = styled.p`
  ${Typography.TypeStyleSirius};
  align-items: center;
  color: ${Colors.SUN};
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ControlPanel = styled(Panel)`
  background-color: ${Colors.URANUS};
  display: flex;
  flex-direction: column;
  max-width: 500px;
  overflow: hidden;
  padding-top: 0;

  ${PanelHeader} {
    margin: 19px 0 11px;
  }
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
    flex-basis: 40%;
    max-width: 100%;
  `}
`;
