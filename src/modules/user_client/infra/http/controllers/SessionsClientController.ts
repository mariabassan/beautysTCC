import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserClientService from '../../../services/AuthenticateUserClientService';

export default class SessionsClientController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUserClient = container.resolve(AuthenticateUserClientService);

    const { user_client, token } = await authenticateUserClient.execute({ email, password });

    return res.json({ user_client: classToClass(user_client), token });
  }
}
