-- 2.1. Количество услуг, подключенных в каждом офисе

SELECT "Offices"."id", "Offices"."address", "Offices"."filial", COUNT(*) AS "Количество услуг" FROM "getConnect" INNER JOIN 
	"Clients" ON "getConnect"."id_client" = "Clients"."id"
	INNER JOIN "getContract" ON "Clients"."id" = "getContract"."id_client"
	INNER JOIN "Agents" ON "getContract"."id_agent" = "Agents"."id"
	INNER JOIN "getAgent" ON "Agents"."id" = "getAgent"."id_agent"
	INNER JOIN "Offices" ON "getAgent"."id_department" = "Offices"."id"
	GROUP BY "Offices"."id"
	ORDER BY "Количество услуг" DESC;

-- 2.2. Количество клиентов, подключенных на 2 и более услуги по каждому офису
SELECT
    "address",
    "filial",
    "Количество подключений"
FROM (
    SELECT
        "Offices"."address",
        "Offices"."filial",
        COUNT(*) OVER (PARTITION BY "getConnect"."id_client", "Offices"."id") AS "Количество подключений",
        ROW_NUMBER() OVER (PARTITION BY "getConnect"."id_client", "Offices"."id") AS "row_num"
    FROM "getConnect"
    INNER JOIN "Clients" ON "getConnect"."id_client" = "Clients"."id"
    INNER JOIN "getContract" ON "Clients"."id" = "getContract"."id_client"
    INNER JOIN "Agents" ON "getContract"."id_agent" = "Agents"."id"
    INNER JOIN "getAgent" ON "Agents"."id" = "getAgent"."id_agent"
    INNER JOIN "Offices" ON "getAgent"."id_department" = "Offices"."id"
    INNER JOIN "Services" ON "getConnect"."id_service" = "Services"."id"
) AS subquery
WHERE "row_num" >= 2;
	
-- 3. Пример запроса, который формирует таблицу с данными по подключению и расторжению, для анализа в динамике по единому полю "Дата"
CREATE TABLE connections (
    ID INT PRIMARY KEY,
    Connection_Date DATE,
    Connection_Status VARCHAR(20)
);

INSERT INTO connections (ID, Connection_Date, Connection_Status)
VALUES 
(1, '2024-01-01', 'Connected'),
(2, '2024-01-15', 'Disconnected'),
(3, '2024-02-01', 'Connected'),
(4, '2024-02-15', 'Disconnected'),
(5, '2024-03-01', 'Connected'),
(6, '2024-03-15', 'Disconnected');