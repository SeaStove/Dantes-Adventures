DROP TABLE IF EXISTS DA.inferno CASCADE;
DROP TABLE IF EXISTS DA.purgatario CASCADE;
DROP TABLE IF EXISTS DA.paradiso CASCADE;
DROP TABLE IF EXISTS DA.user_info CASCADE;
DROP TABLE IF EXISTS DA.authentication CASCADE;

DROP SCHEMA IF EXISTS DA;

CREATE SCHEMA DA;

CREATE TABLE DA.user_info (
	username 		VARCHAR(30) PRIMARY KEY,
	registration_date 	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	description 		VARCHAR(500)
);

CREATE TABLE DA.authentication (
	username 	VARCHAR(30) PRIMARY KEY,
	password_hash 	CHAR(40) NOT NULL,
	salt 		CHAR(40) NOT NULL,
	FOREIGN KEY (username) REFERENCES DA.user_info(username)
);

/*create a table for each seperate level*/
CREATE TABLE DA.inferno (
	username 	VARCHAR(30),
	score 		int NOT NULL,
	scorekey	serial PRIMARY KEY
);

CREATE TABLE DA.paradiso (
	username 	VARCHAR(30),
	score 		int NOT NULL,
	scorekey	serial PRIMARY KEY
);

CREATE TABLE DA.purgatorio (
	username 	VARCHAR(30),
	score 		int NOT NULL,
	scorekey	serial PRIMARY KEY
);
