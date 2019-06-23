import { html } from 'lit-html';
import axios from 'axios';

import Litrender from '../LitRender';
import NewsInterface from '../../Interfaces/News';

import store from '../../Store';

class News extends Litrender(HTMLElement) {
  news: NewsInterface;

  setNews(data) {
    this.news = { ...data };
    console.log(data);
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

  renderTemplate = () => {
    const { teaser, text } = this.news.notices[0];

    return html`
      <style>
        #container {
          padding: 1rem;
        }
      </style>
      <div id="container">
        <h3>${teaser}</h3>
        <p>${text}</p>
      </div>
    `;
  }
}

customElements.define('server-news', News);

export default News;