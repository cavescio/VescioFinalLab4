var app = angular.module('Mistery', ['ngAnimate','ui.router','angularFileUpload', 'satellizer', 'ui.bootstrap'])



.config(function($stateProvider, $urlRouterProvider, $authProvider) {

  $authProvider.loginUrl = 'VescioFinalLab4/PHP/clases/Autentificador.php';
  $authProvider.signupUrl = 'VescioFinalLab4/PHP/clases/Autentificador.php';
  $authProvider.tokenName = 'TokenMistery';
  $authProvider.tokenPrefix = 'TM';
  $authProvider.authHeader = 'data';

  $stateProvider //si no está esta linea no toma los .state

  .state('menu', {
    url: '/menu',
    views: {
      'header': {templateUrl: 'template/header.html', controller: 'controlHeader'},
      'principal': { templateUrl: 'template/menuCarousel.html',controller: 'controlMenu' }      
    }    
  })

  .state('carousel', {
    url: '/carousel',
    views: {
      'header': {templateUrl: 'template/header.html', controller: 'controlHeader'},
      'principal': { templateUrl: 'template/menuCarousel.html',controller: 'ctrl' }      
    }    
  })  

  .state('login', {
    url: '/login',
    views: {
      'header': {templateUrl: 'template/headers.html', controller: 'controlHeader'},
      'principal': { templateUrl: 'template/login.html',controller: 'controlLogin' }
    }
  })

  .state('grillaUsuario', {
    url: '/grillaUsuario',
    views: {
      'header': {templateUrl: 'template/header.html', controller: 'controlHeader'},
      'principal': { templateUrl: 'template/grillaUsuario.html',controller: 'controlGrillaUsuario' }      
    }
  })

  .state('altaUsuario', {
    url: '/altaUsuario',
    views: {
      'header': {templateUrl: 'template/header.html', controller: 'controlHeader'},
      'principal': {templateUrl: 'template/altaUsuario.html', controller: 'controlAltaUsuario' }      
    }
  })

  .state('modificar', {
     url: '/modificar/{id}?:correo:nombre:clave:tipo:foto',
     views: {
      'header': {templateUrl: 'template/header.html', controller: 'controlHeader'},
      'principal': { templateUrl: 'template/altaUsuario.html',controller: 'controlModificacion' },      
    }
  })

  .state('grillaLocal', {
    url: '/grillaLocal',
    views: {
      'header': {templateUrl: 'template/header.html', controller: 'controlHeader'},
      'principal': { templateUrl: 'template/grillaLocales.html',controller: 'controlGrillaLocal' }      
    }
  })

  .state('altaLocal', {
    url: '/altaLocal',
    views: {
      'header': {templateUrl: 'template/header.html', controller: 'controlHeader'},
      'principal': {templateUrl: 'template/altaLocal.html', controller: 'controlAltaLocal' }      
    }
  })

  .state('modificarLocal', {
      url: '/modificarLocal/{id}?:nombre:localidad:direccion:gerente',
     views: {
      'header': {templateUrl: 'template/header.html', controller: 'controlHeader'},
      'principal': { templateUrl: 'template/altaLocal.html',controller: 'controlModificarLocal' }      
    }
  })

 

.state('grillaInforme', {
    url: '/grillaInforme',
    views: {
      'header': {templateUrl: 'template/header.html', controller: 'controlHeader'},
      'principal': {templateUrl: 'template/grillaInforme.html', controller: 'controlGrillaInforme' }      
    }
  })


.state('googleMaps', {
  url: '/googleMaps/{id}?:nombre:localidad:direccion',
  views: {
    'header': {templateUrl: 'template/header.html', controller: 'controlHeader'},
    'principal': {templateUrl: 'template/mapaGoogle.html', controller: 'controlMapa' }      
    }
  })


  .state('reporte', {
    url: '/reporte',
    views: {
      'principal': {templateUrl: 'template/menuDos.html', controller: 'controlReporte' },
      'header': {templateUrl: 'template/header.html', controller: 'controlHeader'}
    }
  })


    .state('encuesta', {
      url: '/encuesta/{id}?:nombre:localidad:direccion',
     views: {
       'principal': { templateUrl: 'template/encuesta.html',controller: 'controlEncuesta' },
     // 'principal': { templateUrl: 'template/altaLocal.html',controller: 'controlEncuesta' },
      'header': {templateUrl: 'template/header.html', controller: 'controlHeader'}
    }
  })



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});



   

