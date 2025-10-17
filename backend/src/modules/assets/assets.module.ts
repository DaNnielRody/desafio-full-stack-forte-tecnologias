import { Module } from '@nestjs/common';
import { AssetsController } from './controllers/assets.controller.js';
import { AssetsRepository } from './repositories/assets.repository.js';
import { AssetsService } from './services/assets.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService, AssetsRepository, PrismaService],
  exports: [AssetsRepository],
})
export class AssetsModule {}
