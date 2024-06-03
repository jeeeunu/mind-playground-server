import { Request } from 'express';
import { IPayload } from '../jwt/interfaces/payload.interface';

export interface IRequest extends Request {
  account: IPayload;
}
