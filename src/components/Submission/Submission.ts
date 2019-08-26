import { html } from 'lit-html';
import axios from 'axios';

import Litrender from '../LitRender';
import colors from '../../utils/theme';
import HeadingWithLine from './components/HeadingWithLine';
import SmallText from './components/SmallText';

class Submission extends Litrender(HTMLElement) {
  loading: boolean = false;
  inputPage: number = 1;
  inputType: String = 'upload';
  formData = {
    email: '',
    inputType: 'upload',
    ncbi: '',
    selectedFile1Name: null,
    selectedFile2Name: null,
    strictness: 'relaxed',
    isValidEmail: null,
    selectedFeatures: [true, false, true, true, false, false],
  };

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.invalidate(this.renderTemplate);
  }

  setFormData = (pairs: object) => {
    this.formData = { ...this.formData, ...pairs };
    this.invalidate(this.renderTemplate);
  }

  renderTemplate = () => {
    // console.log(this.formData);
    const checkBoxText = ['KnownClusterBlast', 'ClusterBlast', 'SubClusterBlast', 'ActiveSiteFinder', 'Cluster Pfam analysis','Pfam-based GO term annotation'];
    return html`
      <style>
        .container { padding: 1rem; }
        ::placeholder { opacity: 0.6; }
        .navigation {
          display: flex;
          justify-content: "flex-end";
          padding: 0;
          height: 3rem;
          width: 100%;
          background-color: ${colors.gray};
          color: #000;
          font-size: 1rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
        li { list-style: none; }
        .navTab {
          display: flex;
          align-items: center;
          padding: 0 2rem;
          height: 100%;
          cursor: pointer;
          border-right: 1px solid #fff;
        }
        .navTab:hover {
          background: ${colors.darkGray}; color: #fff;
        }
        .navActive { background: ${colors.darkGray}; color: #fff; }
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
          margin: 2px 1rem 2px 0;
          font-weight: bold;
          cursor: pointer;
          text-transform: uppercase;
          transition: all 0.35s;
        }
        .btn, .navigation, .check {
          user-select: none;
          -moz-user-select: none;
        }
        .btn:hover { background: ${colors.darkGray}; color: white; transition: all 0.35s; }
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
        .dataInputContainer { display: flex; }
        .fileSelector {
          display: flex;
          justify-content: flex-end;
          cursor: pointer;
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
        .clearFile2Name {
          display: ${this.formData.selectedFile2Name ? 'flex' : 'none'};
          align-items: center;
          color: red;
          font-size: 20px;
          cursor: pointer;
          padding-left: .5rem;
        }
        .sliderContainer {
          display: flex;
          align-items: flex-start;
        }
        .slideLabel {
          display: flex;
          width: 250px;
          justify-content: space-between;
        }
        .check {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-weight: bold;
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
        @media screen and (min-width: 700px) {
          .checkboxContainer {
            width: 100%;
            display: grid;
            grid-template-columns: auto auto auto;
            justify-content: space-between;
            grid-row-gap: 0.7rem;
          }
        }
      </style>
      <div class="container">
        <server-news></server-news>
        <ul class="navigation">
          <li
            class="navTab ${this.inputPage === 1 ? 'navActive' : ''}"
            id="inputPage1"
            @click="${e => { this.inputPage = 1; this.invalidate(this.renderTemplate) }}"
          >
            Nucleotide input
          </li>
          <li
            class="navTab ${this.inputPage === 2 ? 'navActive' : ''}"
            id="inputPage2"
            @click="${e => { this.inputPage = 2; this.invalidate(this.renderTemplate) }}"
          >
            Results for existing job
          </li>
        </ul>

        <!-- Nucleotide input component -->
        <form
          id="submission-form"
          style="display: ${this.inputPage === 1 ? 'block' : 'none'}"
          novalidate
        >

          <div class="section1">
            <div>Search a genome sequence for secondary metabolite biosynthetic gene clusters</div>
            <div class="btnContainer">
              <button class="btn" title="load sample input" @click="${this.loadSampleInput}">Load Sample Input</button>
              <button class="btn" title="download example output" @click="${this.openExampleOuput}">Open Example Output</button>
            </div>
          </div>

          ${HeadingWithLine('Notification settings')}
          <div>
            ${SmallText('Email address (optional)')}
            <input
              @input="${this.handleEmailChange}"
              class="commonTemplate" id="email"
              title="Enter email ID, you want to be notified at"
              name="email" type="email"
              placeholder="abc@email.com"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'abc@email.com'"
              style="
                border-color: ${ this.displayErrorMessage() ? '#810e15' : 'inherit' };
                padding-left: .5rem;
              "
            />
            <div style="display: ${ this.displayErrorMessage() ? 'block' : 'none' }; color: #810e15;">
              <b style="font-size: .7rem;">Invalid email address.</b>
            </div>
          </div>

          ${HeadingWithLine('Data Input')}
          <div class="dataInputContainer">
            <select
              style="margin-right: .5rem"
              title="select the input type"
              value=${this.formData.inputType}
              @input="${this.onUploadChoiceChange}"
              class="commonTemplate"
            >
              <option>Select ------</option>
              <option value="upload">Upload File</option>
              <option value="get_from_ncbi">Get from NCBI</option>
            </select>
            <input
              type="file"
              accept=".fa, .fna, .fasta, .gb, .gbk, .emb, .embl"
              style="display: none;" id="hiddenFile1Selector"
              @input="${e => this.handleFileSelection(e, 1)}"
            />
            <input
              type="file"
              accept=".gff,.gff3"
              style="display: none;" id="hiddenFile2Selector"
              @input="${e => this.handleFileSelection(e, 2)}"
            />
            <div>
              ${
                this.formData.inputType !== 'get_from_ncbi' ?
                  html`
                    <div @click="${this.selectFile1}" title="Browse sequence file" class="fileSelector">
                      <span id="fileName">${this.formData.selectedFile1Name || 'No file chosen'}</span>
                      <span class="browseFileText">Browse File</span>
                    </div>
                    ${SmallText('Sequence file (GenBank / EMBL / FASTA format)')}

                    ${this.formData.selectedFile1Name ? html`
                      <span style="display: flex; padding-top: 1rem;" title="Browse feature annotation file">
                        <div @click="${this.selectFile2}" class="fileSelector">
                          <span id="fileName">
                            ${this.formData.selectedFile2Name || 'No file chosen'}
                          </span>
                          <span class="browseFileText">Browse File</span>
                        </div>
                        <span class="clearFile2Name" title="clear optional file" @click="${ e => this.setFormData({ selectedFile2Name: null }) }">
                          &#10005;
                        </span>
                      </span>
                    ${SmallText('Feature annotations (optional, GFF3 format)')}
                    ` : ''}
                  `
                  : html`
                    <input
                      @input="${(e) => { this.setFormData({ ncbi: e.srcElement.value }) }}"
                      value=${this.formData.ncbi}
                      class="commonTemplate"
                      placeholder="NCBI acc #"
                    />
                    ${SmallText('NCBI accession number of desired sequence')}
                  `
              }
            </div>
          </div>

          ${HeadingWithLine("Detection strictness", this.formData.strictness)}
          <div class="sliderContainer">
            <div>
              <div class="slideLabel">
                <div>strict</div>
                <div>relaxed</div>
                <div>loose</div>
              </div>
              <input
                @input="${this.handleRangeInput}"
                type="range"
                title="slide to select strictness"
                style="width: 250px"
                min="0" max="2"
              />
            </div>
            <div>
              ${this.renderWarning(this.formData.strictness)}
            </div>
          </div>

          ${HeadingWithLine(
            "Extra features",
            null,
            html`
              <div class="check">
                <input type="checkbox" id='selectAllFeatures' @click="${this.selectAllFeatures}" /> &nbsp;
                <label style="font-size: 0.85rem; cursor: pointer;" for='selectAllFeatures'>Select All</label>
              </div>
            `
          )}
          <div class="checkboxContainer" style="margin-bottom: 1.2rem;">
            ${
              checkBoxText.map((checkBoxLabel, i) => html`
                  <div class="check">
                  ${
                    this.formData.selectedFeatures[i] ? html`
                      <input
                        @click="${e => this.handleCheck(e.target.checked, i)}"
                        type="checkbox"
                        id=${'check-box' + i}
                        checked
                      />
                    `: html`
                      <input
                        @click="${e => this.handleCheck(e.target.checked, i)}"
                        type="checkbox"
                        id=${'check-box' + i}
                      />
                    `
                  }
                    &nbsp;
                    <label for=${'check-box' + i}>${checkBoxLabel}</label>
                  </div>
                `
              )
            }
          </div>

          <button
            class="btn"
            type="submit"
            style="margin-left: 0;"
            @click="${this.submitForm}"
          >
            Submit
          </button>
        </form>

        <!-- result for existing job component -->
        <div style="display: ${this.inputPage == 2 ? 'block' : 'none'}">
          <existing-job></existing-job>
        </div>
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
          reasons.map(x => html`<li style="list-style: square">${x}</li>`)
        }
      </ul>
    `;
  }

  loadSampleInput = (e) => {
    e.preventDefault();
    this.setFormData({ ncbi: 'Y16952', inputType: 'get_from_ncbi' });
  }

  openExampleOuput = (e) => {
    e.preventDefault();
    window.location.href = "https://antismash.secondarymetabolites.org/upload/example/index.html";
  }

  handleEmailChange = async (e) => {
    const validationStr = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    const val = e.target.value;
    if(validationStr.test(val)) {
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

  onUploadChoiceChange = (e) => {
    const { value } = e.target;
    if(value !== this.inputType) {
      this.setFormData({ inputType: value, selectedFile1Name: null, selectedFile2Name: null, ncbi: '' });
    } else {
      this.setFormData({ inputType: value });
    }
  }

  selectFile1 = (e) => {
    e.preventDefault();
    var hiddenFile1Selector = this.shadowRoot.getElementById('hiddenFile1Selector');
    hiddenFile1Selector.click();
  }

  selectFile2 = (e) => {
    e.preventDefault();
    var hiddenFile2Selector = this.shadowRoot.getElementById('hiddenFile2Selector');
    hiddenFile2Selector.click();
  }

  handleFileSelection = (e, fileNum) => {
    const { target: { value } } = e;
    const fileName = value.split("\\").slice(-1)[0];
    this.setFormData({ ['selectedFile' + fileNum + 'Name']: fileName });
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

  selectAllFeatures = ({ target:{ checked }}) => {
    this.setFormData({ selectedFeatures: [... Array(6).fill(checked ? true : false)] })
  }

  handleCheck = (checked, i) => {
    let { selectedFeatures } = this.formData;
    selectedFeatures[i] = checked ? true : false;
    this.setFormData({ selectedFeatures  });
  }

  isJobValid = () => {
    const {inputType, selectedFile1Name, ncbi} = this.formData;
    if (inputType == 'upload') {
      if (!selectedFile1Name) {
          return false;
      }
    } else {
      if (!ncbi) {
          return false;
      }
    }
    return true;
  }

  submitForm = async (e: any) => {
    this.loading = true;
    try {
      e.preventDefault();
      if(this.isJobValid()) {
        const {selectedFile2Name, selectedFile1Name, email, ncbi, selectedFeatures} = this.formData;
        const payload = {
          jobtype: 'antismash5',
          seq: selectedFile1Name,
          gff3: selectedFile2Name,
          geneFinder: selectedFile2Name ? 'none' : 'prodigal',
          email,
          ncbi,
          knownclusterblast: selectedFeatures[0],
          clusterblast: selectedFeatures[1],
          subclusterblast: selectedFeatures[2],
          asf: selectedFeatures[3],
          clusterhmmer: selectedFeatures[4],
          pfam2go: selectedFeatures[5],
        };

        const {data: {id}} = await axios.post('/submit', payload);
        console.log('success----JOB_ID: ', id);
        window.location.href = `/status/${id}`;
      } else {
        console.log('Not a valid job');
      }
    } catch(err) {
      const { message } = err;
      console.log(message);
    } finally {
      this.loading = false;
    }
  }
}

customElements.define('common-submission', Submission);

export default Submission;