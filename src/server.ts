import { createServer } from 'http';
import { Server as StaticServer } from 'node-static';

const fileServer = new StaticServer( './public' );
const httpServer = createServer( fileServer.serve.bind( fileServer ));
const HTTP_PORT = 8080;

httpServer.listen( HTTP_PORT );
console.log( 'Listening on ' + HTTP_PORT + '...' );