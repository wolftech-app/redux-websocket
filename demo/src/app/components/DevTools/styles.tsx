import styled from 'styled-components';

export default styled.div`
  flex: 1;

  & > div {
    background-color: transparent;
  }

  [class|="actionList"] {
    background-color: transparent;
  }

  [class|="actionPreview"] {
    background-color: transparent;
  }

  [class|="actionPreviewContent"] {
    & > ul {
      // For some reason this style is defined inline... weird.
      background-color: transparent !important;
    }
  }
`;
