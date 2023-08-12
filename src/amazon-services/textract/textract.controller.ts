import { fileFilter } from '../helpers/file-filter.helper';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, BadRequestException } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { TextractService } from './textract.service';

@Controller()
export class TextractController {
  constructor( private readonly textractService: TextractService ) {}

  @Post()
  @UseInterceptors( 
    //FileInterceptor
    AnyFilesInterceptor( { 
    fileFilter:fileFilter,
    // limits: {fieldSize: 1000 }
    // storage: diskStorage({
    //   destination: './static/products/',
    //   filename: fileNamer,
    // })
  }) )
  async analyzeDocument(@UploadedFiles() files:Array<Express.Multer.File> ):Promise<Array<any>> {
    console.log("entro dentro de uploadImage")
    if ( !files || files.length == 0 ) { 
      throw new BadRequestException('Make sure that the file is an image');
    }
    console.log( files )
    return await this.textractService.analyzeInvoiceText( files );
  }
}