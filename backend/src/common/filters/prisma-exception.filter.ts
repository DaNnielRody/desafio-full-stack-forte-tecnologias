import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { createId } from '@paralleldrive/cuid2';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = request.header('x-request-id') ?? createId();
    response.setHeader('x-request-id', requestId);

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const targets = (exception.meta?.target as string[]) ?? [];
      const logPayload = {
        kind: 'prisma_known_error',
        requestId,
        method: request.method,
        path: request.originalUrl ?? request.url,
        code: exception.code,
        message: exception.message,
        target: targets,
      };
      this.logger.warn(JSON.stringify(logPayload));
      const status = this.mapPrismaCodeToHttpStatus(exception.code);
      const message = this.buildKnownErrorMessage(exception);
      response.status(status).json({
        statusCode: status,
        error: 'PrismaClientKnownRequestError',
        code: exception.code,
        message,
        requestId,
        path: request.originalUrl ?? request.url,
        method: request.method,
        target: targets,
      });
      return;
    }

    if (exception instanceof Prisma.PrismaClientValidationError) {
      const logPayload = {
        kind: 'prisma_validation_error',
        requestId,
        method: request.method,
        path: request.originalUrl ?? request.url,
        message: exception.message,
      };
      this.logger.warn(JSON.stringify(logPayload));
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'PrismaClientValidationError',
        message: 'Invalid data for database operation',
        requestId,
        path: request.originalUrl ?? request.url,
        method: request.method,
      });
      return;
    }

    throw exception;
  }

  private mapPrismaCodeToHttpStatus(code: string): number {
    switch (code) {
      case 'P2002':
        return HttpStatus.CONFLICT;
      case 'P2003':
        return HttpStatus.BAD_REQUEST;
      case 'P2025':
        return HttpStatus.NOT_FOUND;
      default:
        return HttpStatus.BAD_REQUEST;
    }
  }

  private buildKnownErrorMessage(
    error: Prisma.PrismaClientKnownRequestError,
  ): string {
    if (error.code === 'P2002') {
      const targets = (error.meta?.target as string[]) ?? [];
      if (targets.includes('email'))
        return 'Já existe um registro com este e-mail.';
      if (targets.includes('cpf')) return 'Já existe um registro com este CPF.';
      if (targets.includes('cnpj')) {
        return 'Já existe um registro com este CNPJ.';
      }
      return 'Valor já está em uso.';
    }
    if (error.code === 'P2025') {
      return 'Registro não encontrado.';
    }
    return 'Erro ao processar a solicitação.';
  }
}
