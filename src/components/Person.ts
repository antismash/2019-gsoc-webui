import { User } from './User';

class Person {
  private profile: object;

  constructor(public user: User, public sport: string) {
    this.profile = { user, sport };
  }

  public showProfile(): void {
    document.getElementById('profile').innerHTML = JSON.stringify(this.profile, null, 4);
  }
};

export default Person;