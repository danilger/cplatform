type Role = 'investor' | 'business' | 'user' | 'administrator';

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly role: Role;
  readonly resetPassword?: string;
  constructor() {
    this.resetPassword = '';
  }
}
