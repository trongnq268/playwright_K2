export class GuestInfo {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
  ) {}

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
