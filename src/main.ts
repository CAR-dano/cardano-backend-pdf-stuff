/*
 * --------------------------------------------------------------------------
 * File: main.ts
 * Project: cardano-pdf
 * Copyright © 2025 [Your Company Name Here]
 * --------------------------------------------------------------------------
 * Description: The main entry point for the cardano-pdf application.
 * Initializes the NestJS application, configures global settings like
 * prefixes, validation pipes, and CORS, and sets up Swagger documentation.
 * It also retrieves the application port from environment variables and
 * starts the server.
 * --------------------------------------------------------------------------
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { setup } from '@scalar/nestjs-api-reference'; // Unable to resolve correct import for Scalar

let openApiDocument: OpenAPIObject | null = null;

/**
 * Retrieves the generated OpenAPI document.
 *
 * @returns The OpenAPI document object or null if not yet generated.
 */
export function getOpenApiDocument(): OpenAPIObject | null {
  return openApiDocument;
}

/**
 * The main bootstrap function to initialize and start the NestJS application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // eslint-disable-next-line
  const configService: ConfigService = app.get(ConfigService) as any;
  const logger = new Logger('Bootstrap'); // Create a logger instance

  // Set Global Prefix
  app.setGlobalPrefix('api/v1');

  // Apply Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform the payload to a DTO instance
      transformOptions: {
        enableImplicitConversion: true, // Helps implicit type conversion (e.g. string to number in query)
      },
      disableErrorMessages: false, // Show validation error messages (set true in production if necessary)
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cardano PDF API') // Cardano PDF API Title
    .setDescription('API documentation for the Cardano PDF project.') // Description
    .setVersion('1.0.0') // API Version
    // Add tags to group endpoints in the documentation (example tags, adjust as needed)
    .addTag('Inspection Operations', 'Cardano NFT minting and data retrieval')
    .build();

  // Generate OpenAPI document WITHOUT setting up the default Swagger UI
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Store the document in a global variable (optional)
  openApiDocument = document;

  const port: string | number =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    (configService.get<number>('PORT') as string | number) || 3011; // Retrieve port from .env or use 3011
  await app.listen(port);
  logger.log(`🚀 Application running on: http://localhost:${port}/api/v1`);
  logger.log(
    `📚 API Documentation available at: http://localhost:${port}/api/v1/docs`, // Using default Swagger path for now
  );
  logger.log(
    `📄 OpenAPI JSON specification available at: http://localhost:${port}/api/v1/swagger-json`, // Using default Swagger path for now
  );
}
bootstrap();
