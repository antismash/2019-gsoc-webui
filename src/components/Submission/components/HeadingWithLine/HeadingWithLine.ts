import { html } from 'lit-html';

const HeadingWithLine = (heading) => html`
    <style>
        .heading {
            font-size: 1.4rem;
            width: 100%;
            color: #000;
            margin: 1rem 0;
            padding-bottom: 0.4rem;
            border-bottom: 1px solid #ddd;
        }
    </style>
    <body>
        <div class="heading">
            ${heading}
        </div>
    </body>
`;

export default HeadingWithLine;