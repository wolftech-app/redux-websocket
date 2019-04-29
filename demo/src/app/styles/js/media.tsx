import { css, ThemedCssFunction } from 'styled-components';

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576,
};

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (literals: TemplateStringsArray, ...args: any[]) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(literals, ...args)}
    }
  `;

  return acc;
}, {} as { [key in keyof typeof sizes]: ThemedCssFunction<any> });

export default media;
