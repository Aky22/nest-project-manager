import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { GqlAuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new GqlAuthGuard(new Reflector()));
  await app.listen(3000);
}
bootstrap();