app.controller('controlMenu', function($scope, $http, $auth, $state) {
  $scope.DatoTest="MENÚ";

  if($auth.isAuthenticated())
  {
     $scope.esVisible={
      admin:false,
      user:false,
      cliente:false
    }; 


    if($auth.getPayload().tipo=="administrador")
      $scope.esVisible.admin=true;
    if($auth.getPayload().tipo=="usuario")
      $scope.esVisible.user=true;
    if($auth.getPayload().tipo=="cliente")
      $scope.esVisible.cliente=true;

    
    $scope.usuario=$auth.getPayload();
    $scope.Logout=function()
    {
      $auth.logout()
      .then(function()
      {
        //console.log("estoy dentro del logout");
        $state.go("login");
      });
    };
  }
  else{$state.go("login");}

});



app.controller('controlHeader', function($scope, $http, $auth, $state) {
  
  if($auth.isAuthenticated())
  {

  $scope.usuario={};
  $scope.usuario.id = $auth.getPayload().id;
  $scope.usuario.tipo=$auth.getPayload().tipo;
  //$scope.usuario.foto=$auth.getPayload().foto;   tengo que traer la foto con otro método

  //SLIM

  $http.get('Datos/usuarios/'+ $scope.usuario.id)
  .then(function(respuesta) {       

          $scope.usuario = respuesta.data;
           

        },function errorCallback(response) {
            $scope.usuario= [];
            console.log( response);

    });

  // console.log("Estoy en el menu Superior")
  // console.log($auth.getPayload());

    //PARA HACER VISIBLES LOS BOTONES DE ACUERDO AL TIPO

    // console.log("estoy en el if is Authenticated");

    $scope.esVisible={
      admin:false,
      user:false,
      cliente:false
    }; //PARA EL NG-IF ADMIN Y CLIENTE


    if($auth.getPayload().tipo=="administrador")
      $scope.esVisible.admin=true;
    if($auth.getPayload().tipo=="usuario")
      $scope.esVisible.user=true;
    if($auth.getPayload().tipo=="cliente")
      $scope.esVisible.cliente=true;


    $scope.Logout=function()
    {
      $auth.logout()
      .then(function()
      {
        console.log("estoy dentro del logout");
        $state.go("login");
      });
    };

    $scope.GenerarGrafico=function()
    {
      // window.open('http://localhost:8080/VescioFinalLab4/PHP/clases/ejemplo2.php');
        // window.open('http://localhost:8080/VescioFinalLab4/PHP/clases/Highcharts-4.1.5/examples/pyramid/index.php');
        window.open('http://localhost:8080/VescioFinalLab4/PHP/clases/Highcharts-4.1.5/examples/line-basic/index.php');
    };
  }
  else{$state.go("login");}

});


app.controller('controlLogin', function($scope, $http, $auth, $state) {
  
  $scope.DatoTest="INICIAR SESIÓN";

  $scope.cargarCliente = function()
  {
    $scope.correo = "cliente@cliente.com";
    $scope.nombre = "cliente1";
    $scope.clave = "987";
  };  
  $scope.cargarUsuario = function()
  {
    $scope.correo = "user@user.com";
    $scope.nombre = "usuario1";
    $scope.clave = "123";
  };  
  $scope.cargarAdmin = function()
  {
    $scope.correo = "admin@admin.com";
    $scope.nombre = "admin";
    $scope.clave = "321";
  };


  if($auth.isAuthenticated())
  {
    $state.go("menu");
  }
  else
  {
    
    $scope.Login=function()
    {
      $auth.login({correo:$scope.correo, nombre:$scope.nombre, clave:$scope.clave})
      .then(function(respuesta)
      {
        console.log(respuesta);
        if($auth.isAuthenticated())
        {
          console.info($auth.isAuthenticated(), $auth.getPayload());
          $state.go("menu");
        }
        else
        {
          alert("No se encontró el usuario. Verifique los datos.");
        }
      });
    };
    $scope.CargarFormulario=function()
    {
      $state.go("altaUser");
    };
  }
});


