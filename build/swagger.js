// tslint:disable-next-line: no-var-requires
const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerJsdoc = require(‘swagger-jsdoc’);
const options = {
    // List of files to be processed.
    apis: ['src/routes/*.ts'],
    // You can also set globs for your apis
    // e.g. './routes/*.js'
    swaggerDefinition: {
        openapi: '3.0.1',
        servers: [
            {
                url: process.env.SWAGGER_BASE_PATH || '/'
            }
        ],
        url: '/property-manager/',
        info: {
            version: '0.0.1',
            title: 'APIs Document',
            description: 'APIs documentation for property manager.',
            termsOfService: '',
            contact: {
                name: 'Mohamed Ghobashy',
                email: 'ghobashy@birdnestlife.com'
            },
            license: {
                name: 'no-license'
            }
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    }
};
const specs = swaggerJsdoc(options);
export default specs;
//# sourceMappingURL=swagger.js.map