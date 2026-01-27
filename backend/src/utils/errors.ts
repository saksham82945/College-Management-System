export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public errorCode?: string
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (error: any) => {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      errorCode: error.errorCode,
    };
  }

  console.error('Unexpected error:', error);
  return {
    statusCode: 500,
    message: 'Internal Server Error',
    errorCode: 'INTERNAL_ERROR',
  };
};
