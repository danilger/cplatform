type Roles = Array<
  'investor' | 'business' | 'user' | 'administrator' | 'tester'
>;

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly roles: Roles;
  readonly resetPassword?: string;
  constructor() {
    this.resetPassword = '';
  }
}
