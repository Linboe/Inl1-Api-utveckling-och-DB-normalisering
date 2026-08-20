import type { RowDataPacket } from 'mysql2';

export interface ICategoryDBResponse extends RowDataPacket {
    category_id: number;
    category_name: string;
    product_id: number;
    product_category_id: number;
    product_title: string;
    product_stock: number;
    product_price: number;
    product_created_at: string;
}
