CREATE TABLE order_product(
    id SERIAL PRIMARY KEY,
     quantity integer,
      order_id bigint REFERENCES orders(id),
       products_id bigint REFERENCES product(id)
       );