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
    const type = this.getAttribute('type');

    return html`
      <style>
        #cross {
          opacity: 0.8;
          font-weight: bold;
          float: right;
          cursor: pointer;
        }
        #cross:hover {
          color: #31708f;
        }
        .commonStyle {
          position: absolute;
          z-index: 10;
          padding: 1rem;
          opacity: ${text === 'loading' ? 0 : 1};
          border-radius: 5px;
          transition: opacity 2s;
        }
        #container {
          top: 60px;
          right: 10px;
          width: 250px;
          border: #31708f;
          background: linear-gradient(to bottom, #d9edf7 0, #b9def0 100%);
        }
        #errorContainer {
          border: solid 1px #dca7a7;
          background: linear-gradient(to bottom, #f2dede 0, #e7c3c3 100%);
          color: #a94442;
        }
      </style>
      <div class="commonStyle" id=${type === 'error' ? 'errorContainer' : 'container'}>
        <div id="cross" @click="${e => {e.target.parentElement.style.display = "none";}}">&#10005;</div>
        <h3>${teaser}</h3>
        <p>${text}</p>
      </div>
    `;
  }
}

customElements.define('server-news', News);

export default News;