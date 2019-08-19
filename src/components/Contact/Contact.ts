import { html } from 'lit-html';
import axios from 'axios';

import LitRender from '../LitRender';
import colors from '../../utils/theme';

class Contact extends LitRender(HTMLElement) {
  email: String = null;
  message: String = null;
  isValidEmail = null;
  isValidMessage = true;
  isFormValid = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.invalidate(this.renderTemplate);
  }

  renderTemplate = () => {
    return html`
      <style>
        .container {
          padding: 1rem;
        }
        .emailInput { margin-bottom: 1rem; }
        .messageInput { margin-bottom: 0.7rem; min-height: 70px; }
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
          width: 500px;
        }
        @media screen and (max-width: 500px) {
          .commonTemplate { width: calc(100% - 2rem); margin-right: 1rem; }
        }
      </style>
      <div class="container">
        <h2>Contact us if you have questions or want to report a bug.</h2>
        <div>
          <form novalidate>
            <div class="emailInput">
              ${this.SmallText('Email address')}
              <input
                @input="${this.handleEmailChange}"
                class="commonTemplate" id="email"
                title="Enter your email ID."
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

            <div class="messageInput">
              ${this.SmallText('Your message')}
              <textarea
                class="commonTemplate"
                style="min-height: 120px; padding: 0.5rem;"
                @input="${this.validateMessage}"
              ></textarea>
              <div style="display: ${ this.isValidMessage ? 'none' : 'block' }; color: #810e15;">
                <b style="font-size: .7rem;">Message required</b>
              </div>
            </div>

            <button
              class="btn"
              type="submit"
              style="margin-left: 0;"
              @click="${this.handleSubmission}"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    `;
  }

  SmallText = (text) => html`
    <div style="margin-bottom: 2px">
      <b style="font-size: .7rem;">${text}</b>
    </div>
  `;

  handleEmailChange = async (e) => {
    const val = e.target.value;
    this.isValidEmail = this.validateEmail(val);
    this.email = val;
    this.validateForm();
    this.invalidate(this.renderTemplate);
  }

  displayErrorMessage = () => {
    if(this.email && !this.isValidEmail) {
      return true;
    }
    return false;
  }

  validateEmail = (val) => {
    const validationStr = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    return validationStr.test(val);
  }

  validateMessage = (e) => {
    const val = e.target.value;
    this.message = val;
    this.isValidMessage = val !== null;
    this.validateForm();
    this.invalidate(this.renderTemplate);
  }

  validateForm = () => {
    this.isFormValid = this.isValidEmail && this.isValidMessage;
  }

  handleSubmission = async (e: any) => {
    try {
      e.preventDefault();

      if(this.message === null || this.message === '') {
        this.isValidMessage = false;
        this.invalidate(this.renderTemplate);
      }

      if(this.isFormValid) {
        const data = {
          email: this.email,
          message: this.message,
        };
  
        await axios.post('/email/send', data);
        console.log('Successfully sent');
      } else {
        console.log('Something went wrong');
      }
    } catch(err) {
      alert('Something went wrong');
    }
  }
}

customElements.define('contact-us', Contact);

export default Contact;