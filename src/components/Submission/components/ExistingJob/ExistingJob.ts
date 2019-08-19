import { html } from 'lit-html';
import LitRender from '../../../LitRender';
import axios from 'axios';

import colors from '../../../../utils/theme';

class ExistingJob extends LitRender(HTMLElement) {
  jobId: String = null;

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
          min-height: calc(2rem + 4px);
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
          @input="${e => {this.jobId = e.target.value;}}"
          class="commonTemplate" id="jobId"
          title="Enter Job ID"
          name="jobId"
          placeholder=${placeholder}
          onfocus="this.placeholder = ''"
          onblur="this.placeholder='taxon-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'"
        />
        <button
          class="btn"
          type="submit"
          @click="${this.handleInput}"
        >
          Submit
        </button>
      </div>
    `;
  }

  handleInput = (e) => {
    e.preventDefault();
    console.log(this.jobId);
    if (this.jobId.substr(0, 8).toLowerCase() == 'bacteria') {
      window.location.href = "http://antismash.secondarymetabolites.org/#!/show/job/" + this.jobId;
    }
    else if (this.jobId.substr(0, 5).toLowerCase() == 'fungi') {
        window.location.href = "http://fungismash.secondarymetabolites.org/#!/show/job/" + this.jobId;
    }
    else if (this.jobId.substr(0, 6).toLowerCase() == 'plants') {
        window.location.href = "http://plantismash.secondarymetabolites.org/#!/show/job/" + this.jobId;
    }
  }
}

customElements.define('existing-job', ExistingJob);

export default ExistingJob;