import { globalErrorHandler } from '@src/handlers/globalErrorHandler';

describe('globalErrorHandler', () => {
  it('should be defined', () => {
    expect(globalErrorHandler).toBeDefined();
  });

  it('should be a function', () => {
    expect(globalErrorHandler).toBeInstanceOf(Function);
  });
});
