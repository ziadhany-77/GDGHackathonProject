import Joi from 'joi'


export const getProductSchema = Joi.object({
	body: {},
	params: { productSlug: Joi.string().required() },
	query: {},
})

export const addProductSchema = Joi.object({
	body: {
        title: Joi.string().min(3).max(60).trim().required(),
        description: Joi.string().min(3).max(200).required().trim(),
        stock: Joi.number().min(0).required(),
        price: Joi.number().min(0.1).required(),
		discountedPrice: Joi.number().min(0.1).required(),
		features: Joi.array().items(
			Joi.object({
				key: Joi.string().required(),
				value: Joi.string().required(),
			})
		),
		subcategory_id: Joi.string().hex().length(24).required()
	},
	params: {},
	query: {},
	files: Joi.object().required()
})

export const updateProductSchema = Joi.object({
	body: {
        title: Joi.string().min(3).max(60).trim(),
        description: Joi.string().min(3).max(200).trim(),
        stock: Joi.number().min(0),
        price: Joi.number().min(0.1),
		discountedPrice: Joi.number().min(0.1),
		features: Joi.array().items(
			Joi.object({
				key: Joi.string(),
				value: Joi.string(),
			})
		),
		subcategory_id: Joi.string().hex().length(24)
	},
	params: { productSlug: Joi.string().required() },
	query: {},
	files: Joi.object()
})


export const deleteProductSchema = Joi.object({
	body: {},
	params: { productSlug: Joi.string().required() },
	query: {},
})
