# *App de Eventos Sociales*

## Descripción
Este es un proyecto que desarrollé mientras seguía el curso de Udemy "Complete Guide to Building an App with .NET Core and React" de Neil Cummings.

## Funcionalidades
El objetivo de la aplicación es proporcionar a los usuarios una red social donde puedan crear, administrar y asistir a eventos con otras personas.
La aplicación cuenta con un sistema de autenticación de usuarios que les permite crear cuentas, personalizar sus perfiles y conectarse con otros usuarios.
Los usuarios pueden crear eventos, invitar amigos y administrar los detalles de sus eventos, como la ubicación, hora y fecha. La aplicación también incluye una función de búsqueda que permite a los usuarios encontrar eventos por ubicación, categoría o palabras clave.

## Arquitectura:
La aplicación está construida utilizando el patrón de Arquitectura Limpia (Clean Architecture), que proporciona una clara separación de responsabilidades y facilita el mantenimiento y la escalabilidad del código.

La aplicación también implementa los patrones CQRS (Command Query Responsibility Segregation) y Mediator para mejorar el rendimiento, escalabilidad y seguridad, evitando conflictos de merge en el dominio.

## Frontend:
Utilicé React con Typescript y Material UI para crear una interfaz de usuario moderna y receptiva.

Aunque el curso que tomé utilizó Semantic UI, elegí utilizar Material UI en su lugar para mi proyecto debido a su popularidad y amplia biblioteca de componentes personalizables que me permitieron mantener un diseño cohesivo y uniforme en toda la aplicación.

## Backend
Utilicé ASP.NET Core y Entity Framework Core como mi ORM e implementé una API RESTful para manejar las peticiones del Frontend. Para proporcionar una autenticación segura de usuarios, configuré ASP.NET Core identity. Además, incorporé SignalR para mejorar las funciones en tiempo real de la aplicación, proporcionando a los usuarios notificaciones e actualizaciones instantáneas sobre eventos e invitaciones.


### Tecnologías utilizadas:
· ASP.NET Core 
· React 
· C# 
· Typescript 
· Entity Framework Core 
· Material UI 
· Vite 
· SignalR
