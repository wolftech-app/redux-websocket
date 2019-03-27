import styled from 'styled-components';
import { lighten, rgba } from 'polished';

import { mono, sansSerif } from '../../styles/js/typography';

export default styled.div`
  flex: 1;

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
    background-color: #14191f;
    margin-bottom: 10px;
  }

  [class|="actionListHeaderSearch"] {
    background-color: transparent;
    color: #fff;
    padding-left: 20px;
    padding-right: 20px;
  }

  [class|="actionListHeaderSelector"] {
    display: none;
  }

  [class|="actionListItem"] {
    border: 0;
    color: #b0b0b0;
    font-family: ${mono};
    font-size: 14px;
    padding-left: 20px;
    padding-right: 20px;
  }

  [class|="actionListItemButtons"] {
    & > div {
      transition: none;
      transform: none !important;

      & > div {
        background-color: transparent;
        font-size: 10px;
        font-family: ${mono};
        color: #b0b0b0;
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
    background-color: ${rgba('#fff', 0.05)};
    border: 0;
    display: flex;
    flex-basis: auto;
    justify-content: space-between;
    padding: 6px 20px;
  }

  [class|="inspectedPath"] {
    font-family: ${sansSerif};
    font-size: 15px;
    order: 0;
    padding: 0;
  }

  [class|="tabSelector"] {
    order: 1;
  }

  [class|="selectorButton"] {
    background-color: #384656;
    border: 0;
    color: #212b37;
    font-family: ${sansSerif};
    font-size: 12px;
    font-weight: 500;
    margin-left: 1px;
    text-transform: uppercase;
    transition-property: background-color, color;
    transition: 0.1s ease-in-out;

    &:hover {
      background-color: ${lighten(0.02, '#384656')};
    }

    &:first-child {
      margin-left: 0;
    }
  }

  [class*="selectorButtonSelected"] {
    color: #fff;
    background-color: #455d7a;

    &:hover {
      background-color: ${lighten(0.02, '#455d7a')};
    }
  }

  // Lots of the styles for DOM elements inside this selector.
  // No idea why somebody would do something like that... lazyness?
  [class|="actionPreviewContent"] {
    label {
      color: #4a90e2 !important;

      & + span {
        color: #7ea356 !important;
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
          color: #4a90e2 !important;
        }
      }

      & > ul div div {
        color: #4a90e2 !important;
      }
    }
  }

  [class|="treeItemPin"] {
    color: #727272;
  }
`;
