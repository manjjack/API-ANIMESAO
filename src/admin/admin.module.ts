import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { adminProviders } from './admin.provider';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';


@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'LHB',
      //signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [...adminProviders, AdminService],
  controllers: [AdminController],
  exports: [JwtModule],
})
export class AdminModule {}
