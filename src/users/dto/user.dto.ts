

export class CreateUserDto {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  roles: RoleDto[];
}

export class RoleDto {
  id: number;
  name: string;
}
