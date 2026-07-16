import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [ AuthModule, PrismaModule, VehicleModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
