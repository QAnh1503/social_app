import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // hoặc chỉ định IP React Native
  });  

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            // field: error.property,
            // // error: Object.values(error.constraints).join(', '),
            // error: error.constraints
            //   ? Object.values(error.constraints).join(', ')
            //   : 'Invalid value',
            [error.property]: error.constraints 
                                  ? Object.values(error.constraints)[0]
                                  : 'Invalid value',
          })),
        );
      },
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
