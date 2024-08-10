import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/role.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
('@nestjs/config');
@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          uri: config.get('DB_URL'),
        };
      },
      inject: [ConfigService],
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [/*{
    provide: APP_GUARD,
    useClass: RolesGuard
  },*/],
})
export class AppModule {}
