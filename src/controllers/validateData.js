import Joi from '@hapi/joi';

let registerValidate = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        password: Joi.string().required().min(8).max(250)
    });
    return schema.validate(data);
};

let loginValidate = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        password: Joi.string().required().min(8).max(250)
    });
    return schema.validate(data);
};

let editValidate = data => {
    let schema = Joi.object({
        email: Joi.string().required().min(10).max(100),
        password: Joi.string().required().min(8).max(250)
    });
    return schema.validate(data);
};

export { registerValidate, loginValidate };
