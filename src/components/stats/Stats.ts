import { html, render } from 'lit-html';
import LitRender from './LitRender';
import api from '../../../utils/api';

class Stats extends LitRender(HTMLElement) {
  status: string;
  runningJobs: number;
  queuedJobs: number;
  jobsProcessed: number;
  needsRender: boolean;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.status = "fetching status...";
    this.runningJobs = 0;
    this.queuedJobs = 0;
    this.jobsProcessed = 0;
    this.invalidate();
    this.fetchStats();
  }

  setStats = (data) => {
    const { status, running, queue_length, total_jobs } = data;

    this.status = status;
    this.runningJobs = running;
    this.queuedJobs = queue_length;
    this.jobsProcessed = total_jobs;
  }

  fetchStats = async () => {
    try {
      const { data } =  await api.get('/data');
      this.setStats(data);
      this.invalidate();
    } catch (err) {
      this.status = "error fetching data...";
      console.log(err);
    }
  }
}

customElements.define('server-stats', Stats);

export default Stats;