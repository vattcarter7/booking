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
  images                    TEXT[] NOT NULL,
  shipping                  BOOLEAN DEFAULT true,
  number_in_stock           INT NOT NULL,
  available                 BOOLEAN DEFAULT true,
  sold                      INT DEFAULT 0,
  published                 BOOLEAN DEFAULT false,
  tokens                    tsvector,
  modified_date             TIMESTAMPTZ,
  created_at                TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX product_tokens_idx ON product USING gin(tokens);
CREATE INDEX product_category_id_idx ON product(category_id);
