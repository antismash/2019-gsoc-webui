import { html } from 'lit-html';

const SmallText = (text) => html`
  <div style="margin-bottom: 2px">
    <b style="font-size: .7rem;">${text}</b>
  </div>
`;

export default SmallText;