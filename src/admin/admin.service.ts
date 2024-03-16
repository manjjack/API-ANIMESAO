import { Injectable, Inject } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult, EntityManager } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';
import { User } from 'src/user/entities/user.entity';
EntityManager;

@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_REPOSITORY')
    private userRepository: Repository<Admin>,
    @Inject('USER_REPOSITORY')
    private repository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<Admin[]> {
    return this.userRepository.find();
  }

  async create(user: Admin): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(user.password, 12); // Hash da senha
    const userWithHashedPassword = { ...user, password: hashedPassword };
    return this.userRepository.save(userWithHashedPassword);
  }

  async update(id: number, updatedUser: Partial<Admin>): Promise<Admin> {
    const updateResult: UpdateResult = await this.userRepository.update(
      id,
      updatedUser,
    );

    if (updateResult.affected === 0) {
      throw new Error('ADM não encontrado ou a atualização falhou');
    }
    const user: Admin = await this.userRepository.findOne({
      where: {
        adminId: id,
      },
    });
    return user;
  }

  async findOne(id: number): Promise<Admin> {
    return await this.userRepository.findOne({
      where: {
        adminId: id,
      },
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    const resultado: DeleteResult = await this.userRepository.delete(id);
    return resultado;
  }

  async changeUserStatus(
    userId: number,
    newStatus: boolean,
  ): Promise<void> {
    try {
      // Encontrar o usuário
      const userToUpdate: User | undefined = await this.repository.findOne({ where: { userId } });
  
      // Verificar se o usuário foi encontrado
      if (!userToUpdate) {
        throw new Error('Usuário não encontrado.');
      }
  
      // Atualizar o status do usuário na base de dados
      await this.repository.update({ userId }, { status: newStatus });
  
      console.log(
        `O status do usuário com ID ${userId} foi alterado para ${newStatus ? 'Ativo' : 'Inativo'} com sucesso.`,
      );
    } catch (error) {
      console.error('Erro ao alterar o status do usuário:', error.message);
      throw error;
    }
  }

}
