import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: 'AAO', 
    //signOptions: { expiresIn: '1h' },
  }),DatabaseModule],
  providers: [
    ...userProviders,
    UserService
  ],
  controllers:[UserController],
  exports: [JwtModule],
})

export class UserModule {}

