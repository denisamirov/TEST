CREATE TABLE public."Offices"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    address character varying(100) NOT NULL,
    filial character varying(100) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Departments"
    OWNER to postgres;



CREATE TABLE public."getAgent"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    id_agent integer NOT NULL,
    id_department smallint NOT NULL,
    PRIMARY KEY (id_agent)
);

ALTER TABLE IF EXISTS public."getAgent"
    OWNER to postgres;



CREATE TABLE public."Agents"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name character varying(100) NOT NULL,
    department character varying(100) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Agents"
    OWNER to postgres;



CREATE TABLE public."getContract"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    id_client integer NOT NULL,
    id_agent integer NOT NULL,
    PRIMARY KEY (id_client, id)
);

ALTER TABLE IF EXISTS public."getContract"
    OWNER to postgres;



CREATE TABLE public."Clients"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    city character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    birthday date NOT NULL,
    gender character(1) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Clients"
    OWNER to postgres;



CREATE TABLE public."getConnect"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    id_client integer NOT NULL,
    id_service integer NOT NULL,
    PRIMARY KEY (id_client)
);

ALTER TABLE IF EXISTS public."getConnect"
    OWNER to postgres;



CREATE TABLE public."Services"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name character varying(100) NOT NULL,
    date_connect date NOT NULL,
    date_disconnect date,
    tariff character varying(50) NOT NULL,
    value smallint NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Services"
    OWNER to postgres;