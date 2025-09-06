CREATE TABLE tenant (
  uuid UUID PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE tenant_database_connection (
  tenant_uuid UUID PRIMARY KEY REFERENCES tenant(uuid),
  type TEXT NOT NULL CHECK (type IN ('postgresql', 'mssql')),
  host TEXT NOT NULL,
  port INT NOT NULL,
  database TEXT NOT NULL,
  schema TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);
