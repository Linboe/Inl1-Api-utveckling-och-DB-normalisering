import type { RowDataPacket } from 'mysql2';

export interface IProductDBResponse extends RowDataPacket {
    id: number;
    title: string;
    description: string | null;
    stock: number;
    price: number;
    image: string | null;
    created_at: string;
}
