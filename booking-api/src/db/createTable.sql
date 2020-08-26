-- ** DATABASE SCHEMAS AND TABLES

-- CREATE TABLE users
CREATE TABLE users(
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