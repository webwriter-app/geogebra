import { css } from "lit";

export const geogebraAppStyles = css`
  iframe {
    display: block;
    border: none;
    width: 100%;
    aspect-ratio: 16/9;
  }
  input {
    display: none;
  }
  sl-button {
    width: 100%;
  }
  sl-button::part(label) {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  sl-switch {
    margin-left: 2px;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
  .hidden {
    display: none;
  }
`