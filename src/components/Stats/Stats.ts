import { html } from 'lit-html';
import LitRender from '../LitRender';

import StatsInterface from '../../Interfaces/ServerStats';
import axios from 'axios';

import colors from '../../../utils/theme';
import store from '../../Store';

class Stats extends LitRender(HTMLElement) {
  stats: StatsInterface;

  setStats = (data) => {
    this.stats = { ...data };
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const { ServerStats } = store.getState();
    this.setStats(ServerStats);

    store.subscribe(() => {
      const { ServerStats } = store.getState();
      this.setStats(ServerStats);
      this.invalidate(this.renderTemplate);
    });

    this.invalidate(this.renderTemplate);
    this.fetchStats();
  }

  fetchStats = async () => {
    try {
      const { data: ServerStats } =  await axios.get('/stats');
  
      store.dispatch({
        type: 'UpdateStats',
        values: { ...ServerStats }
      });
  
      this.invalidate(this.renderTemplate);
    } catch (err) {
      this.setStats({status: "error fetching data...", running: -1, queue_length: -1, total_jobs: -1});
      console.log(err);
    }
  }

  renderTemplate = () => {
    const { status, running, queue_length, total_jobs } = this.stats;
    const arr = [
      { key: "server status: ", val: status },
      { key: "Running Jobs: ", val: running },
      { key: "Queued Jobs", val: queue_length },
      { key: "Jobs Processed", val: total_jobs },
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