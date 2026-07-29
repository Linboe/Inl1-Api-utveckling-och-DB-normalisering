import express from 'express'
import {
    fetchAllCategories,
    fetchCategory,
    createCategory,
    updateCategory,
    deleteCategory
} from '../controllers/categoriesController.js'

const router = express.Router()

router.get('/categories', fetchAllCategories)
router.get('/categories/:id/products', fetchCategory);
router.post('/categories', createCategory)
router.patch('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router