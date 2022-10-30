import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Post('register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.userService.findOne(req.user.username);
  }

  //create route to create role
  @Post('create-role')
  async createRole(@Request() req) {
    return this.userService.createRole(req.body);
  }

  //create route to assign role to user
  @Post('assign-role')
  async assignRole(@Request() req) {
    return this.userService.assignRoleToUser(req.body.userId, req.body.roleId);
  }

  //create route to get all roles
  @Get('get-roles')
  async getRoles(@Request() req) {
    return this.userService.getRoles();
  }

  //create route to get role by id
  @Get('get-role/:id')
  async getRoleById(@Request() req) {
    return this.userService.getRoleById(req.params.id);
  }

  //create route to update role
  @Patch('update-role/:id')
  async updateRole(@Request() req) {
    return this.userService.updateRole(req.params.id, req.body);
  }

  //create route to delete role
  @Post('delete-role/:id')
  async deleteRole(@Request() req) {
    return this.userService.deleteRole(req.params.id);
  }

  //CREATE ROUTE GET USERS
  @Get('get-users')
  async getUsers(@Request() req) {
    return this.userService.getUsers();
  }
}
