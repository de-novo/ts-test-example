import Joi from 'joi';
export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  HASH_SALT: Joi.number().default(10),
});
export default () => {
  const port = parseInt(process.env.PORT ?? '3000', 10);
  const hashSalt = parseInt(process.env.HASH_SALT ?? '10', 10);
  return { port, hashSalt };
};
