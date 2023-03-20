/**
 * Enum used to define possible responseObject codes
 */
export enum ResponseCode {
  ProcessedCorrect,
  ProcessedWithoutConfirmationWaiting,
}

/**
 * This generic interface is main response object,
 * every response must return its data as object implementing this interface,
 * generic type must be defined if payload property is used
 */
export interface ResponseObject<T = undefined> {
  code: ResponseCode;
  message?: string;

  payload?: T;
}
