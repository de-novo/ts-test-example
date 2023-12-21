import Joi from 'joi';
export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  HASH_SALT: Joi.number().default(10),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
});
export default () => {
  const port = parseInt(process.env.PORT ?? '3000', 10);
  const hashSalt = parseInt(process.env.HASH_SALT ?? '10', 10);
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  return { port, hashSalt, accessTokenSecret, refreshTokenSecret };
};
