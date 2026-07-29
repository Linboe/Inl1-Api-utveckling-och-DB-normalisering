import type { Request, Response } from 'express';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { db } from '../config/db.js';


/**
 * 
 * fetchAllProducts
 * createdProduct med alla columns rätt sql
 * updateProduct med alla columns rätt sql
 * deleteProduct
 * 
 */
export const fetchAllProducts = async (req: Request, res: Response) => {

}

export const fetchProduct = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const [results] = await db.query<RowDataPacket[]>(
            `SELECT * FROM products WHERE id = ?`,
            [id],
        );

        const category = results[0];
        if (!category) {
            res.status(404).json({ message: 'Product no found' });
        }
        res.json(results);
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};

// img och desc är VALFRITT tänk på det
export const createProduct = async (req: Request, res: Response) => {
    console.log(req.body);

    const category_id = req.body.todo_id;
    // const product_id = req.body.product_id;
    const title = req.body.title;
    // const description = req.body.description; 
    // const stock = req.body.stock;
    // const price = req.body.price;
    // const image = req.body.image;
    // const created_at = req.body.created_at  

    //lägg till alla dessa i denna kod..

    if (title === undefined) {
        res.status(400).json({ error: 'title is required' });
        return;
    }

    try {
        const sql = ` INSERT INTO products (category_id, title)
            VALUES (?, ?)
            `;

        const [results] = await db.query<ResultSetHeader>(sql, [
            category_id,
            title,
        ]);
        res.status(201).json({
            message: 'Product created',
            newSubtask: { id: results.insertId, title: title },
        });
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};

// utveckla enligt create
export const updateProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    const title = req.body.title;

    if (title === undefined) {
        res.status(400).json({ error: 'title is required' });
        return;
    }

    try {
        const sql = ` UPDATE products SET title = ? WHERE id = ?`;

        const [results] = await db.query<ResultSetHeader>(sql, [title, id]);
        res.status(200).json({
            message: 'Category updated',
            updateProduct: { id: id, title: title },
        });
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};

// jmfr kod ocg testa, denna behöver troligtvis utvecklas
export const deleteProduct = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const sql = `
        DELETE FROM products
        WHERE id = ?`;

        const [result] = await db.query<ResultSetHeader>(sql, [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ messgae: 'Product not found' });
            return;
        }
        res.json({ message: 'Product deleted' });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknow error';
        res.status(500).json({ error: message });
    }
};
