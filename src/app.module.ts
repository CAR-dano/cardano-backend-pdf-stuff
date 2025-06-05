import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { InspectionsModule } from './inspections/inspections.module';
import { PrismaModule } from './prisma/prisma.module';
import { ScalarDocsModule } from './scalar-docs/scalar-docs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    InspectionsModule,
    ScalarDocsModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