app.controller('controlGrillaUsuario', function($scope, $http, $location, $state, FactoryUsuario, $auth) {

  if($auth.isAuthenticated())
  {
      $scope.DatoTest="GRILLA USUARIO";


          $scope.guardar = function(usuario){

          console.log( JSON.stringify(usuario));
            $state.go("modificarUsuario, {usuario:" + JSON.stringify(usuario)  + "}");
          }

          FactoryUsuario.mostrarNombre("otro").then(function(respuesta){

          $scope.ListadoUsuarios=respuesta;

           
          });


            // $http.get('Datos/usuarios')
            // .then(function(respuesta) {       

            //         $scope.ListadoUsuarioa = respuesta.data;
            //          console.log(respuesta.data);

            //       },function errorCallback(response) {
            //           $scope.ListadoUsuarioa= [];
            //           console.log( response);

            //     });
           
            // $http.get('PHP/nexo.php', { params: {accion :"traer"}})
            // .then(function(respuesta) {       

            //        $scope.ListadoUsuarios = respuesta.data.listado;
            //        console.log(respuesta.data);

            //   },function errorCallback(response) {
            //        $scope.ListadoUsuarios= [];
            //       console.log( response);     
            //  });

            $scope.Borrar=function(usuario){
              if(confirm("¿Desea eliminar el usuario seleccionado?"))
              //console.log("borrar"+usuario);
              $http.post("PHP/nexo.php",{datos:{accion :"borrar",usuario:usuario}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                   .then(function(respuesta) {       
                           //aca se ejetuca si retorno sin errores        
                           console.log(respuesta.data);
                              $http.get('PHP/nexo.php', { params: {accion :"traer"}})
                              .then(function(respuesta) {       

                                     $scope.ListadoUsuarios = respuesta.data.listado;
                                     console.log(respuesta.data);

                                },function errorCallback(response) {
                                     $scope.ListadoUsuarios= [];
                                    console.log( response);
                                    
                               });

                    },function errorCallback(response) {        
                        //aca se ejecuta cuando hay errores
                        console.log( response);           
                });
            }// $scope.Borrar

            }
  else
    $state.go("login");
    
});                                     


app.controller('controlAltaUsuario', function($scope, $http ,$state, FileUploader, cargadoDeFoto, $auth) {

  if($auth.isAuthenticated())
  {
        $scope.DatoTest="ALTA USUARIO";

        $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
        $scope.uploader.queueLimit = 1;

      //inicio las variables
        $scope.usuario={};
        $scope.usuario.correo= "pepe@pepe.com" ;
        $scope.usuario.nombre= "pepe" ;
        $scope.usuario.clave= "9876" ;
        $scope.usuario.tipo= "usuario" ;
        $scope.usuario.foto="pordefecto.png";
        
        cargadoDeFoto.CargarFoto($scope.usuario.foto,$scope.uploader);
       

        $scope.Guardar=function(){
        console.log($scope.uploader.queue);
        //debugger;
        if($scope.uploader.queue[0].file.name!='pordefecto.png')
        {
          var nombreFoto = $scope.uploader.queue[0]._file.name;
          $scope.usuario.foto=nombreFoto;
        }
        $scope.uploader.uploadAll();
          console.log("usuario a guardar:");
          console.log($scope.usuario);
        }

         $scope.uploader.onSuccessItem=function(item, response, status, headers)
        {
          //alert($scope.persona.foto);
            $http.post('PHP/nexo.php', { datos: {accion :"insertar",usuario:$scope.usuario}})
              .then(function(respuesta) {       
                 //aca se ejetuca si retorno sin errores        
               console.log(respuesta.data);
               $state.go("grillaUsuario");

            },function errorCallback(response) {        
                //aca se ejecuta cuando hay errores
                console.log( response);           
              });
          console.info("Ya guardé el archivo.", item, response, status, headers);
        };
        }
  else{
        $state.go("login");
  }  

});



app.controller('controlModificacion', function($scope, $http, $state, $stateParams, FileUploader, $auth, cargadoDeFoto)
{

  if($auth.isAuthenticated())
  {
      $scope.usuario={};
  $scope.DatoTest="MODIFICAR DATOS";
  // $scope.uploader = new FileUploader({url: 'Datos/index.php'});
  $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});  
  $scope.uploader.queueLimit = 1;
  $scope.usuario.id=$stateParams.id;
  $scope.usuario.correo=$stateParams.correo;
  $scope.usuario.nombre=$stateParams.nombre;
  $scope.usuario.clave=$stateParams.clave;
  $scope.usuario.tipo=$stateParams.tipo;
  $scope.usuario.foto=$stateParams.foto;


  $scope.cargarfoto=function(nombrefoto){
      var direccion="imagenes/"+nombrefoto;
      console.info(direccion);  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem($scope.uploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              $scope.uploader.queue.push(dummy);
         });
  }
  $scope.cargarfoto($scope.usuario.foto);


  $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    $http.post('PHP/nexo.php', { datos: {accion :"modificar",usuario:$scope.usuario}})
        .then(function(respuesta) 
        {
          //aca se ejetuca si retorno sin errores       
          console.log(respuesta.data);
          $state.go("grillaUsuario");
        },
        function errorCallback(response)
        {
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
    console.info("Ya guardé el archivo.", item, response, status, headers);
  };


  $scope.Guardar=function(usuario)
  {
    if($scope.uploader.queue[0].file.name!='pordefecto.png')
    {
      var nombreFoto = $scope.uploader.queue[0]._file.name;
      $scope.usuario.foto=nombreFoto;
    }
    $scope.uploader.uploadAll();
  }
  }
  else{
      $state.go("login");
  }
  
});


