import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { FuelLogModule } from './fuel-log/fuel-log.module';
import { InsuranceModule } from './insurance/insurance.module';
import { TagModule } from './tag/tag.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { NormalizePlateMiddleware } from './common/middleware/normalize-plate.middleware';

@Module({
  imports: [AuthModule, PrismaModule, VehicleModule, FuelLogModule, InsuranceModule, TagModule],
  controllers: [AppController],
  providers: [AppService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }

  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NormalizePlateMiddleware)
      .forRoutes('/vehicle/create/');
  }
}
