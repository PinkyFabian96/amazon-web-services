import { Injectable } from '@nestjs/common';
import { HelperService } from '../../services/helper.service';
import { AWSError, Textract } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { PromiseResult } from 'aws-sdk/lib/request';

@Injectable()
export class TextractService {

  constructor( private readonly _helperService:HelperService, private readonly _configService:ConfigService ) {}

  public async analyzeInvoiceText( files:Array<Express.Multer.File> ):Promise<Array<any>> {
    let config = this.getConfigAmazonWebService();
    console.log( { config });
    let textract = new Textract( config );
    let textractList = [];
    // Lee la imagen de la factura o recibo (debes proporcionar una ruta válida)
    // let imagePath = "./factura-ticket2.jpeg";
    // let texTract =  new TexTractAWS( config );
    //const image = await this._helperService.readImage(imagePath);
    try {
      // Prepara la solicitud para Textract
      for await( let file of files ) {
        const params = {
          Document: {
              Bytes: file.buffer,
          },
          // FeatureTypes: ['FORMS'],
        };
        // Ejecuta la solicitud a Textract
        const response = await textract.analyzeExpense(params).promise();
        let keyMap = this.processTextractResponse( response );
        textractList.push( keyMap );
      }
      console.log( textractList );
    } catch (error) {
        console.error('Error al analizar el texto:', error);
    }
    return textractList;
  }

  private processTextractResponse ( textractResponse:PromiseResult<Textract.AnalyzeExpenseResponse, AWSError> ):object {
    try {
      // Procesa la respuesta y extrae el texto de los campos detectados
      let keyValueMap = {};
      textractResponse.ExpenseDocuments.forEach(doc => {
        doc.SummaryFields.forEach( ( summaryField, index ) => {
            if( summaryField.ValueDetection && summaryField.ValueDetection.Text.trim() !== null ) {
                console.log( summaryField )
                let valueDetection = summaryField.ValueDetection.Text.trim();

                let type = summaryField.Type?.Text;
                // let labelDetection = summaryField.LabelDetection?.Text.trim().replaceAll(":","").replaceAll(" ","_").toLowerCase() ?? type;
                let labelDetection = this._helperService.normalizeLabelDectection(summaryField.LabelDetection?.Text.trim()) ?? type;
                //Validate exist LabelDetection
                if( keyValueMap[type]?.hasOwnProperty(labelDetection) ) {
                  let count = 1;
                  while( count <= 5) {
                    let newLabelDetection = labelDetection.concat("_").concat(count);
                    if( !keyValueMap[type]?.hasOwnProperty(newLabelDetection) ) {
                      labelDetection = newLabelDetection;
                      break;
                    }
                    count++;
                  }
                }

                if( type !== null ) {
                  if( !(summaryField.Type.Text in keyValueMap) ) {
                    keyValueMap[summaryField.Type.Text] = {}
                  }
                  if( labelDetection == null || labelDetection == undefined )
                    labelDetection = type;

                  keyValueMap[summaryField.Type.Text] = { ...keyValueMap[summaryField.Type.Text], Type:summaryField.Type.Text, [labelDetection]:valueDetection };
                } else if( labelDetection !== null ) {
                  keyValueMap[summaryField.LabelDetection.Text] =  summaryField.ValueDetection.Text.trim();
                }

            }
        });
        // console.log( keyValueMap )
      });
      return keyValueMap;
    } catch (error) {
      console.log( error );
    }
  }

  private getConfigAmazonWebService() {
    return { accessKeyId:this._configService.get<string>('ACCESSKEYID'), secretAccessKey: this._configService.get<string>('SECRETACCESSKEY'), region: this._configService.get<string>('REGION') }
  }

  private uploadDocumentImage( ):Promise<string> {
    try {

    }catch( error ) {

    }

    return;
  }

}