app.controller('controlGrillaLocal', function($scope, $http, $state, $auth, FactoryLocal) {

  if($auth.isAuthenticated())
  {
    $scope.DatoTest="GRILLA LOCALES";

    //PARA HACER VISIBLES LOS BOTONES DE ACUERDO AL TIPO
    $scope.esVisible={
      adminClient: false,
      admin: false,
      cliente: false,
      user: false
    }; //PARA EL NG-IF


    if($auth.getPayload().tipo=="administrador" || $auth.getPayload().tipo=="cliente")
    {
      console.info("estoy en if, tipo: " + $auth.getPayload().tipo);
      $scope.esVisible.adminClient = true;

      if ($auth.getPayload().tipo=="administrador") 
      {
        $scope.esVisible.admin=true;
      }
      else
        $scope.esVisible.cliente=true;
    }
    else
    {
      console.info("estoy en else, tipo: " + $auth.getPayload().tipo);
      $scope.esVisible.user=true;
    }


    FactoryLocal.mostrarNombre("otro").then(function(respuesta){

     $scope.ListadoLocales=respuesta;
 
   });
    //$scope.Listadopersonas =factory.fu();
    //$http.get('PHP/nexo.php', { params: {accion :"traer"}})
      $scope.Borrar=function(id) {

      console.log("borrar"+id);

      $http.delete('Datos/locales/'+id)
     .then(function(respuesta) {      
             //aca se ejetuca si retorno sin errores        
             console.log(respuesta.data);

            $http.get('Datos/locales')
            .then(function(respuesta) {       

                   $scope.ListadoLocales = respuesta.data;
                   console.log(respuesta.data);

              },function errorCallback(response) {
                   $scope.ListadoLocales= [];
                  console.log( response);

      });

        },function errorCallback(response) {        
            //aca se ejecuta cuando hay errores
            console.log( response);           
        })

  }

  }else{$state.go("login");}

});


