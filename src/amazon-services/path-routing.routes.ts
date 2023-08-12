import { TextractModule } from './textract/textract.module';
import { AmazonServicesModule } from './amazon-services.module';

export const PATH_ROUTING = [ 
    {
        path:'amazon-web-services',
        module:AmazonServicesModule,
        children:[
            {
                path:'textract',
                module:TextractModule
            },
        ]

    },
]