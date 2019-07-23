import { html } from 'lit-html';

import Litrender from '../LitRender';
import store from '../../Store';
import colors from '../../utils/theme';
import HeadingWithLine from './components/HeadingWithLine';
import SmallText from './components/SmallText';

class Submission extends Litrender(HTMLElement) {
  loading: boolean = false;
  inputType: String = 'upload';
  formData = {
    email: '',
    inputType: 'upload',
    ncbiAccountNo: '',
    selectedfFileName: null,
    strictness: 'relaxed',
    isValidEmail: null,
  };

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

  // setFormData = (field: string, val:any) => {
  //   this.formData = { ...this.formData, [field]: val };
  //   this.invalidate(this.renderTemplate);
  // }

  setFormData = (pairs: object) => {
    this.formData = { ...this.formData, ...pairs };
    //  console.log(this.formData);
    this.invalidate(this.renderTemplate);
  }

  renderTemplate = () => {
    console.log(this.formData);
    return html`
      <style>
        .container { padding: 1rem; }
        .section1 { display: flex; align-items: center; }
        .btnContainer { margin-left: 5rem; }
        .btn {
          min-height: 2rem;
          background: white;
          border: none;
          border-radius: 5px;
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
          border-radius: 5px;
          border: 2px solid ${colors.darkGray};
          color: ${colors.darkGray};
          padding: 0 1rem;
          font-weight: bold;
          outline: none;
        }
        .btn:hover { background: ${colors.darkGray}; color: white; transition: all 0.4s; }
        .dataInputContainer { display: flex; }
        .fileSelector {
          display: flex;
          justify-content: flex-end;
          width: 300px;
          height: 2rem;
          border: 2px solid ${colors.darkGray};
          border-radius: 5px;
        }
        .browseFileText {
          display: flex;
          padding: 0 1rem;
          margin: 0 -1px 0 2px;
          color: white;
          background-color: ${colors.darkGray};
          align-items: center;
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
        @media screen and (max-width: 900px) {
          .dataInputContainer {
            display: grid;
            grid-row-gap: 1rem;
          }
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
          <div>
            ${SmallText('Email address(optional)')}
            <input
              @input="${this.handleEmailChange}"
              class="commonTemplate" id="email"
              name="email" type="email"
              placeholder="abc@email.com"
              style="border-color: ${ this.displayErrorMessage() ? '#810e15' : 'inherit' };"
            />
            <div style="display: ${ this.displayErrorMessage() ? 'block' : 'none' }; color: #810e15;">
              <b style="font-size: .7rem;">Invalid email address.</b>
            </div>
          </div>

          ${HeadingWithLine('Data Input')}
          <div class="dataInputContainer">
            <select
              style="margin-right: .5rem"
              value=${this.formData.inputType}
              @input="${this.onUploadChoiceChange}"
              class="commonTemplate"
            >
              <option>Select ------</option>
              <option value="upload">Upload File</option>
              <option value="get_from_ncbi">Get from NCBI</option>
            </select>
            <input type="file" accept=".fa, .fna, .fasta" style="display: none;" id="hiddenSelector" @input="${this.handleFileSelection}" />
            <div>
              ${
                this.formData.inputType !== 'get_from_ncbi' ?
                  html`
                    <div @click="${this.selectFiles}" class="fileSelector">
                      <span id="fileName">${this.formData.selectedfFileName || 'No file chosen'}</span>
                      <span class="browseFileText">Browse File</span>
                    </div>
                    ${SmallText('Sequence file (GenBank / EMBL / FASTA format)')}
                  `
                  : html`
                    <input
                      @input="${(e) => { this.setFormData({ ncbiAccountNo: e.srcElement.value }) }}"
                      value=${this.formData.ncbiAccountNo}
                      class="commonTemplate"
                      placeholder="NCBI acc #"
                    />
                    ${SmallText('NCBI accession number of desired sequence')}
                  `
              }
            </div>
          </div>

          ${HeadingWithLine("Detection strictness", this.formData.strictness)}
          <div>
            <input
              @input="${this.handleRangeInput}"
              type="range"
              class="strictnessRange"
              min="0" max="2"
            />
            ${this.renderWarning(this.formData.strictness)}
          </div>

          ${HeadingWithLine("Extra features")}

          <button class="btn" type="submit" @click="${this.handleInput}">Submit</button>
        </form>
      </div>
    `;
  }

  renderWarning = (strictness) => {
    const reasons = [
      'Detects well-defined clusters containing all required parts.',
      'Detects partial clusters missing one or more functional parts.',
      'Detects poorly-defined clusters and clusters that likely match primary metabolites.'
    ];

    if(strictness == 'strict') {
      reasons.splice(1,2);
    } else if(strictness == 'relaxed') {
      reasons.splice(1,1);
    }

    return html`
      <ul>
        ${
          reasons.map(x => html`<li>${x}</li>`)
        }
      </ul>
    `;
  }

  loadSampleInput = (e) => {
    e.preventDefault();
    this.setFormData({ ncbiAccountNo: '#ABCDEF', inputType: 'get_from_ncbi' });
  }

  openExampleOuput = (e) => {
    e.preventDefault();
    window.location.href = "https://antismash.secondarymetabolites.org/upload/example/index.html";
  }

  handleEmailChange = async (e) => {
    const validationStr = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    const val = e.target.value;
    if(validationStr.test(val)) {
      console.log('valid');
      this.setFormData({ isValidEmail: true, email: val });
    } else { this.setFormData({isValidEmail: false, email: val}); }
  }

  displayErrorMessage = () => {
    const { email, isValidEmail } = this.formData;
    if(email !== "" && !isValidEmail) {
      return true;
    }
    return false;
  }

  onUploadChoiceChange = (e) => { this.setFormData({ inputType: e.target.value }); }

  selectFiles = (e) => {
    e.preventDefault();
    var hiddenSelector = this.shadowRoot.getElementById('hiddenSelector');
    hiddenSelector.click();
  }
  
  handleFileSelection = (e) => {
    const { target: { value } } = e;
    const fileName = value.split("\\").slice(-1)[0];
    console.log(fileName);
    this.setFormData({ selectedfFileName: fileName });
  }

  handleRangeInput = (e: any) => {
    const { value } = e.target;
    if(value == 0) {
      this.setFormData({ strictness: 'strict' });
    } else if(value == 2) {
      this.setFormData({ strictness: 'loose' });
    } else {
      this.setFormData({ strictness: 'relaxed' });
    }
  }

  handleInput = (e: any) => {
    e.preventDefault();
    console.log(e);
  }
}

customElements.define('common-submission', Submission);

export default Submission;