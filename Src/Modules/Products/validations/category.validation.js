import Joi from 'joi'

export const addCategorySchema = Joi.object({
	body: {
		name: Joi.string().min(3).max(50).trim().required(),
	},
	params: {},
	query: {},
	file: Joi.object().required()
})

export const getCategorySchema = Joi.object({
	body: {},
	params: { categorySlug: Joi.string() },
	query: {},
})

export const updateCategorySchema = Joi.object({
	body: {
		name: Joi.string().min(3).max(200).trim(),
	},
	params: { categorySlug: Joi.string() },
	query: {},
	file: Joi.object()
})

export const deleteCategorySchema = Joi.object({
	body: {},
	params: { categorySlug: Joi.string() },
	query: {},
})
