# Sky Calendar

_Es el modulo web del sistema de registro de tareas de calendario con notificaciones push a traves del API Sky Calendar en NestJS_

_Adicionalmente funciona como PWA(Progresive Web App) que puede integrarse en cualquier dispositivo movil_

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

_Puede visualizar una Demo del Proyecto en el siguiente enlace : https://isekai-orpheus-bot.vercel.app/#/login_

_**Administrador**_

```
adminDemo@gmail.com
Admin2
```

_**Viewer**_

```
viewerDemo@gmail.com
Admin2
```

Mira **Deployment** para conocer como desplegar el proyecto.

### Pre-requisitos 📋

_Software requerido_

```
NodeJS >= 14.X
NPM >= 8.X
AngularCli >= 13.X
```

_Software opcional_

```
Visual Studio Code ( O el editor de su preferencia)
```

### Instalación 🔧

_Para ejecutar un entorno de desarrollo_

_Previamente ejecutar el comando en la terminal para descargar "node_modules" para el funcionamiento del proyecto_

```
npm install
```

_Previamente configurar la ruta del API que consumira nuestro proyecto en el archivo **"src/environments/environment.ts"** campo **API_URL**_

_Para ejecutar un servidor de pruebas local usar el comando donde **"PUERTO"** sera el puerto donde deseamos ejecutar el proyecto , por default **ng serve** ejecuta el puerto 4200_

```
ng serve --port [PUERTO]
```

_Dirigirse a la ruta http://localhost:4200/#/login/ se tendra la pantalla de Login del sistema existiendo 2 roles_

_**Login** : Apartado de inicio de sesion para ambos tipos de roles_

![Login](/docs/layout/login.png)

_**Change Password** : Apartado para el cambio de contraseña_

![Change Password](/docs/layout/change-password.png)


_**Gestion de Usuarios** : Apartado para la gestion de usuarios , creacion , reseteo , edicion , eliminacion_

![Gestion Usuarios 1](/docs/layout/gestion_usuarios_1.png)

![Gestion Usuarios 2](/docs/layout/gestion_usuarios_2.png)

![Gestion Usuarios 3](/docs/layout/gestion_usuarios_3.png)

![Gestion Usuarios 4](/docs/layout/gestion_usuarios_4.png)


_**Calendario** : Apartado con el calendario de tareas , registro de tareas , edicion , eliminacion  (Se envia notificaciones push a los usuarios suscritos)_

![Calendario 1](/docs/layout/calendario_1.png)

![Calendario 2](/docs/layout/calendario_2.png)

![Calendario 3](/docs/layout/calendario_3.png)

![Calendario 4](/docs/layout/calendario_4.png)

## Ejecutando como PWA 👨🏻‍💻

_Para ejecutar como PWA(Progressive Web App) , previamente debe tenerse instalado la libreria http-serve_

```
npm install --global http-server
```

_Una vez instalada proceder a ejecutar el siguiente comando , que nos permite ejecutar en entorno local nuestra PWA_

```
npm run start-pwa
```

_Este comando se encuentra configurado en el archivo *package.json de la raiz del proyecto por default ejecuta el puerto 8080*_

_La PWA se encuentra configurada para ejecutarse en la vista Tracking para consulta de tramites_

![PWA 1](/docs/pwa/pwa_1.png)

![PWA 2](/docs/pwa/pwa_2.png)

![PWA 3](/docs/pwa/pwa_3.png)

![PWA 4](/docs/pwa/pwa_4.png)


_Se cuenta con soporte de notificaciones Push integrado en el modulo de Tracking_

_Se creo el archivo *src/custom-service-worker.js* para la gestion de evento de notificaciones personalizado_

![PWA 5](/docs/pwa/pwa_5.png)


## Despliegue 📦

_Previamente configurar la ruta del API que consumira nuestro proyecto en el archivo src/environments/environment.prod.ts campo API_URL_

_Para realizar el despligue a produccion del proyecto ejecutar el siguiente comando_

```
ng build --configuration production
```

_El cual creara la carpeta "dist" en la raiz de nuestro proyecto el cual podemos desplegar en cualquier servidor que ejecute HTML CSS y JS_

_A su vez en un hosting con certificado HTTPS se podra ejecutar como una PWA que se podra "instalar"_

## Construido con 🛠️

_Las herramientas utilizadas son:_

- [Angular](https://angular.io/docs) - El Framework para Desarrollo Web
- [NPM](https://www.npmjs.com/) - Manejador de dependencias
- [Visual Studio Code](https://code.visualstudio.com/) - Editor de Codigo
- [Prettier](https://prettier.io/) - Formateador de Codigo
- [TabNine](https://www.tabnine.com/) - Autocompletador de Codigo
- [Argon DashBoard](https://demos.creative-tim.com/argon-dashboard-angular/#/documentation/tutorial) - Plantilla Web Utilizada

## Versionado 📌

Usamos [GIT](https://git-scm.com/) para el versionado.

## Autores ✒️

_Los integrantes del proyecto_

- **Jaime Burgos Tejada** - _Developer_ - [SkyZeroZx](https://github.com/SkyZeroZx)

## Licencia 📄

Este proyecto está bajo la Licencia - mira el archivo [LICENSE.md](LICENSE.md) para detalles