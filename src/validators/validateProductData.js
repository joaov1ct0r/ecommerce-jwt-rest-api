import Joi from '@hapi/joi';

let validateProductData = data => {
    let schema = Joi.object({
        title: Joi.string().required().min(3).max(150),
        description: Joi.string().required().min(5).max(150),
        amount: Joi.number().required().min(1),
        price: Joi.number().required().min(1)
    });
    return schema.validate(data);
};

export default validateProductData;