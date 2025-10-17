import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { createId } from '@paralleldrive/cuid2';

@Catch()
export class AddExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AddExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = request.header('x-request-id') ?? createId();
    response.setHeader('x-request-id', requestId);

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse() as
        | string
        | { message?: string | string[]; error?: string; [k: string]: unknown };
      const { message, error, ...rest } =
        typeof res === 'string' ? { message: res } : (res ?? {});

      const logPayload = {
        kind: 'http_exception',
        requestId,
        status,
        method: request.method,
        path: request.originalUrl ?? request.url,
        message: Array.isArray(message)
          ? message
          : [message ?? exception.message],
        error: error ?? exception.name,
        query: request.query,
        params: request.params,
      };
      this.logger.warn(JSON.stringify(logPayload));

      const payload = Array.isArray(message)
        ? {
            statusCode: status,
            message: 'Dados inválidos',
            error: error ?? 'ValidationError',
            details: message,
            requestId,
            path: request.originalUrl ?? request.url,
            method: request.method,
            ...rest,
          }
        : {
            statusCode: status,
            message: (message as string) ?? exception.message,
            error: error ?? exception.name,
            requestId,
            path: request.originalUrl ?? request.url,
            method: request.method,
            ...rest,
          };
      response.status(status).json(payload);
      return;
    }

    // Unknown error
    const unknownError = exception as Error;
    const logPayload = {
      kind: 'unhandled_exception',
      requestId,
      method: request.method,
      path: request.originalUrl ?? request.url,
      message: unknownError?.message ?? 'Unknown error',
      stack: unknownError?.stack,
    };
    this.logger.error(JSON.stringify(logPayload));
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Erro interno do servidor',
      error: 'InternalServerError',
      requestId,
      path: request.originalUrl ?? request.url,
      method: request.method,
    });
  }
}
