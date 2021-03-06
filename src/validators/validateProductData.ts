import Joi from "@hapi/joi";

const validateHandleNewProduct = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    title: Joi.string().required().min(3).max(150),
    description: Joi.string().required().min(5).max(150),
    amount: Joi.number().required().min(1),
    price: Joi.number().required().min(1)
  });
  return schema.validate(data);
};

const validateHandleEditProduct = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    title: Joi.string().required().min(3).max(150),
    description: Joi.string().required().min(5).max(150),
    amount: Joi.number().required().min(1),
    price: Joi.number().required().min(1),
    productId: Joi.string().required().min(1)
  });

  return schema.validate(data);
};

const validateHandleDeleteProduct = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    productId: Joi.string().required().min(1)
  });

  return schema.validate(data);
};

const validateHandleGetOneProduct = (data: Object): Joi.ValidationResult => {
  const schema: Joi.ObjectSchema<Object> = Joi.object({
    productId: Joi.string().required().min(1)
  });

  return schema.validate(data);
};

export { validateHandleNewProduct, validateHandleEditProduct, validateHandleDeleteProduct, validateHandleGetOneProduct };
