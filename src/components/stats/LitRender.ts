import { render, html } from 'lit-html';

const LitRender = (base) => class extends base {
  renderTemplate = () => {
    const arr = [
      { key: "server status: ", val: this.status },
      { key: "Running Jobs: ", val: this.runningJobs },
      { key: "Queued Jobs", val: this.queuedJobs },
      { key: "Jobs Processed", val: this.jobsProcessed },
    ];

   return html`
      ${arr.map(({ key, val }) => html`<div>${key}: ${val}</div>`)}
    `;

    // render(statsTemplate, document.getElementById('stats'));
  }

  invalidate = async () => {
    if (!this.needsRender) {
      this.needsRender = true;
      await Promise.resolve();
      this.needsRender = false;
      render(this.renderTemplate(), this.shadowRoot);
    }
  }
}

export default LitRender;