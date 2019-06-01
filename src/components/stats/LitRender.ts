import { render, html } from 'lit-html';

const LitRender = (base) => class extends base {
  invalidate = async (renderTemplate) => {
    if (!this.needsRender) {
      this.needsRender = true;
      await Promise.resolve();
      this.needsRender = false;
      render(renderTemplate(), this.shadowRoot);
    }
  }
}

export default LitRender;