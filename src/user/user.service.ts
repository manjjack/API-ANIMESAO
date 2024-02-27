import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 12); // Hash da senha
    const userWithHashedPassword = { ...user, password: hashedPassword };
    return this.userRepository.save(userWithHashedPassword);
  }

  async update(id: number, updatedUser: Partial<User>): Promise<User> {
    const updateResult: UpdateResult = await this.userRepository.update(
      id,
      updatedUser,
    );

    if (updateResult.affected === 0) {
      throw new Error('Usuário não encontrado ou a atualização falhou');
    }
    const user: User = await this.userRepository.findOne({
      where: {
        userId: id,
      },
    });
    return user;
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        userId: id,
      },
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    const resultado: DeleteResult = await this.userRepository.delete(id);
    return resultado;
  }

  comparePassword(password: string): boolean {
    const hashedPassword = password;
    const isMatch = bcrypt.compareSync(password, hashedPassword);
    return isMatch;
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ user: User; accessToken: string }> {
    // Procura o usuário pelo nome de usuário na base de dados
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gera o token de acesso JWT com base nos dados do usuário
    const payload = { username: user.username, sub: user.userId };
    const accessToken = this.jwtService.sign(payload);

    return { user, accessToken };
  }
}
