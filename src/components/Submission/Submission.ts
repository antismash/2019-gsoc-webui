import { html } from 'lit-html';

import Litrender from '../LitRender';
import store from '../../Store';
import colors from '../../utils/theme';
import HeadingWithLine from './components/HeadingWithLine';

class Submission extends Litrender(HTMLElement) {
  loading: boolean = false;
  email: String = '';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // const { ServerNews } = store.getState();
    // this.setNews(ServerNews);

    store.subscribe(() => {
    //   const { ServerNews } = store.getState();
    //   this.setNews(ServerNews);
    //   this.invalidate(this.renderTemplate);
    });

    this.invalidate(this.renderTemplate);
  }

  setEmail = (email) => {
    this.email = email;
    this.invalidate(this.renderTemplate);
  }

  loadSampleInput = (e) => {
    e.preventDefault();
  }

  openExampleOuput = (e) => {
    e.preventDefault();
    window.location.href = "https://antismash.secondarymetabolites.org/upload/example/index.html";
  }

  onInputvalueChange = (e) => {
    this.setEmail(e.srcElement.value);
    console.log(e.srcElement.value);    
  }

  selectFiles = (e) => {
    e.preventDefault();
    var hiddenSelector = this.shadowRoot.getElementById('hiddenSelector');
    hiddenSelector.click();
  }

  handleHiddenSelector = (e) => {
    console.log(e);
  }

  renderTemplate = () => {
    return html`
      <style>
        .container { padding: 1rem; }
        .section1 { display: flex; align-items: center; }
        .btnContainer { margin-left: 5rem; }
        .btn {
          min-height: 2rem;
          background: white;
          border: none;
          border-radius: 1rem;
          border: 2px solid ${colors.darkGray};
          color: ${colors.darkGray};
          padding: 0 1rem;
          margin: 2px 1rem;
          font-weight: bold;
          cursor: pointer;
          text-transform: uppercase;
        }
        .commonTemplate {
          height: 2rem;
          background: white;
          border: none;
          border-radius: 1rem;
          border: 2px solid ${colors.darkGray};
          color: ${colors.darkGray};
          padding: 0 1rem;
          margin: 2px 1rem;
          font-weight: bold;
          outline: none;
        }
        .btn:hover { background: ${colors.darkGray}; color: white; transition: all 0.4s; }
        .fileSelector {
          display: flex;
          justify-content: flex-end;
          width: 300px;
          border: 2px solid ${colors.darkGray};
          border-radius: 1.1rem;
        }
        #hiddenSelector { display: none; }
        .browseFileText {
          display: flex;
          padding: 0 1rem;
          margin-right: -1px;
          color: white;
          background-color: ${colors.darkGray};
          align-items: center;
          border-radius: inherit;
        }
        #fileName {
          height: 100%;
          display: flex;
          align-items: center;
          padding-right: 5px;
        }

        @media screen and (max-width: 1056px) {
          .section1 { flex-direction: column; text-align: center; }
          .btnContainer { margin: 1rem 0; }
        }
      </style>
      <div class="container">
        <form id="submission-form" novalidate>

          <div class="section1">
            <div>Search a genome sequence for secondary metabolite biosynthetic gene clusters</div>
            <div class="btnContainer">
              <button class="btn" @click="${this.loadSampleInput}">Load Sample Input</button>
              <button class="btn" @click="${this.openExampleOuput}">Open Example Output</button>
            </div>
          </div>

          ${HeadingWithLine('Notification settings')}
          <input
            @input="${this.onInputvalueChange}"
            class="commonTemplate" id="email"
            name="email" type="email"
            placeholder="abc@email.com"
          />

          ${HeadingWithLine('Data Input')}
          <div style="display: flex;">
            <select @input="${this.onInputvalueChange}" class="commonTemplate">
              <option value="upload">Upload File</option>
              <option value="get">Get from NCBI</option>
            </select>
            <div @click="${this.selectFiles}" class="fileSelector">
              <span id="fileName">fasfsa.fasta</span>
              <span class="browseFileText">Browse File</span>
            </div>
          </div>
          <input @click="${this.handleHiddenSelector}" type="file" id="hiddenSelector" />

          ${HeadingWithLine("Detection strictness")}

          ${HeadingWithLine("Extra features")}

          <button class="btn" type="submit" @click="${this.handleInput}">Submit</button>
        </form>
      </div>
    `;
  }

  handleInput = (e: any) => {
    e.preventDefault();
    console.log(e);
  }
}

customElements.define('common-submission', Submission);

export default Submission;