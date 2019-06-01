import { html, render } from 'lit-html';
import LitRender from './LitRender';
import api from '../../../utils/api';

class Stats extends LitRender(HTMLElement) {
  status: string;
  running: number;
  queue_length: number;
  total_jobs: number;
  needsRender: boolean;

  setStats = (data) => {
    const { status, running, queue_length, total_jobs } = data;
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
      const { data } =  await api.get('/data');
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
      ${arr.map(({ key, val }) => html`<div>${key}: ${val}</div>`)}
    `;

    // render(statsTemplate, document.getElementById('stats'));
  }
}

customElements.define('server-stats', Stats);

export default Stats;