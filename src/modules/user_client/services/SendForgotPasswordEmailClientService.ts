import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '../../../shared/errors/AppError';
import IUsersClientRepository from '../repositories/IUsersClientRepository';
import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensClientRepository from '../repositories/IUserTokensClientRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailClientService {
  constructor(
    @inject('UsersClientRepository')
    private usersClientRepository: IUsersClientRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensClientRepository')
    private userTokensClientRepository: IUserTokensClientRepository,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user_client = await this.usersClientRepository.findByEmail(email);

    if (!user_client) {
      throw new AppError('O usuário não existe!');
    }

    const { token } = await this.userTokensClientRepository.generate(user_client.id);

    const forgotPasswordTempalte = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user_client.name,
        email: user_client.email,
      },
      subject: '[BeautyScheduler] Recuperação de senha',
      templateData: {
        file: forgotPasswordTempalte,
        variables: {
          name: user_client.name,
          //link: `http://localhost:3000/password/reset?token=${token}`,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailClientService;
