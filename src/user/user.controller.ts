import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UnauthorizedException
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { DeleteResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    try {
      const createdUser = await this.userService.create(user);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAllUsers(): Promise<User[]> {
    try {
      const users = await this.userService.findAll();
      return users;
    } catch (error) {
      throw error.message;
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updatedUser: Partial<User>,
  ): Promise<User> {
    try {
      const user: User = await this.userService.update(id, updatedUser);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    try {
      const user: User = await this.userService.findOne(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    try {
      const result: DeleteResult = await this.userService.delete(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  @Post('login')
  async login(@Body() body: { username: string, password: string }): Promise<{ user: User, accessToken: string }> {
    const { username, password } = body;

    try {
      const { user, accessToken } = await this.userService.login(username, password);
      return { user, accessToken };
    } catch (error) {
      const { user, accessToken } = await this.userService.login(username, password);
      throw new UnauthorizedException('Credenciais inválidas');
      return { user, accessToken };
    }
  }
}
