import { Module } from '@nestjs/common';
import { TextractController } from './textract.controller';
import { TextractService } from './textract.service';
import { HelperService } from '../../services/helper.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports:[ConfigModule],
    controllers:[TextractController],
    providers:[TextractService, HelperService],
})
export class TextractModule {}
