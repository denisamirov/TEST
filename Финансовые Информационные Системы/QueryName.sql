CREATE TABLE public."QueryName"
(
    id smallint NOT NULL GENERATED ALWAYS AS IDENTITY,
    name character varying(100),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."QueryName"
    OWNER to postgres;