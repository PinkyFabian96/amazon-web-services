import { PartialType } from '@nestjs/mapped-types';
import { CreateAmazonServiceDto } from './create-amazon-service.dto';

export class UpdateAmazonServiceDto extends PartialType(CreateAmazonServiceDto) {}
