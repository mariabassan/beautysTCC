import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '../../../services/UpdateProfileService';
import ShowProfileService from '../../../services/ShowProfileService';

export default class ProfileController {
  public async show(req: any, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return res.json(classToClass(user));
  }

  public async update(req: any, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, password, old_password } = req.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      name,
      email,
      old_password,
      password,
      user_id,
    });

    return res.json(classToClass(user));
  }
}
