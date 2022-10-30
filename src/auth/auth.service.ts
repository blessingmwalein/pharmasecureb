import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
      // const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: any) {
    console.log(user);

    const userFound = await this.usersService.findOne(user.username);
    const payload = {
      username: userFound.username,
      sub: userFound.id,
      roles: userFound.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    user.password = await bcrypt.hash(user.password, 10);
    let response = await this.usersService.create(user);
    if (response) {
      const { password, ...result } = response;
      return result;
    }
  }
}
