import { css } from "lit";

export const geogebraAppStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    min-width: 300px;
    max-width: 2100px;
    min-height: 18rem;
    color: var(--ww-text-color, inherit);
    font-family: var(--ww-font-family, inherit);
  }

  iframe {
    display: block;
    border: none;
    width: 100%;
    aspect-ratio: 16/9;
    min-height: 18rem;
  }

  iframe:focus-visible {
    outline: 2px solid var(--ww-link-color, currentColor);
    outline-offset: -2px;
  }

  .print-note {
    display: none;
  }

  @media print {
    :host {
      max-width: 100%;
      break-inside: avoid;
    }

    .applet:not([data-ready]) iframe {
      display: none;
    }

    .applet:not([data-ready]) .print-note {
      display: block;
      padding: 0.75rem;
      border: 1px solid currentColor;
    }
  }
`
