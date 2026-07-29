export class Product {
    id?: number | undefined;
    description?: string | undefined;
    image?: string | undefined;
    created_at: string = '';
    title: string = '';
    stock: number;
    price: number;

    constructor(
        title: string,
        stock: number,
        price: number,
        description?: string,
        image?: string,
        id?: number,
        created_at?: string,
    ) {
        this.title = title;
        this.stock = stock;
        this.price = price;
        this.description = description;
        this.image = image;
        this.id = id;
        this.created_at = new Date().toString();
    }
}

// kolla på alternativ för id? i ex math.random är det bra?