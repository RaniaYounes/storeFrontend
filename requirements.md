## Data Shapes

#### Product

- id
- name
- price

#### User

- id
- name
- email
- password

#### Orders

- id
- user_id
- status of order (pending or complete)

#### Product Orders

- id
- order_id
- product_id
- quantity

## Data Schema

#### Product

- id SERIAL PRIMARY KEY,
- name VARCHAR(50),
- price INTEGER

#### User

- id SERIAL PRIMARY KEY,
- name VARCHAR(50),
- email VARCHAR(50),
- password VARCHAR

#### Orders

- id SERIAL PRIMARY KEY,
- status VARCHAR(100),
- user_id bigint REFERENCES users(id)

### order_products

- id SERIAL PRIMARY KEY,
- quantity integer,
- order_id bigint REFERENCES orders(id),
- product_id bigint REFERENCES products(id)

## Endpoints
homepage
localhost:3000

## Users

- GET: localhost:3000/users - Return all users (Requires Token)
- GET: localhost:3000/users/1 - Return user by id (Requires Token)
- POST:localhost:3000 /users - Creates user (Requires Token)
- DELETE: localhost:3000/users - Deletes user (Requires Token)
- PUT: localhost:3000/users - Updates user (Requires Token)

## Products

- GET: localhost:3000/products - Return all products
- GET: localhost:3000/products/1 - Return product by product id
- POST: localhost:3000/products - Creates product (Requires Token)
- DELETE: localhost:3000/products - Deletes product (Requires Token)
- PUT: localhost:3000/products - Updates product (Requires Token)

## Orders

- GET: localhost:3000/orders - Return all orders (Requires Token)
- GET: localhost:3000/orders/1 - Return order by id (Requires Token)
- GET: localhost:3000/orders/user/1 - Return orders by user id (Requires Token)
- POST: localhost:3000/orders - Creates order (Requires Token)
- DELETE: localhost:3000/orders - Deletes order (Requires Token)
- PUT: localhost:3000/orders - Updates order (Requires Token)
- POST: localhost:3000/orders/product - Creates Product order (Requires Token)
- DELETE: localhost:3000/orders/product - Deletes Product order (Requires Token)
