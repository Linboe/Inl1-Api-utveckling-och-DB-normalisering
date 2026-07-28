import type { Request, Response } from 'express';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { db } from '../config/db.js';

export const fetchAllCategories = async (req: Request, res: Response) => {
    const search = req.query.search;
    const sort = req.query.sort;

    try {
        let sql = 'SELECT * FROM categories';
        let params: any = [];

        if (search) {
            sql += ` WHERE name LIKE ?`;
            params = [`%${search}%`];
        }

        if (sort === 'asc') {
            sql += `ORDER BY name ASC`;
          //  params = [`%${sort}%`]; <-- kolla vrf denna behövs
        } else if (sort === 'desc') {
            sql += `ORDER BY name DESC`;
        }

        const [results] = await db.query<RowDataPacket[]>(sql, params);
        res.json(results);
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};

export const fetchCategory = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const [rows] = await db.query<RowDataPacket[]>( //BÖRJA KOLLA FEL HÄR
            `SELECT 
                categories.id AS category_id,
                categories.name AS category_name,

                products.id AS product_id,
                products.title,
                products.description,
                products.stock,
                products.price,
                products.image,
                products.created_at

            from categories
            LEFT JOIN categories_products ON categories.id = categories_products.category_id
            LEFT JOIN products ON categories_products.product_id = products.id
            WHERE categories.id = ?
            `,
            [id],
        );

        const category = rows[0];
        if (!category) {
            res.status(404).json({ message: 'Category no found' });
            return;
        }

        let formatedCategory = {
            id: category.category_id,
            name: category.category_name,
            products: rows.map((row) => ({
                id: row.product_id,
                category_id: row.product_category_id,
                title: row.title,
                description: row.description,
                stock: row.stock,
                price: row.price,
                image: row.image,
                created_at: row.created_at,
            })),
        };

        res.json(formatedCategory);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};

export const createCategory =  async (req: Request, res: Response) => {}

export const updateCategory = async (req: Request, res: Response) => {}

export const deleteCategory = async (req: Request, res: Response) => {}