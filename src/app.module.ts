import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmazonServicesModule } from './amazon-services/amazon-services.module';
import { ConfigModule } from '@nestjs/config';
import { AppRoutingModule } from './amazon-services/amazon-services.routing.module';

@Module({
  imports: [AmazonServicesModule, AppRoutingModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
