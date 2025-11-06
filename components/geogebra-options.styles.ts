import { css } from "lit";

export const geogebraOptionsStyles = css`
  div {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
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
  .hidden {
    display: none;
  }
  sl-details, 
  sl-input::part(form-control-label),
  sl-select::part(form-control-label),
  sl-switch::part(label) {
    font-size: 1rem;
  }
  sl-details::part(content) {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
`