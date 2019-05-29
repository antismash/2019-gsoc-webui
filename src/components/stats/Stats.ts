import { html, render } from 'lit-html';
import api from '../../../utils/api';

class Stats {
  status: string;
  runningJobs: number;
  queuedJobs: number;
  jobsProcessed: number;
  loading: boolean;

  constructor() {
    this.status = "fetching status...";
    this.runningJobs = 0;
    this.queuedJobs = 0;
    this.jobsProcessed = 0;
  }

  setStats = (data) => {
    const { status, running, queue_length, total_jobs } = data;

    this.status = status;
    this.runningJobs = running;
    this.queuedJobs = queue_length;
    this.jobsProcessed = total_jobs;
  }

  getStats = async () => {
    try {
      const { data } =  await api.get('/data');
      this.setStats(data);
      this.renderTemplate();
    } catch (err) {
      this.status = "error fetching data...";
      this.loading = false;
      console.log(err);
    }
  }

  renderTemplate = () => {
    const arr = [
      { key: "server status: ", val: this.status },
      { key: "Running Jobs: ", val: this.runningJobs },
      { key: "Queued Jobs", val: this.queuedJobs },
      { key: "Jobs Processed", val: this.jobsProcessed },
    ];

    const fieldTemplate = (key, value) => html`
      <div>${key}: ${value}</div>
    `;

    const statsTemplate = html`
      ${arr.map(({ key, val }) => fieldTemplate(key, val))}
    `;
    render(statsTemplate, document.getElementById('stats'));
  }
}

export default Stats;