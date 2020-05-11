DROP TABLE IF EXISTS public.document;

create table public.document(
    id_document SERIAL PRIMARY KEY,
    name varchar(50),
    file_path varchar(150),
    file_extension varchar(30)
);