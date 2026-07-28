import express from 'express'
import {
    fetchAllCategories,
    fetchCategory,
    //createCategory,
    //updateCategory,
   //deleteCategory
} from '../controllers/categoriesController.js'

const router = express.Router()

router.get('/', fetchAllCategories)
router.get('/:id', fetchCategory)
//router.post('/', createCategory)
//router.patch('/:id', updateCategory)
//router.delete('/:id', deleteCategory)

export default router