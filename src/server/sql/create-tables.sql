DROP EXTENSION IF EXISTS postgis CASCADE;
CREATE EXTENSION postgis;

DROP TABLE IF EXISTS image CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS auth_token CASCADE;
DROP TABLE IF EXISTS tag CASCADE;
DROP TABLE IF EXISTS image__user CASCADE;
DROP TABLE IF EXISTS image__tag CASCADE;

CREATE TABLE image (
	id SERIAL PRIMARY KEY,
	upload_date TIMESTAMP WITH TIME ZONE,
	hash TEXT UNIQUE,
	mimetype TEXT,
	ocr TEXT,
	coordinates GEOGRAPHY(POINT,4326)
);

CREATE TABLE "user" (
	id SERIAL PRIMARY KEY,
	email_address TEXT UNIQUE,
	hash TEXT,
	registration_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE auth_token (
	token TEXT PRIMARY KEY,
	user_id SERIAL,
	creation_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE tag (
	id SERIAL PRIMARY KEY,
	name TEXT UNIQUE
);

CREATE TABLE image__user (
	image_id SERIAL,
	user_id SERIAL,
	creation_date TIMESTAMP WITH TIME ZONE,
	PRIMARY KEY (image_id, user_id)
);

CREATE TABLE image__tag (
	image_id SERIAL,
	tag_id SERIAL,
	PRIMARY KEY (image_id, tag_id)
);

INSERT INTO tag (name) VALUES ('anne-dak');
INSERT INTO tag (name) VALUES ('annie-mg-schmidt');

INSERT INTO "user" (email_address, hash, registration_date) VALUES (
	'agijsbro@gmail.com',
	'$2a$10$z269rNN45r1LBQfI5R9MReaKkdAyFhreLvChHyBysue5BUen19P1C',
	CURRENT_TIMESTAMP
);
