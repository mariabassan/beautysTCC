import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass, plainToClass } from 'class-transformer';

import ListProvidersService from '../../../services/ListProvidersService';

import User from '../../../../users/infra/typeorm/entities/User';

export default class ProvidersController {
  public async index(req: any, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({ user_id });

    return res.json(classToClass(plainToClass(User, providers)));
  }
}
