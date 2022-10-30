import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, UpdateResult } from 'typeorm';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}
  async findOne(username: string): Promise<any> {
    return await this.usersRepository.findOne({
      where: { username: username },
      relations: ['role'],
    });
  }

  async create(data) {
    //check if user exists
    const userExists = await this.usersRepository.findOne({
      where: { username: data.username },
    });
    if (userExists) {
      return {
        message: 'User already exists',
      };
    }
    const userCreated = await this.usersRepository
      .save(data)
      .then((res) => res)
      .catch((e) => console.log(e));
    const role = await this.rolesRepository.findOne({
      where: { id: data.roleId },
    });
    userCreated.role = role;
    return await this.usersRepository.save(userCreated);
  }

  //create function to create role
  async createRole(data) {
    return await this.rolesRepository.save(data);
  }

  //create function to get all roles
  async getRoles() {
    return await this.rolesRepository.find();
  }

  //create function to get role by id
  async getRoleById(id: number) {
    return await this.rolesRepository.findOne({ where: { id: id } });
  }

  //create function to update role
  async updateRole(id: number, data: Partial<Role>) {
    await this.rolesRepository.update({ id }, data);
    return await this.rolesRepository.findOne({ where: { id: id } });
  }

  //create function to delete role
  async deleteRole(id: number) {
    return await this.rolesRepository.delete({ id });
  }

  //create function to assign role to user
  async assignRoleToUser(userId: number, roleId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const role = await this.rolesRepository.findOne({ where: { id: roleId } });
    user.role = role;
    return await this.usersRepository.save(user);
  }

  //create function to get all users
  async getUsers() {
    return await this.usersRepository.find({ relations: ['role'] });
  }

  //create function to get user by id
  async getUserById(id: number) {
    return await this.usersRepository.findOne({
      where: { id: id },
      relations: ['role'],
    });
  }
}
