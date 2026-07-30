/* 
** Table categories 
** Table products
** Table categories_products
** Schema categories 
** Schema products
** Schema categories_products
*/

insert into `categories` (`id`, `name`) values (1, 'movies');
insert into `categories` (`id`, `name`) values (2, 'books');
insert into `categories` (`id`, `name`) values (3, 'games');


insert into `products` (`created_at`, `description`, `id`, `image`, `price`, `stock`, `title`) values ('2026-07-28 15:11:43', 'anime ', 1, NULL, '100.00', 4, 'Howl\'s Moving Castle ');
insert into `products` (`created_at`, `description`, `id`, `image`, `price`, `stock`, `title`) values ('2026-07-28 15:11:43', 'anime ', 2, NULL, '100.00', 2, 'Princess Mononoke');
insert into `products` (`created_at`, `description`, `id`, `image`, `price`, `stock`, `title`) values ('2026-07-28 15:11:43', 'romantic comedy', 3, NULL, '80.00', 1, 'Pride and Prejudice ');
insert into `products` (`created_at`, `description`, `id`, `image`, `price`, `stock`, `title`) values ('2026-07-28 15:11:43', 'comedy-drama', 4, NULL, '80.00', 2, 'The Intouchables ');
insert into `products` (`created_at`, `description`, `id`, `image`, `price`, `stock`, `title`) values ('2026-07-28 15:11:43', 'strategy', 5, NULL, '40.00', 1, 'Rummikub');
insert into `products` (`created_at`, `description`, `id`, `image`, `price`, `stock`, `title`) values ('2026-07-28 15:11:43', 'logic', 6, NULL, '20.00', 2, 'Sudoku');


insert into `categories_products` (`category_id`, `product_id`) values (1, 1);
insert into `categories_products` (`category_id`, `product_id`) values (1, 2);
insert into `categories_products` (`category_id`, `product_id`) values (1, 3);
insert into `categories_products` (`category_id`, `product_id`) values (2, 3);
insert into `categories_products` (`category_id`, `product_id`) values (1, 4);
insert into `categories_products` (`category_id`, `product_id`) values (3, 5);
insert into `categories_products` (`category_id`, `product_id`) values (3, 6);


CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) 

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    stock INT NOT NULL DEFAULT 0,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) 

CREATE TABLE categories_products (
    category_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (category_id, product_id),
    CONSTRAINT fk_category
        FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) 