app.controller('controlAltaLocal', function($scope, $http ,$state,  $auth, FileUploader) {

  if($auth.isAuthenticated())
  {
    $scope.DatoTest="ALTA ENCUESTA";

    // $scope.uploader = new FileUploader({url: 'PHP/nexoLocal.php'});

        $scope.esVisible={
        admin:false,
        user:false,
        cliente:false
        };


    if($auth.getPayload().tipo=="administrador")
      $scope.esVisible.admin=true;
    if($auth.getPayload().tipo=="usuario")
      $scope.esVisible.user=true;
    if($auth.getPayload().tipo=="cliente")
      $scope.esVisible.cliente=true;


          $scope.local={
            nombre:"Farmacity",
            localidad:"Quilmes",
            direccion:"Av Rivadavía 49",
            gerente:"Andrea Bochi",
          };

          $scope.Guardar=function(){


              ///////////////////SLIM/////////////
              $http.post('Datos/locales',$scope.local)
                          .then(function(respuesta) {       
                               //aca se ejetuca si retorno sin errores        
                               console.log(respuesta.data);
                               $state.go("grillaLocal");

                          },function errorCallback(response) {        
                              //aca se ejecuta cuando hay errores
                              console.log( response);           
                          });

              // $scope.uploader.onSuccessItem=function(item, response, status, headers)
              // {
              //alert($scope.persona.foto);
                // $http.post('PHP/nexoLocal.php', { datos: {accion :"insertar",local:$scope.local}})
                //   .then(function(respuesta) {       
                //      //aca se ejetuca si retorno sin errores        
                //    console.log(respuesta.data);
                //    $state.go("encuestas");

                // },function errorCallback(response) {        
                //     //aca se ejecuta cuando hay errores
                //     console.log( response);           
                //   });
              //console.info("Ya guardé el archivo.", item, response, status, headers);
             //};

         }

  }else{$state.go("login");}

});


