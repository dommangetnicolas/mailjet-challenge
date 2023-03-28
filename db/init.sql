CREATE TYPE ItemType AS ENUM ('PLOT', 'CARROT', 'TOMATO');

CREATE TABLE gardens (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lawns (
  id SERIAL PRIMARY KEY,
  position INT,
  garden_id INT,
  FOREIGN KEY (garden_id) REFERENCES gardens(id)
);

CREATE TABLE lawnItems (
  id SERIAL PRIMARY KEY,
  type ItemType,
  position INT,
  lawn_id INT,
  FOREIGN KEY (lawn_id) REFERENCES lawns(id)
);