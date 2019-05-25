import { User } from './User';
import { html, render } from 'lit-html';

class Person {
  private profile: object;

  constructor(public user: User, public sport: string) {
    this.profile = { user, sport };
  }
  
  public showProfile(): void {
    document.getElementById('profile').innerHTML = JSON.stringify(this.profile, null, 4);
  }
};



const helloTemplate = (name) => html`<div>Hello ${name}!</div>`;

render(helloTemplate('Foo'), document.getElementById('greeting'));

export default Person;