import { fileFilter } from './helpers/file-filter.helper';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, BadRequestException } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { AmazonServicesService } from './amazon-services.service';

@Controller()
export class AmazonServicesController {
  constructor (private readonly amazonServicesService: AmazonServicesService ) {}
}
