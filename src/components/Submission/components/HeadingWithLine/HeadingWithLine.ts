import { html } from 'lit-html';

const HeadingWithLine = (heading, supportText?: any) => html`
  <style>
    .heading {
      font-size: 1.4rem;
      width: 100%;
      color: #000;
      margin: 1rem 0;
      padding-bottom: 0.4rem;
      border-bottom: 1px solid #ddd;
    }
    .warning {
      color: red;
      font-size: 1.2rem;
      padding-left: 3rem;
    }
    @media screen and (max-width: 650px) {
      .warning { padding-left: 0; display: block; }
    }
  </style>
  <body>
    <div class="heading">
      ${heading}${supportText ? html`: <span
        style="">
        <i>${
          supportText == 'loose' ? html`
            <i>${supportText}&Tab; <span class="warning">likely to cause false positives</span></i>
          ` : supportText
        }</i>
      </span>` : ''}
    </div>
  </body>
`;

export default HeadingWithLine;