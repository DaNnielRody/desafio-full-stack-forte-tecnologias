import { HttpException, HttpStatus } from '@nestjs/common';

export type AppErrorPayload = {
  message: string;
  error?: string;
  code?: string;
  details?: unknown;
  statusCode?: number;
};

export class AppException extends HttpException {
  constructor(payload: AppErrorPayload, status: number) {
    super(
      {
        statusCode: status,
        message: payload.message,
        error: payload.error ?? 'AppException',
        code: payload.code,
        details: payload.details,
      },
      status,
    );
  }

  static badRequest(message: string, details?: unknown): AppException {
    return new AppException({ message, details }, HttpStatus.BAD_REQUEST);
  }

  static unauthorized(message = 'Não autorizado'): AppException {
    return new AppException({ message }, HttpStatus.UNAUTHORIZED);
  }

  static forbidden(message = 'Proibido'): AppException {
    return new AppException({ message }, HttpStatus.FORBIDDEN);
  }

  static notFound(message = 'Registro não encontrado'): AppException {
    return new AppException({ message }, HttpStatus.NOT_FOUND);
  }

  static conflict(message = 'Conflito', details?: unknown): AppException {
    return new AppException({ message, details }, HttpStatus.CONFLICT);
  }

  static unprocessable(
    message = 'Dados inválidos',
    details?: unknown,
  ): AppException {
    return new AppException(
      { message, details },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  static internal(
    message = 'Erro interno do servidor',
    details?: unknown,
  ): AppException {
    return new AppException(
      { message, details },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
