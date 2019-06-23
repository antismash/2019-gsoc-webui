import { html } from 'lit-html';
import axios from 'axios';

import Litrender from '../LitRender';
import NewsInterface from '../../Interfaces/News';

import store from '../../Store';

class News extends Litrender(HTMLElement) {
  news: NewsInterface;

  setNews(data) {
    this.news = { ...data };
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const { ServerNews } = store.getState();
    this.setNews(ServerNews);

    store.subscribe(() => {
      const { ServerNews } = store.getState();
      this.setNews(ServerNews);
      this.invalidate(this.renderTemplate)
    });

    this.invalidate(this.renderTemplate);
    this.fetchNews();
  }

  fetchNews = async () => {
    try {
      const { data: ServerNews } = await axios.get('/news');

      store.dispatch({
        type: "UpdateNews",
        values: { ...ServerNews }
      });

      this.invalidate(this.renderTemplate);
    } catch (err) {
      this.setNews({
        notices: [
          {
            text: "error",
            teaser: "Error loading news...",
            added: '',
            category: '',
            show_from: '',
            show_until: ''
          }
        ]
      });
      console.log(err);
    }
  }

  hideNews = e => {
    console.log(e);
    e.target.parentElement.style.display = "none";
  }

  renderTemplate = () => {
    const { teaser, text } = this.news.notices[0];

    return html`
      <style>
        #cross {
          opacity: 0.8;
          float: right;
          cursor: pointer;
        }
        #cross:hover {
          color: #31708f;
        }
        #container {
          padding: 1rem;
          position: absolute;
          z-index: 10;
          top: 60px;
          right: 10px;
          width: 250px;
          border: solid 1px #31708f;
          border-radius: 5px;
          background: linear-gradient(to bottom, #d9edf7 0, #b9def0 100%);
          opacity: ${text === 'loading' ? 0 : 1};
          transition: opacity 2s;
        }
      </style>
      <div id="container">
        <div id="cross" @click="${e => {e.target.parentElement.style.display = "none";}}">&#10008;</div>
        <h3>${teaser}</h3>
        <p>${text}</p>
      </div>
    `;
  }
}

customElements.define('server-news', News);

export default News;