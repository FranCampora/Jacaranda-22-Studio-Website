## Prompt inicial

Para la materia Arquitectura Web tenemos que hacer un trabajo practico (adjunto la consigna), con un compañero tenemos el proyecto de una pagina web para el estudio de grabación de musica y sonido "Jacaranda 22", que va a permitir gestionar los proyectos de los clientes, entre otras cosas.

Vamos a ir avanzando con este proyecto durante toda la cursada, recién estamos arrancando con la definición funcional. El profesor nos pide utilizar node.js para el backend. Tene en cuenta que no tengo idea de node.js, solo algo básico de JavaScript.

Te cuento lo que tenemos ya armado y lo que tengo que hacer ahora:

Mi compañero creó un repositorio de Github donde vamos a subir todo y desarrollar en conjunto, yo ya hice un pull en mi laptop y cree una nueva branch "dev_j" en la que voy ir trabajando yo.

Los requerimientos iniciales de nuestro poryecto (luego vamos a ir agregando mas funcionalidades) son:
* Poder ver proyectos realizados por Jacaranda 22 Studio
* Poder ver información de contacto del estudio
* Poder ver información de los integrantes del estudio
* Poder ver información de los servicios ofrecidos por el estudio

Teniendo en cuenta la consigna del tp, los apuntes y nuestra idea de proyecto,
Qué base de datos nos conviene utilizar que sea compatible con node?
Tenemos que comenzar a definir los endpoints que van a recibir las peticiones HTTP. Una primera idea sería:
* /inicio -> Pagina principal, contiene noticias del estudio, información de contacto, etc.
* /proyectos -> Para el admin se muestra un listado de todos los proyectos con los integrantes, estado, fecha, etc. Mas adelante deberíamos implementar un sistema de autenticación y autorización para que cada usuario vea solo sus proyectos

Crees que es viable esta implementacion como para arrancar a armar algo que se pueda probar y luego seguir agregando funcionalidades?

