interface IMailConfig {
  driver: 'ethereal';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'equipe@beautyscheduler.com',
      name: 'Equipe Beauty Scheduler',
    },
  },
} as IMailConfig;
