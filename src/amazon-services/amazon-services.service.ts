import { Injectable } from '@nestjs/common';
import { HelperService } from '../services/helper.service';
import { AWSError, Textract } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { PromiseResult } from 'aws-sdk/lib/request';

@Injectable()
export class AmazonServicesService {

  constructor( ) {}

}