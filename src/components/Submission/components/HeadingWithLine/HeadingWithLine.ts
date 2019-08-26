import { html } from 'lit-html';

const HeadingWithLine = (heading, supportText?: any, selectAllCheckBox ?: any) => html`
  <style>
    .heading {
      display: flex;
      font-size: 1.4rem;
      width: 100%;
      color: #000;
      margin: 1rem 0;
      padding-bottom: 0.4rem;
      border-bottom: 1px solid #ddd;
      justify-content: ${selectAllCheckBox!== null && "space-between"};
    }
    .warning {
      color: red;
      font-size: 1rem;
      padding-left: 3rem;
    }
    @media screen and (max-width: 650px) {
      .warning { padding-left: 0; display: block; }
    }
  </style>
  <body>
    <div class="heading">
      <div>
        ${heading}${supportText ? html`: <span style="font-size: 1.2rem">
          ${
            supportText == 'loose' ? html`
              ${supportText}&Tab; <span class="warning">likely to cause false positives</span>
            ` : supportText
          }
        </span>` : ''}
      </div>
      ${ selectAllCheckBox !== null ? selectAllCheckBox : '' }
    </div>
  </body>
`;

export default HeadingWithLine;