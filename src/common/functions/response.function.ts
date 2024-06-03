import { IResult } from '../interfaces/result.interface';

export const getResponse = (message: string, data: any): IResult => {
  return { resultCode: 200, message, data };
};

export const createResponse = (message: string, data: any): IResult => {
  return { resultCode: 201, message, data };
};
