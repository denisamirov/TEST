CREATE TABLE public."Query"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    id_name smallint NOT NULL,
    id_purpose smallint NOT NULL,
    summ real NOT NULL,
    rate real NOT NULL,
    period smallint NOT NULL,
    content_to_per_data boolean NOT NULL,
    date timestamp with time zone NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Query"
    OWNER to postgres;