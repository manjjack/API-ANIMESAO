import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) {}

  @Post()
  create(@Body() admin: Admin) {
    return this.adminService.create(admin);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updatedUser: Partial<Admin>,
  ): Promise<Admin> {
    try {
      const user: Admin = await this.adminService.update(id, updatedUser);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.delete(+id);
  }

  @Post('users/:userId')
  async changeUserStatus(
    @Param('userId') userId: number,
    @Body('newStatus') newStatus: boolean,
  ): Promise<void> {
    try {
      await this.adminService.changeUserStatus(userId, newStatus);
    } catch (error) {
      throw new Error(`Erro ao alterar o status do usuário: ${error.message}`);
    }
  }
}
