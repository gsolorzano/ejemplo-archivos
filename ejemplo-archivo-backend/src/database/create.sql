DROP FUNCTION IF EXISTS public.insertdocumet;
DROP TABLE IF EXISTS public.document;

create table public.document(
    id_document SERIAL PRIMARY KEY,
    name varchar(400),
    file_path varchar(500),
    file_extension varchar(100)
);

CREATE OR REPLACE FUNCTION insertdocumet(n VARCHAR(30), fp VARCHAR(200), fe VARCHAR(30)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.document (name, file_path, file_extension) VALUES (n,fp,fe);
END;
$$ LANGUAGE plpgsql;