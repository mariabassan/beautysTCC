import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailClientService from '../../../services/SendForgotPasswordEmailClientService';

export default class ForgotPasswordClientController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordEmailClient = container.resolve(
      SendForgotPasswordEmailClientService,
    );

    await sendForgotPasswordEmailClient.execute({ email });

    return res.status(204).json();
  }
}
