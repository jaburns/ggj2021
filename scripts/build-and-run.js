#!/usr/bin/env node
const sh = require( 'shelljs' );

sh.cd( __dirname + '/..' );

const run = cmd =>
{
    const code = sh.exec( cmd ).code;
    if( code !== 0 )
        process.exit( code );
};

console.log( 'Compiling...' );
run( 'tsc' );

console.log( 'Bundling...' );
run( 'rollup -c --configTest' );

console.log( 'Running...' );
run( 'node build/server.js' );