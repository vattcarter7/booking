-- ** DATABASE SCHEMAS AND TABLES

-- CREATE TABLE user
CREATE TABLE users (
  id                        SERIAL PRIMARY KEY,
  email                     TEXT UNIQUE NOT NULL check (email ~* '^.+@.+\..+$'),
  password                  VARCHAR(128) NOT NULL,
  firstname                 VARCHAR(100) NOT NULL,
  lastname                  VARCHAR(100) NOT NULL,
  gender                    VARCHAR(10),
  user_role                 VARCHAR(50) DEFAULT 'user',
  tokens                    tsvector,
  modified_date             TIMESTAMPTZ,
  active                    BOOLEAN DEFAULT true,
  password_reset_token      VARCHAR(200),
  password_reset_expires    TIMESTAMPTZ,
  created_at                TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX users_tokens_idx ON users USING gin(tokens);

-- CREATE TABLE category
CREATE TABLE category (
  id                        SERIAL PRIMARY KEY,
  name                      TEXT UNIQUE NOT NULL,
  modified_date             TIMESTAMPTZ,
  created_at                TIMESTAMPTZ DEFAULT now()
);

-- Insert category values
INSERT INTO category (name) VALUES 
	('vegetable'),
	('meat'),
	('drink'),
	('electronic'),
	('stationery'),
	('tool'),
	('bakery'),
	('furniture'),
	('grocery');

-- CREATE TABLE product
CREATE TABLE product (
  id                        SERIAL PRIMARY KEY,
  category_id               INT REFERENCES category(id) NOT NULL,
  name                      TEXT UNIQUE NOT NULL,
  description               TEXT,
  price                     REAL NOT NULL,
  image                     TEXT,
  shipping                  BOOLEAN DEFAULT true,
  number_in_stock           INT NOT NULL,
  available                 BOOLEAN DEFAULT true,
  published                 BOOLEAN DEFAULT false,
  tokens                    tsvector,
  modified_date             TIMESTAMPTZ,
  created_at                TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX product_tokens_idx ON product USING gin(tokens);
CREATE INDEX product_category_id_idx ON product(category_id);

-- insert product values
INSERT INTO product 
( category_id, 
  name,
  description, 
  price, 
  image, 
  shipping, 
  number_in_stock, 
  available, 
  tokens, 
  modified_date, 
  created_at
) VALUES 
-- vegetables
(1, 'cucumber - 200g', 'local cucumber with fresh harvest in the village.', 2, 'https://images.unsplash.com/photo-1568584711271-6c929fb49b60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80', true, 30, true, NULL, NULL, '2020-08-27 15:06:32.848+07'),
(1, 'broccoli - 150g', 'local broccoli with fresh harvest in the town .', 1.8, 'https://images.unsplash.com/photo-1461840749711-ef8d1b5726cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80', true, 15, true, NULL, NULL, '2020-08-27 15:06:33.848+07'),
(1, 'cauliflower - 80g', 'local cauliflower in the rain forest .', 3, 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80', true, 35, true, NULL, NULL, '2020-08-27 15:06:34.848+07'),
(1, 'cabbage - 280g', 'best cabbage in this village .', 8, 'https://images.unsplash.com/photo-1578208895671-29d47f61294e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', true, 20, true, NULL, NULL, '2020-08-27 15:06:35.848+07'),
-- meat
(2, 'beef - 250g', 'best local beef in this village.', 4, 'https://images.unsplash.com/photo-1551006839-2055edb67ff4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', true, 40, true, NULL, NULL, '2020-08-27 15:07:35.848+07'),
(2, 'bacon - 1000g', 'fresh pork in this mart', 25, 'https://images.unsplash.com/photo-1579636858754-c1048da9c361?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80', true, 16, true, NULL, NULL, '2020-08-27 15:08:39.848+07'),
(2, 'sausages - 800g', 'best sausages.', 9, 'https://images.unsplash.com/photo-1565630067827-a810d1ebf177?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', true, 29, true,  NULL, NULL, '2020-08-27 15:08:49.848+07'),
(2, 'chicken grilled - 500g', 'kfc approved for local.', 10, 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1226&q=80', true, 19, true, NULL, NULL, '2020-08-27 15:08:39.850+07'),
-- drink
(3, 'cocacola', 'so thirsty coca drink', 1.5, 'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80', true, 250, true, NULL, NULL, '2020-08-27 15:08:39.852+07'),
(3, 'heineken', 'do not drink if you drive', 3, 'https://images.unsplash.com/photo-1596572116586-ad2fc0647fce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80', true, 400, true, NULL, NULL, '2020-08-27 15:08:39.853+07'),
(3, 'pepsi', 'Your best drink', 1.5, 'https://images.unsplash.com/photo-1592438893289-17ff749c3860?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', true, 540, true, NULL, NULL, '2020-08-27 16:08:39.854+07'),
(3, 'milk', 'drink milk every day, you will get taller', 3.5, 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80', true, 120, true, NULL, NULL, '2020-08-27 16:08:40.864+07'),
-- electronic
(4, 'bulb', 'enlight your house', 5, 'https://images.unsplash.com/photo-1503146556350-2571318acceb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', true, 80, true, NULL, NULL, '2020-08-28 16:08:40.864+07'),
(4, 'nintendo switch', 'enjoy your day everywhere.', 399, 'https://images.unsplash.com/photo-1585857189141-003ab7bbbe10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', true, 47, true, NULL, NULL, '2020-08-28 17:08:40.864+07'),
(4, 'macbook pro', 'one of the best computer for your work', 1399, 'https://images.unsplash.com/photo-1485813727108-9b009dfab116?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80', true, 28, true, NULL, NULL, '2020-08-28 17:09:40.864+07'),
(4, 'television', 'the best mate in your house', 1599, 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', true, 58, true, NULL, NULL, '2020-08-28 17:10:40.864+07'),
-- stationery
(5, 'pencil - 12 colours', 'draw your imagination', 4, 'https://images.unsplash.com/photo-1522111608460-19e7331e00fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', true, 10, true, NULL, NULL, '2020-08-28 17:11:40.864+07'),
(5, 'pen', 'get real with an ancient pen. only one in the world', 199, 'https://images.unsplash.com/photo-1518674660708-0e2c0473e68e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', true, 1, true, NULL, NULL, '2020-08-28 17:12:40.864+07'),
(5, 'comic book', 'have fun with comic book in our store', 9, 'https://images.unsplash.com/photo-1518674660708-0e2c0473e68e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80', true, 100, true, NULL, NULL, '2020-08-28 18:12:40.864+07'),
(5, 'school bag', 'long lasting school bag', 25, 'https://images.unsplash.com/photo-1472717400230-1c592a3179d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', true, 200, true, NULL, NULL, '2020-08-28 18:12:40.865+07'),
-- tool
(6, 'hammer', 'one of the hardest hammer in your house', 20, 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', true, 20, true, NULL, NULL, '2020-08-28 18:13:40.865+07'),
(6, 'knife', 'one of the hardest knife in your house', 12, 'https://images.unsplash.com/photo-1588916197923-3f758d7c3568?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80', true, 10, true, NULL, NULL, '2020-08-28 18:14:40.865+07'),
(6, 'scissors', 'trim your hair', 7, 'https://images.unsplash.com/photo-1589357708292-1f54adca149c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', true, 13, true, NULL, NULL, '2020-08-28 18:14:41.865+07'),
(6, 'spoons', 'family spoons - 3 big and 3 small', 12, 'https://images.unsplash.com/photo-1591872203534-278fc084969e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1259&q=80', true, 19, true, NULL, NULL, '2020-08-28 18:15:41.865+07'),
-- bakery
(7, 'cookies', 'family cookies set baked by the best in our store', 3, 'https://images.unsplash.com/photo-1560910615-9eaa2e704e63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1225&q=80', true, 39, true, NULL, NULL, '2020-08-28 18:15:42.865+07'),
(7, 'cake - vanilla cake', 'family cake reunion or birthday', 17, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=80', true, 10, true, NULL, NULL, '2020-08-28 18:15:43.865+07'),
(7, 'smile cake', 'funny family cake reunion or birthday brings you the happiness', 14, 'https://images.unsplash.com/photo-1557979619-445218f326b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', true, 12, true, NULL, NULL, '2020-08-28 18:16:43.865+07'),
(7, 'colourful cake', 'cake with variety of colours brings all the best of you', 9, 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1098&q=80', true, 9, true, NULL, NULL, '2020-08-28 18:16:44.865+07'),
-- furniture
(8, 'orange chair', 'comfortable chair in your place', 10, 'https://images.unsplash.com/photo-1561677978-583a8c7a4b43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', true, 19, true, NULL, NULL, '2020-08-28 18:17:44.865+07'),
(8, 'pink chair', 'pink chair suitable for girls', 20, 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', true, 10, true, NULL, NULL, '2020-08-28 18:17:45.865+07'),
(8, 'couple chairs with table', 'one set of 1 table and 2 chairs suitable for couple', 60, 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80', true, 18, true, NULL, NULL, '2020-08-28 18:18:45.865+07'),
(8, 'gaming chair', 'get the bright red chair for your gaming', 120, 'https://images.unsplash.com/photo-1596079890775-20e5099dc924?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1303&q=80', true, 100, true, NULL, NULL, '2020-08-28 18:19:45.865+07'),
-- grocery
(9, 'salt - 100g', 'get your salty taste in your kitchen', 0.5, 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', true, 100, true,NULL, NULL, '2020-08-28 18:19:45.865+07'),
(9, 'sugar - 100g', 'get your sweet taste in your kitchen', 0.6, 'https://images.unsplash.com/photo-1562245376-3f9dae9f0e73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', true, 200, true, NULL, NULL, '2020-08-28 18:19:46.865+07'),
(9, 'chili - 100g', 'get your sweet taste in your kitchen', 1.2, 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80', true, 80, true, NULL, NULL, '2020-08-28 18:19:47.865+07'),
(9, 'mustard', 'get your mustard in your kitchen', 4, 'https://images.unsplash.com/photo-1528750717929-32abb73d3bd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', true, 10, true, NULL, NULL, '2020-08-28 18:19:48.865+07');

-- CREATE TABLE cart_item
CREATE TABLE cart_item (
  id                        SERIAL PRIMARY KEY,
  product_id                INT REFERENCES product(id) NOT NULL,
  user_id                   INT REFERENCES users(id) NOT NULL,
  quantity                  INT NOT NULL DEFAULT 0,
  modified_date             TIMESTAMPTZ,
  created_at                TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX cart_item_product_id_idx ON cart_item(product_id);
CREATE INDEX cart_item_user_id_idx ON cart_item(user_id);