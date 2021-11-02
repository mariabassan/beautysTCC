import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordClientService from '../../../services/ResetPasswordClientService';

export default class ResetPasswordClientController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;

    const resetClientPassword = container.resolve(ResetPasswordClientService);

    await resetClientPassword.execute({ token, password });

    return res.status(204).json();
  }
}
