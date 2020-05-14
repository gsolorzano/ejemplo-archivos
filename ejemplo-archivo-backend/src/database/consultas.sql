

--- Consulta para obtener todos los proyectos 



CREATE OR REPLACE FUNCTION getprojectsall(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR select p.id_document, p.name, p.file_path, p.file_extension
from public.document p;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

