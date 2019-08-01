import { html } from 'lit-html';

const CheckBox = (text) => html`
  <style>
    .check{
      display: flex;
      align-items: center;
    }
  </style>
  <div class="check">
    <input type="checkbox" />
    <span>${text}</span>
  </div>
`;

export default CheckBox;