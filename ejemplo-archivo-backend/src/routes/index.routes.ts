import File from './files.routes';
import Request from './request.routes';

/**
 * 
 * @param app variable que contiene la aplicacion de express
 * 
 * funcion que agrega todas las rutas a la app de express
 */
export function addRoutes(app: any) {
    app.use('/file',File);
    app.use('/project',  Request);
}