app.controller('controlModificarLocal', function($scope, $http, $state, $auth, FileUploader, $stateParams) {

  if($auth.isAuthenticated())
  {
  $scope.local={};
  $scope.DatoTest="MODIFICAR LOCAL";
  $scope.uploader = new FileUploader({url: 'PHP/nexoLocal.php'});
  $scope.uploader.queueLimit = 1;
  $scope.local.id=$stateParams.id;
  $scope.local.nombre=$stateParams.nombre;
  $scope.local.localidad=$stateParams.localidad;
  $scope.local.direccion=$stateParams.direccion;
  $scope.local.gerente=$stateParams.gerente;


  $scope.esVisible={
      admin:false,
      user:false,
      cliente:false
    }; 


    if($auth.getPayload().tipo=="administrador")
      $scope.esVisible.admin=true;
    if($auth.getPayload().tipo=="usuario")
      $scope.esVisible.user=true;
    if($auth.getPayload().tipo=="cliente")
      $scope.esVisible.cliente=true;

  $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    $http.post('PHP/nexoLocal.php', { datos: {accion :"modificar",local:$scope.local}})
        .then(function(respuesta) 
        {
          //aca se ejetuca si retorno sin errores       
          console.log(respuesta.data);
          $state.go("grillaLocales");
        },
        function errorCallback(response)
        {
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
    console.info("Ya guardé el archivo.", item, response, status, headers);
  };

  $scope.Guardar=function(local)
  {

    $http.put('Datos/locales',$scope.local)
    .then(function(respuesta) {       
    //aca se ejetuca si retorno sin errores        
    console.log(respuesta.data);
    $state.go("grillaLocal");

    },function errorCallback(response) {        
     //aca se ejecuta cuando hay errores
    console.log( response);           
    });
    
    }

  }
  else{
    $state.go("login");
  }
  
});


app.controller('controlGrillaInforme', function($scope, $http, $state, $auth, FactoryInforme) {

  if($auth.isAuthenticated())
  {
    $scope.DatoTest="INFORMES";

    $scope.esVisible={
      admin:false,
      user:false,
      cliente:false
    };


    if($auth.getPayload().tipo=="administrador")
      $scope.esVisible.admin=true;
    if($auth.getPayload().tipo=="usuario")
      $scope.esVisible.user=true;
    if($auth.getPayload().tipo=="cliente")
      $scope.esVisible.cliente=true;


    FactoryInforme.mostrarNombre("otro").then(function(respuesta){

     $scope.ListadoInformes=respuesta;
 
   });
    //$scope.Listadopersonas =factory.fu();
    //$http.get('PHP/nexo.php', { params: {accion :"traer"}})
      $scope.Borrar=function(id) {

      console.log("borrar"+id);

      $http.delete('Datos/informes/'+id)
     .then(function(respuesta) {      
             //aca se ejetuca si retorno sin errores        
             console.log(respuesta.data);

            $http.get('Datos/informes')
            .then(function(respuesta) {       

                   $scope.ListadoInformes = respuesta.data;
                   console.log(respuesta.data);

              },function errorCallback(response) {
                   $scope.ListadoInformes= [];
                  console.log( response);

      });

        },function errorCallback(response) {        
            //aca se ejecuta cuando hay errores
            console.log( response);           
        });
  }

  }else{$state.go("login");}

});



// CONTROL MAPA
app.controller('controlMapa', function($scope, $auth, Map){

  if($auth.isAuthenticated())
  {
    console.log("estoy en el controlMap");
    
    Map.init();
  }
  else{
    $state.go("login");
  }

});


// CONTROL REPORTES
app.controller('controlReporte', function($scope, $http, $auth, $state, FactoryUsuario)
{
  if($auth.isAuthenticated())
  {
    // console.info($auth.isAuthenticated(), $auth.getPayload());
    // $scope.DatoTest="**Menu**";
    // $scope.usuario=$auth.getPayload();
    // $scope.nombreUs=$auth.getPayload().nombre;
    // console.log("Usuario Logueado: "+$scope.nombreUs);

    $scope.GenerarGrafico=function()
    {
      // window.open('http://localhost:8080/VescioFinalLab4/PHP/clases/ejemplo2.php');
        // window.open('http://localhost:8080/VescioFinalLab4/PHP/clases/Highcharts-4.1.5/examples/pyramid/index.php');
        window.open('http://localhost:8080/VescioFinalLab4/PHP/clases/Highcharts-4.1.5/examples/line-basic/index.php');
    };

    $scope.GenerarPdfsu=function()
    {
      window.open('http://localhost:8080/tigerush/PHP/plantillapdf2.php');
    };
    $scope.GenerarExcelsu=function()
    {//OK
      window.open('http://localhost:8080/tigerush/PHP/rep_excel.php');
    };

    $scope.GenerarPdfin=function()
    {//OK
      window.open('http://localhost:8080/tigerush/PHP/plantillapdf.php');
    };
    $scope.GenerarExcelin=function()
    {
      window.open('http://localhost:8080/tigerush/PHP/rep_excel2.php');
    };


  }
  else
  {
    $state.go("login");
  }
});


app.controller('controlEncuesta', function($scope, $http ,$state,  $auth, FileUploader, $stateParams) {

  if($auth.isAuthenticated())
  {

    $scope.DatoTest="COMPLETANDO ENCUESTA";

    $scope.DatoTest="INFORMES";

    $scope.esVisible={
      admin:false,
      user:false,
      cliente:false
    };


    if($auth.getPayload().tipo=="administrador")
      $scope.esVisible.admin=true;
    if($auth.getPayload().tipo=="usuario")
      $scope.esVisible.user=true;
    if($auth.getPayload().tipo=="cliente")
      $scope.esVisible.cliente=true;


    $scope.uploader = new FileUploader({url: 'PHP/nexoLocal.php'});
    $scope.uploader.queueLimit = 1;

    $scope.datos={
      id: $stateParams.id
    }
    

    $scope.local={};
    //$scope.local.id=$stateParams.id;
    $scope.local.nombre=$stateParams.nombre;
    $scope.local.localidad=$stateParams.localidad;
    $scope.local.direccion=$stateParams.direccion;
    $scope.local.empleado=$auth.getPayload().nombre;
    $scope.local.puno=null;
    $scope.local.pdos=null;
    $scope.local.ptres=null;
    $scope.local.pcuatro=null;
    $scope.local.porcentaje=null;

    //fecha actual
    $scope.local.fecha=new Date();

    var dd = $scope.local.fecha.getDate();
    var mm = $scope.local.fecha.getMonth()+1; //Enero es 0!
    
    var yyyy = $scope.local.fecha.getFullYear();
    
    $scope.local.fecha= dd+'/'+mm+'/'+yyyy;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

        // var yyyy = today.getFullYear();
        // if(dd<10){
        //     dd='0'+dd
        // } 
        // if(mm<10){
        //     mm='0'+mm
        // } 
        // var today = dd+'/'+mm+'/'+yyyy;
        // document.getElementById("DATE").value = today;



          //tengo que traer los datos

          $scope.Guardar=function(){

            console.log("borrar :" + $scope.datos.id);

            if ($scope.local.puno!=null && $scope.local.pdos!=null && $scope.local.ptres!=null && $scope.local.pcuatro!=null && $scope.local.empleado!=null) 
            {

              if (confirm("¿Seguro que desea guardar los datos ingresados?")) 
              {

                    $scope.cantidad = 4;
                    $scope.incremento = 0;

                    if($scope.local.puno == "si")
                      $scope.incremento++;
                    if($scope.local.pdos == "si")
                      $scope.incremento++;
                    if($scope.local.ptres == "si")
                      $scope.incremento++;
                    if($scope.local.pcuatro == "si")
                      $scope.incremento++;

                    $scope.local.porcentaje = ($scope.incremento/$scope.cantidad)*100;

                    ////////////////////////////////////
                    ///////////////////SLIM/////////////
                    ///////////////////////////////////

                    $http.post('Datos/informes',$scope.local)
                                .then(function(respuesta) {       
                                     //aca se ejetuca si retorno sin errores        
                                     console.log(respuesta.data);
                                     $state.go("grillaInforme");

                                },function errorCallback(response) {        
                                    //aca se ejecuta cuando hay errores
                                    console.log( response);           
                                });



                  $http.delete('Datos/locales/'+ $scope.datos.id)
                      .then(function(respuesta) {      
                      //aca se ejetuca si retorno sin errores        
                      console.log(respuesta.data);

                  },function errorCallback(response) {        
                    //aca se ejecuta cuando hay errores
                     console.log( response);           
                  });

              }

            }else
            alert("Para guardar hay que completar todos los campos");

            
        } // end function guardar

  }

  else{$state.go("login");}

});






// CONTROLLER CAROUSEL
app.controller('ctrl', function($scope) {
   $scope.links =[
     { src:"img/img1.jpg", alt:"", caption:""},
     { src:"img/img2.jpg", alt:"", caption:""},
     { src:"img/img3.jpg", alt:"", caption:""},
  ];
});










// SERVICIOS

app.service('cargadoDeFoto',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto,Uploader){
        var direccion="imagenes/"+nombrefoto;  
        $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem(Uploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              Uploader.queue.push(dummy);
         });
    }
});

