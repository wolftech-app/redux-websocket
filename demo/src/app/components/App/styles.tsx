import styled from 'styled-components';

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  max-width: 1920px;
`;

export const Title = styled.h1`
  border-bottom: 2px solid black;
  margin: 0;
  padding: 10px;
`;

export const PanelContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const Panel = styled.div`
  flex: 1;
  overflow: auto;
  padding: 10px;

  &:last-child {
    border-left: 2px solid black;
  }

  &:first-child {
    border-right: 2px solid black;
  }
`;
