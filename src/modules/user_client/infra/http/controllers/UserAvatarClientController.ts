import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarClientService from '../../../services/UpdateUserAvatarClientService';

export default class UserAvatarController {
  public async update(req: any, res: Response): Promise<Response> {
    const updateUserAvatarClient = container.resolve(UpdateUserAvatarClientService);

    const user_client = await updateUserAvatarClient.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    return res.json(classToClass(user_client));
  }
}
