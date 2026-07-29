import type { Request, Response } from 'express';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { db } from '../config/db.js';

export const fetchAllProducts = async (req: Request, res: Response) => {
    const search = req.query.search;
    const sort = req.query.sort;

    try {
        let sql = 'SELECT * FROM products';
        let params: any = [];

        if (search) {
            sql += ` WHERE name LIKE ?`;
            params = [`%${search}%`];
        }

        if (sort === 'asc') {
            sql += `ORDER BY name ASC`;
            params = [`%${sort}%`];
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
    const title = req.body.title;
    const description = req.body.description ?? null; 
    const stock = req.body.stock;
    const price = req.body.price;
    const image = req.body.image ?? null;
    const created_at = req.body.created_at  
    const category_ids: number[] | undefined = req.body.category_ids;


    if (title === undefined) {
        res.status(400).json({ error: 'title is required' });
        return;
    }

    if (stock === undefined) {
        res.status(400).json({ error: 'stock is required' });
        return;
    }

    if (price === undefined) {
        res.status(400).json({ error: 'price is required' });
        return;
    }

    try {
        const sql = ` INSERT INTO products (title, description, stock, price, image)
            VALUES (?, ?, ?, ?, ?)
            `;

        const [results] = await db.query<ResultSetHeader>(sql, [
            title,
            description,
            stock,
            price,
            image,
        ]);

        const newProductId = results.insertId;

        // Om kategorier skickats med, koppla produkten till dem via korstabellen
       if (category_ids && category_ids.length > 0) {
           const linkSql = `
        INSERT INTO categories_products (category_id, product_id)
        VALUES ?
    `;

        const categoryProductRows = category_ids.map((categoryId) => [
            categoryId,
            newProductId,
        ]);

        await db.query(linkSql, [categoryProductRows]);
    }

        res.status(201).json({
            message: `Product '${title}' created`,
            newProduct: {
                id: newProductId,
                title,
                description,
                stock,
                price,
                image,
            },
        });
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description ?? null;
    const stock = req.body.stock;
    const price = req.body.price;
    const image = req.body.image ?? null;

    if (title === undefined) {
        res.status(400).json({ error: 'title is required' });
        return;
    }

    if (stock === undefined) {
        res.status(400).json({ error: 'stock is required' });
        return;
    }

    if (price === undefined) {
        res.status(400).json({ error: 'price is required' });
        return;
    }

    try {
        const sql = ` 
            UPDATE products 
            SET title = ?, description = ?, stock = ?, price = ?, image = ?
            WHERE id = ?`;

        const [results] = await db.query<ResultSetHeader>(sql, [
            title,
            description,
            stock,
            price,
            image,
            id
        ]);

        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Product not found'});
            return;
        }

        res.status(200).json({
            message: `Product '${title}' updated`,
            updateProduct: { id, title, description, stock, price, image },
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
        const [rows] = await db.query<RowDataPacket[]>(
            'SELECT title FROM products WHERE id = ?',
            [id],
        );

        const product = rows[0];
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        const sql = 'DELETE FROM products WHERE id = ?';
        const [result] = await db.query<ResultSetHeader>(sql, [id]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.json({ message: `Product '${product.title}' deleted` });
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
};
