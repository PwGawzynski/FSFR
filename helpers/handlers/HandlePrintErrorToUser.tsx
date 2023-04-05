import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

export function handlePrintErrorToUser(e: unknown) {
  if (!(e instanceof AxiosError))
    return 'Some error occurred, please try again later';
  const message = e.response?.data?.payload?.message;
  if (e.response?.status === StatusCodes.CONFLICT && message) return message;
  return 'Some error occurred, please try again later';
}
