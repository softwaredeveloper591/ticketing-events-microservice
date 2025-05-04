import { CustomError } from './custom-error';
export class CustomizedError extends CustomError {
    statusCode: number;

    constructor(statusCode: number, message: string) {
      super(message);
  
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  
    serializeErrors() {
      return [{ message: this.message }];
    }
  }