app.service('ServicioUsuario', function($http){
  var listado;

  this.retornarUsuarios = function(){

       return $http.get('Datos/usuarios')
                    .then(function(respuesta) 
                    {     
                      console.log(respuesta.data);
                      return respuesta.data;
                    });
                  };

                  //return listado;
});


app.service('ServicioLocal', function($http){ //ESTO ES PARA LOCALES
  var listado;

  this.retornarLocales = function(){

       return $http.get('Datos/locales')
                    .then(function(respuesta) 
                    {     
                      console.log(respuesta.data);
                      return respuesta.data;
                    });
                  };

                  //return listado;
});

app.service('ServicioInforme', function($http){
  var listado;

  this.retornarInformes = function(){

       return $http.get('Datos/informes')
                    .then(function(respuesta) 
                    {     
                      console.log(respuesta.data);
                      return respuesta.data;
                    });
                  };

                  //return listado;
});


app.service('Map', function($q, FileUploader, $stateParams) {


    // function mostrar_objeto(obj){
    //   for (var propiedad in obj) {
    //     document.write(propiedad+": "+obj[propiedad] + "<br />")
    //   }
    // }

    // mostrar_objeto(navigator.geolocation);
    
    this.init = function() {

      uploader = new FileUploader({url: 'PHP/nexoLocal.php'});
      uploader.queueLimit = 1;
      id=$stateParams.id;
      nombre=$stateParams.nombre;
      localidad=$stateParams.localidad;
      direccion=$stateParams.direccion;

      lugar = direccion +" , "+ localidad +", Buenos Aires, Argentina";

      console.log("direccion donde tengo que llegar: "+lugar);

      console.log("estoy en el this.init");

      navigator.geolocation.getCurrentPosition(success, error);
      var divMap = document.getElementById("map");

      function error(){
        divMap.innerHTML="Hubo un problema al solicitar los datos";
      }

      function success(respuesta){
        //mostrar_objeto(respuesta.coords);
        var lat = respuesta.coords.latitude;
        var long = respuesta.coords.longitude;

        var myLatLong = new google.maps.LatLng(lat, long);

        var mapOptions = {
          zoom: 12,
          center: myLatLong
        }

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;

        directionsDisplay.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsDisplay);
        document.getElementById('mode').addEventListener('change', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
        });

        // var serviceDistance = new google.maps.DistanceMatrixService();

        // serviceDistance.getDistanceMatrix(
        //     {
        //         origins: [myLatLong],
        //         destinations: [lugar],
        //         travelMode: google.maps.TravelMode.DRIVING,
        //         avoidHighways: false,
        //         avoidTolls: false
        //     }, 
        //     callback
        // );

        // function callback(response, status) {
        //     var orig = "";//document.getElementById("orig"),
        //     var dest = "";//document.getElementById("dest"),
        //     var distancia = document.getElementById("distancia");
        //     //distancia.innerHTML = '';

        //     console.log("En el callback"+response);

        //     if(status=="OK") {
        //         orig.value = response.destinationAddresses[0];
        //         dest.value = response.originAddresses[0];
        //         distancia.value = response.rows[0].elements[0].distance.text;
        //         console.log("distancia: " + response.rows[0].elements[0].distance.text);
        //     } else {
        //         alert("Error: " + status);
        //     }
        // }


        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
              var selectedMode = document.getElementById('mode').value;
              directionsService.route({
                origin: myLatLong,  // Haight.
                destination: String(lugar),  // Ocean Beach.
                // Note that Javascript allows us to access the constant
                // using square brackets and a string value as its
                // "property."
                travelMode: google.maps.TravelMode[selectedMode]
              }, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setDirections(response);
                } else {
                  window.alert('Directions request failed due to ' + status);
                }
              });
        }



        // var marker = new google.maps.Marker({
        //     position: myLatLong,
        //     label: "A",
        //     animation: google.maps.Animation.DROP,
        //     title:"Hello World!"
        // }); 


         // To add the marker to the map, call setMap();
        // marker.setMap(map);

        // function pinSymbol(color) {
        // return {
        // path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        // fillColor: color,
        // fillOpacity: 1,
        // strokeColor: '#000',
        // strokeWeight: 2,
        // scale: 1,
        //   };
        // }

        // geocoder = new google.maps.Geocoder();
        // geocoder.geocode({ 'address': direccion +" , "+ localidad +", Buenos Aires, Argentina" }, function(results, status) {
        //   if (status == google.maps.GeocoderStatus.OK) {
        //     //map.setCenter(results[0].geometry.location);
        //     var marker2 = new google.maps.Marker({
        //       map: map,
        //       label: "B",
        //       draggable: true,
        //       icon: pinSymbol("#00F"),
        //       size: 10,
        //       animation: google.maps.Animation.DROP,
        //       position: results[0].geometry.location
        //     });
        //   }
        // });

        
        // divMap.innerHTML = lat +","+long;
        // divMap.innerHTML="Tengo autorización para ver su ubicación";

      } //fin de la funcion success

    }
    
});





// FACTORYS



app.factory('FactoryUsuario', function(ServicioUsuario){
  var persona = {
   
    mostrarNombre:function(dato){
      
     return ServicioUsuario.retornarUsuarios().then(function(respuesta){
        console.log("estoy en el app.factory");
        return respuesta;
      });
    },
    mostrarapellido:function(){
     console.log("soy otra funcion de factory");
    }
}
  return persona;

});

app.factory('FactoryLocal', function(ServicioLocal){

  var local = {
   
    mostrarNombre:function(dato){
      
     return ServicioLocal.retornarLocales().then(function(respuesta){
       
        return respuesta;
      });
    },
    // mostrarapellido:function(){
    //   console.log("soy otra funcion de factory");
    // }
}
  return local;

});

app.factory('FactoryInforme', function(ServicioInforme){

  var informe = {
   
    mostrarNombre:function(dato){
      
     return ServicioInforme.retornarInformes().then(function(respuesta){
       
        return respuesta;
      });
    },
    // mostrarapellido:function(){
    //   console.log("soy otra funcion de factory");
    // }
}
  return informe;

});

