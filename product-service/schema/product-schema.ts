import joi from 'joi';

export const CreateProductSchema = joi.object({
  title: joi.string().min(1),
  description: joi.string(),
  price: joi.number(),
  count: joi.number(),
});

export const BasicProductSchema = joi.object({
  id: joi.string(),
  title: joi.string(),
  description: joi.string(),
  price: joi.number(),
});
