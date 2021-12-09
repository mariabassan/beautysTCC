export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '5d',
  },
};

//expiresIn, recomendável deixar 1d, para que o usuário seja obrigado a realizar o login novamente 24hs depois.