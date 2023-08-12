import { Module } from '@nestjs/common';
import { AmazonServicesService } from './amazon-services.service';
import { AmazonServicesController } from './amazon-services.controller';
import { TextractModule } from './textract/textract.module';

@Module({
  imports:[TextractModule],
  controllers: [],
  providers: []
})
export class AmazonServicesModule {}
