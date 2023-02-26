# TESTBACKEND

Aplicación de servicios tecnicos, cuenta con funcionalidad de registro y login de usuarios y administracion de tickets. Como no se la versión de base de datos a usar en pruebas decidi dockerizarla.
La aplicacion esta desarrollada con Nodejs 16.15.1, PostgreSQL 14.7.1 y npm 8.11.0. Dejo el backup de la base de datos y el archivo de documentacion de Postman, ademas del archivo .env con los valores usados en las variables de entorno para que puedan usarla con los datos ya cargados a la base de datos.

## Documentación Postman en linea

https://documenter.getpostman.com/view/12345252/2s93CLuEMi

Se corrigio la documentación porque no mostraba los Responses de cada Endpoint

## Variables de entorno

Las variables de entorno DKDB_PORT y DKDB_HOST si no se va a usar la version en docker estas se pueden comentar sus datos con el signo numeral en el archivo .env, si se va a usar la version de Docker se debe comentar el valor de la variable DB_HOST. Si se cambia el valor de la variable de entorno DB_NAME se debe actualizar con ese mismo nuevo dato el script docker en el archivo package.json en caso de querer ejecutar la aplicacion en Docker.

## Ejecucion de la aplicación

Primero se debe ejecutar la intrucción 

    npm install

Para reconstruir los modulos de node necesarios para el funcionamiento de la aplicacion.
Para ejecutar la aplicacion en entorno local, solo se debe ejecutar la siguiente intruccion en la misma ruta de la aplicacion con previa restauracion de la base de datos.

    npm run start

Esto levantara la aplicacion y estara lista para ser usada.

Para ejecutar la aplicacion en docker solo se debe ejecutar la siguiente instruccion, la restauracion de la base de datos se hara de forma automatica en un contenedor propio.

    npm run docker

En el proceso hara una pausa de 60 segundos para esperar el contenedor de la base de datos se termine de iniciar correctamente y luego hacer la restauracion de la base de datos de forma automatica.