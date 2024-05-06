# Proyecto Backend ASP.NET Core y Frontend Angular

Este repositorio contiene un proyecto Backend desarrollado en ASP.NET Core utilizando Entity Framework, junto con un proyecto Frontend construido en Angular 15. 

## Configuración del Backend

Para cambiar la conexión de la base de datos, dirígete al archivo `appsettings.Development.json`. En este archivo, encontrarás la cadena de conexión en la propiedad `DefaultConnection` dentro de `ConnectionStrings`. Se recomienda cambiar únicamente el `serverName` para evitar problemas.

## Configuración del Frontend

El Frontend está desarrollado en Angular 15 y utiliza la biblioteca de UI de PrimeNg. Para ejecutar correctamente el Frontend, sigue estos pasos:

1. Ejecuta `npm i` para instalar las dependencias.
2. Luego, ejecuta `ng serve -o` para correr el Frontend.

## Base de datos

La base de datos está implementada en SQL Server. Es crucial ejecutar el script proporcionado en este repositorio para asegurar el correcto funcionamiento del proyecto. Encontrarás el script en la carpeta correspondiente.
Al ejecutar el script, podremos ingresar a la aplicacion con las siguientes credenciales:
1. `Administrador -> phone: 8443832692 password: Admin1.$`
2. `Doctor -> phone: 8441309847 password: Doct_1#`
3. `Doctor -> phone: 8441234567 password: Doct_2#`
4. `Paciente -> phone: 8448065676 password: Pac_$021`
5. `Paciente -> phone: 8440987654 password: Pac_$021`

## Información de contacto

**Nombre:** Gerardo Rodrigo Chavez Carcamo  
**Correo:** gerca4401@gmail.com  
**Número de teléfono:** 8443832692

¡Disfruta explorando el proyecto! Si tienes alguna pregunta o problema, no dudes en levantar un issue o contactar al equipo de desarrollo. ¡Gracias por tu interés!
