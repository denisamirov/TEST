-- Самые популярные продукты за текущий год
SELECT COUNT(*) AS "count", "QueryName"."name" FROM "Query" 
	JOIN "QueryName" ON "Query"."id_name" = "QueryName"."id"
		WHERE date_part('year', "date") = date_part('year', CURRENT_DATE)
			GROUP BY "QueryName"."name"
		ORDER BY "count" DESC
	LIMIT 1;
	