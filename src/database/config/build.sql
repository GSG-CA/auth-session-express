BEGIN;

DROP TABLE IF EXISTS appuser CASCADE;

CREATE TABLE appuser (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL
);

INSERT INTO appuser
	(name, password)
VALUES
	('lina', '123456'),
	('user', '123456'),
	('raghad', '123456')
;

COMMIT;