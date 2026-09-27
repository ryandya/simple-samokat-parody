import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module.js';
import { ProductModule } from './product/product.module.js';
import { UserModule } from './user/user.module.js';
import path  from 'app-root-path'
import { ServeStaticModule } from '@nestjs/serve-static'

export const { ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    CategoryModule,
    ProductModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
