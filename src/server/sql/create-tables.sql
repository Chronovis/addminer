DROP TABLE IF EXISTS image CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS tag CASCADE;
DROP TABLE IF EXISTS image__user CASCADE;
DROP TABLE IF EXISTS image__tag CASCADE;

CREATE TABLE image (
	id SERIAL PRIMARY KEY,
	date TIMESTAMP WITH TIME ZONE,
	basename TEXT,
	mimetype TEXT,
	ocr TEXT,
	coordinates GEOGRAPHY(POINT,4326)
);

CREATE TABLE "user" (
	id SERIAL PRIMARY KEY,
  email_address TEXT UNIQUE,
	password TEXT,
	registration_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE tag (
	id SERIAL PRIMARY KEY,
	name TEXT UNIQUE
);

CREATE TABLE image__user (
	image_id SERIAL,
	user_id SERIAL,
	PRIMARY KEY (image_id, user_id)
);

CREATE TABLE image__tag (
	image_id SERIAL,
	tag_id SERIAL,
	PRIMARY KEY (image_id, tag_id)
);

INSERT INTO tag (name) VALUES ('anne-dak');
INSERT INTO tag (name) VALUES ('annie-mg-schmidt');

INSERT INTO "user" (email_address, password, registration_date) VALUES (
	'agijsbro@gmail.com',
	'pww',
	CURRENT_TIMESTAMP
);
