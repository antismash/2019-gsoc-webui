import { html, render } from 'lit-html';
import LitRender from '../LitRender';

import api from '../../../utils/api';
import colors from '../../../utils/theme';
// import store from '../../Store';

class Stats extends LitRender(HTMLElement) {
  status: string;
  running: number;
  queue_length: number;
  total_jobs: number;
  // counter: number = 0;

  setStats = ({status, running, queue_length, total_jobs}) => {
    this.status = status;
    this.running = running;
    this.queue_length = queue_length;
    this.total_jobs = total_jobs;
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.setStats({
      status: "fetching status...",
      running: 0,
      queue_length: 0,
      total_jobs: 0
    });

    this.invalidate(this.renderTemplate);
    this.fetchStats();
  }

  fetchStats = async () => {
    try {
      const { data } =  await api.get('/stats');
      this.setStats(data);
      this.invalidate(this.renderTemplate);
    } catch (err) {
      this.status = "error fetching data...";
      console.log(err);
    }
  }

  renderTemplate = () => {
    const arr = [
      { key: "server status: ", val: this.status },
      { key: "Running Jobs: ", val: this.running },
      { key: "Queued Jobs", val: this.queue_length },
      { key: "Jobs Processed", val: this.total_jobs },
    ];

   return html`
      <style>
        ul {
          padding: 0;
          margin: 1rem;
          list-style: none;
          border: 1px solid ${colors.gray};
          border-bottom: none;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1rem;
          min-height: 40px;
          border-bottom: 1px solid ${colors.gray};
        }
        .badge {
          background-color: ${colors.darkGray};
          border-radius: 10px;
          padding: 3px 7px;
          color: #fff;
          font-weight: bold;
        }
      </style>
      <ul>
        ${arr.map(({ key, val }) => html`<li>
          <span>${key} </span>
          <span class="badge">${val}</span>
        </li>`)}
      </ul>
    `;

    // render(statsTemplate, document.getElementById('stats'));
  }
}

customElements.define('server-stats', Stats);

export default Stats;