import styled from 'styled-components';
import { lighten, rgba } from 'polished';

import * as Typography from '../../styles/js/typography';
import Colors from '../../styles/js/colors';
import media from '../../styles/js/media';

export default styled.div`
  flex: 1;

  ${media.desktop`
    display: flex;
  `}

  & > div {
    background-color: transparent;
  }

  [class|="actionList"] {
    background-color: transparent;
    border: 0;
    margin: 0;
    flex: 1 1 0;
  }

  [class|="actionListHeader"] {
    border: 0;
    background-color: ${Colors.MOON};
    margin-bottom: 10px;
  }

  [class|="actionListHeaderSearch"] {
    background-color: transparent;
    color: ${Colors.SUN};
    padding-left: 20px;
    padding-right: 20px;
  }

  [class|="actionListHeaderSelector"] {
    display: none;
  }

  [class|="actionListItem"] {
    ${Typography.TypeStyleProcyon};
    border: 0;
    color: ${Colors.MERCURY};
    padding-left: 20px;
    padding-right: 20px;
  }

  [class|="actionListItemButtons"] {
    & > div {
      transition: none;
      transform: none !important;

      & > div {
        ${Typography.TypeStyleDeneb};
        background-color: transparent;
        color: ${Colors.MERCURY};
      }

      &:nth-child(2) {
        display: none;
      }
    }
  }

  [class|="actionPreview"] {
    background-color: transparent;
    flex: 1 1 0;
  }

  [class|="actionPreviewContent"] {
    & > ul {
      // For some reason this style is defined inline... weird.
      background-color: transparent !important;
    }
  }

  [class|="previewHeader"] {
    align-items: center;
    background-color: ${rgba(Colors.SUN, 0.05)};
    border: 0;
    display: flex;
    flex-basis: auto;
    justify-content: space-between;
    padding: 6px 20px;
  }

  [class|="inspectedPath"] {
    ${Typography.TypeStyleCanopus};
    order: 0;
    padding: 0;
  }

  [class|="tabSelector"] {
    order: 1;
  }

  [class|="selectorButton"] {
    ${Typography.TypeStyleArcturus};
    background-color: ${Colors.VENUS};
    border: 0;
    color: ${Colors.EARTH};
    margin-left: 1px;
    text-transform: uppercase;
    transition-property: background-color, color;
    transition: 0.1s ease-in-out;

    &:hover {
      background-color: ${lighten(0.02, Colors.VENUS)};
    }

    &:first-child {
      margin-left: 0;
    }
  }

  [class*="selectorButtonSelected"] {
    color: ${Colors.SUN};
    background-color: ${Colors.MARS};

    &:hover {
      background-color: ${lighten(0.02, Colors.MARS)};
    }
  }

  // Lots of the styles for DOM elements inside this selector are inline.
  // No idea why somebody would do something like that... lazyness?
  // Why is it different than the rest of the DOM nodes?
  [class|="actionPreviewContent"] {
    label {
      color: ${Colors.ASTEROID_BELT} !important;

      & + span {
        color: ${Colors.OORT_CLOUD} !important;
      }
    }

    & > ul > li > ul > li {
      padding: 1px 20px !important;
      position: relative;

      & > div {
        left: 7px;
        position: absolute;
        top: 9px;
        transform: translateY(-3px);

        div {
          color: ${Colors.ASTEROID_BELT} !important;
        }
      }

      & > ul div div {
        color: ${Colors.ASTEROID_BELT} !important;
      }
    }
  }

  [class|="treeItemPin"] {
    color: ${Colors.JUPITER};
  }

  [class*="diffUpdateFrom"] {
    color: ${Colors.SUN};
    background-color: ${Colors.COMET};
  }

  [class*="diffUpdateTo"] {
    color: ${Colors.SUN};
    background-color: ${Colors.OORT_CLOUD};
  }
`;
