<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */

require '../PHP/clases/AccesoDatos.php';
require '../PHP/clases/usuario.php';
require '../vendor/autoload.php';
/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

$c = $app->getContainer();
$c['errorHandler'] = function ($c) {
    return function ($request, $response, $exception) use ($c) {
        return $c['response']->withStatus(500)
                             ->withHeader('Content-Type', 'text/html')
                             ->write('Something went wrong!');
    };
  };




/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

$app->get('/hello[/{name}]', function ($request, $response, $args) {
    $response->write("Hello, " . $args['name']);
    return $response;
})->setArgument('name', 'World!');


$app->get('/usuarios[/]', function ($request, $response, $args) {
	
	$listado = usuario::TraerTodosLosUsuarios();
	return json_encode($listado);
	var_dump($listado);
   
});

$app->get('/usuarios/{id}', function ($request, $response, $args) {
	
	$user = usuario::TraerUnUsuario($args['id']);
    return json_encode($user);
	var_dump($user);
});

$app->delete('/usuarios/{id}', function ($request, $response, $args) {
	
	$listado=usuario::BorrarUsuario($args['id']);
   $response->write(json_decode($listado)); 
    return $response;
});

$app->post('/usuarios', function ($request,$args) {
	echo "estoy en index alta php";
	$datos=json_decode($request->getBody());

	var_dump($datos);
	usuario::InsertarUsuario($datos);
});

$app->put('/usuarios',function($request){
	echo "estoy index modificar.php";
	$unsuario=json_decode($request->getBody());
	//$unUsuario->id_usuario=$id;
	usuario::ModificarUsuario($unsuario);
	
	var_dump($unusuario);

});

$app->run();
