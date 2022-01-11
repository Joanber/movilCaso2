# movilCaso2
 _Aplicaciòn movil IstaPro usando [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21._
                                    [Ionic](https://ionicframework.com/docs/intro/cli) version 5.0.0._

### Requisitos ---
![Nodejs](https://img.shields.io/badge/-Nodejs-black?style=flat-square&logo=Node.js)

![ionic](http://www.w3.org/2000/svg)

![angular](https://badges.aleen42.com/src/angular.svg)

_NodeJS, AngularCLI, Ionic

```
Node.js® es un entorno de ejecución para JavaScript 


_Para instalar ionic  abrir la terminal o la consola y ejecutar

npm install -g ionic
```
_Para instalar AngularCLI, abre un terminal o consola de comandos y ejecuta el siguiente comando_
```
npm install -g @angular/cli
```

### Servidor 

Ejecuta en el proyecto `ionic serve`. Seguidamente ingrese esta url `http://localhost:8100/`.
 La aplicación se recarga automáticamente cuando se hace algun cambia  de los archivos.

### Instalación 

Dentro de la carpeta del proyecto abrir una terminal o consola de comandos y ejecutar el siguiente comando_
```
npm install 
```
Lo cual instalará el `node_modules` y las dependencias del `sqlite` 


## Construccion

_Para este proyecto se usaron las siguientes tecnologias_

* [AngularCLI](http://www.dropwizard.io/1.0.2/docs/) - El framework usado
* [Ionic](https://ionicframework.com/docs/intro/cli) - Framework SDK de frontend para aplicaciones híbridas basado        en tecnologías web (HTML, CSS y JS)
* [Sqlite](https://ionicframework.com/docs/native/sqlite) - Base de datos



## Generar Apk
Todo en terminal del proyecto
 Plugins a instalar dependencias nativas de ionic cordova (Solo una vez): 
 
 * ionic cordova plugin add cordova-sqlite-storage 
 * ionic cordova plugin add uk.co.workingedge.cordova.plugin.sqliteporter 

   Integrations 
 * enable cordova --add  
 *  ionic cordova platform add android 
 
 Para correr en dispositivo físico
   (Activar depuración USB) y se actualice cada vez que se realice un cambio (Igual genera apk).
 * ionic cordova run android -l Para crear solo apk  
 * ionic cordova build android 
      
      Las apk generadas se ubican en la carpeta platforms/android/app/build/outputs/apk/debug 
## Versionado 📌

Usamos [Github](http://github.com/) para el versionado. Para todas las versiones disponibles.




