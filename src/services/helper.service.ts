import { Injectable, Logger } from '@nestjs/common';
import { readFile } from 'fs';
import { Dictionary } from '../amazon-services/constants/dictionary';

@Injectable()
export class HelperService {
    private readonly logger = new Logger( HelperService.name );
    public async readImage(imagePath) {    
        return new Promise((resolve, reject) => {
            readFile(imagePath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    private deleteSpecialCharacter( text ) {
        if( text != null ) {
            var mapAccent = {
              'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
              'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'
              // Agrega más mapeos para otros caracteres especiales si es necesario
            };
          
            let newText = text.replace(/[áéíóúÁÉÍÓÚ]/g, function(matched) {
              return mapAccent[matched];
            });
            console.log( newText.trim() );
            return newText.trim().replace(/[^a-zA-Z]/g, '');  // Eliminar caracteres no alfabéticos
        }
    }

    //Funcion para obtener solo las palabras de un texto
    public getOnlyLetter( text ) {
        let onlyLetter = text;
        if( text !== null ){
            // onlyLetter = labelDetection.match(/[a-zA-Z]/g).join('');
            onlyLetter = onlyLetter.match(/[a-zA-Z]/g);
            if( onlyLetter !== null && onlyLetter.lenght > 0 && onlyLetter.join('').lenght > 5 ) {
                
            }
        }

        return onlyLetter;
    }

     //Funcion para analizar los textos y normalizar
     public normalizeLabelDectection ( labelDetection, separator = "_" ) {
        let labelDetectionNormalize = this.deleteSpecialCharacter( labelDetection );
        if( labelDetectionNormalize != null) {
            // if( labelDetectionNormalize.replaceAll(" ", "").lenght < 6 ) {
            //     labelDetectionNormalize = labelDetectionNormalize.replaceAll(" ", "").toLowerCase();
            // } else {
            //     labelDetectionNormalize = labelDetectionNormalize.replaceAll(" ", separator ).toLowerCase();
            // }
            labelDetectionNormalize = labelDetectionNormalize.toLowerCase();
            this.logger.debug("labelDetectionNormalize",labelDetectionNormalize)
            Dictionary.DATA_LABEL_INDEX_DICTIONARY.forEach( dictionary => {
                if( labelDetectionNormalize != null && labelDetectionNormalize.startsWith( dictionary ) ) {
                    if( Dictionary.DATA_LABEL_REPLACE_DICTIONARY.hasOwnProperty(dictionary) )
                        labelDetectionNormalize = Dictionary.DATA_LABEL_REPLACE_DICTIONARY[dictionary];

                }
            });

        }

        return labelDetectionNormalize;
    }
}
