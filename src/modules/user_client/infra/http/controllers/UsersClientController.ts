import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserClientService from '../../../services/CreateUserClientService';

export default class UsersClientController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser_client = container.resolve(CreateUserClientService);

    const user_client = await createUser_client.execute({ name, email, password });

    return res.json(classToClass(user_client));
  }
}
