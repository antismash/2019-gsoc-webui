import { html, render } from 'lit-html';

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

  getStats = async () => {
    try {
      await fetch('https://fungismash.secondarymetabolites.org/api/v1.0/stats')
        .then((res: object): void => {
          console.log(res);
        });
    } catch (err) {
      // follwing data to be store in redux
      this.status = "working...";
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