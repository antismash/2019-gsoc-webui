import { html } from 'lit-html';
import LitRender from '../../../LitRender';

import colors from '../../../../utils/theme';

class ExistingJob extends LitRender(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.invalidate(this.renderTemplate);
  }

  renderTemplate = () => {
    const placeholder = 'taxon-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
    return html`
      <style>
        .commonTemplate {
          height: 2rem;
          background: white;
          border: none;
          border-radius: 5px;
          border: 2px solid ${colors.darkGray};
          color: ${colors.darkGray};
          padding: 0 0.7rem;
          font-weight: bold;
          outline: none;
          min-width: 350px;
        }
        .btn {
          min-height: 2rem;
          background: white;
          border: none;
          border-radius: 5px;
          border: 2px solid ${colors.darkGray};
          color: ${colors.darkGray};
          padding: 0 1rem;
          margin: 1rem 1rem 2px 0;
          font-weight: bold;
          cursor: pointer;
          text-transform: uppercase;
        }
        @media screen and (max-width: 720px) {
          .btn { width: 100%; }
          .commonTemplate { width: calc(100% - 1.4rem); }
        }
        .btn:hover { background: ${colors.darkGray}; color: white; transition: all 0.4s; }
        ::placeholder { opacity: 0.6; }
      </style>
      <div>
        <h3>antiSMASH job id for existing job</h3>
        <input
          class="commonTemplate" id="jobId"
          title="Enter Job ID"
          name="jobId"
          placeholder=${placeholder}
          onfocus="this.placeholder = ''"
          onblur="this.placeholder='taxon-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'"
        />
        <br />
        <button
          class="btn"
          type="submit"
          style="margin-left: 0;"
          @click="${this.handleInput}"
        >
          Submit
        </button>
      </div>
    `;
  }

  handleInput = (e) => {
    e.preventDefault();
  }
}

customElements.define('existing-job', ExistingJob);

export default ExistingJob;