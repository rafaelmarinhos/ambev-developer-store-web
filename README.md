# DeveloperStore-WEB

## About

The `DeveloperStore-WEB` is the interface for managing sales for the DeveloperStore-API project.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.8.

## Technologies / Components implemented

- Angular 19.1.8
- Angular Material UI (https://material.angular.io/)
- AuthInterceptor (to add Bearer Token in all requests to the backend)
- AuthGuard (To protect private routes without JWT token)
- MockDataService (To simulate external indentities like customers, branchs and products)

## Getting Started

To start a local development server, run:

```bash
ng serve
```
Once the server is running, open your browser and navigate to http://localhost:4200/.

![image](https://github.com/user-attachments/assets/8c49eb73-66b9-4a89-88b4-55f8d935f5b1)

All requests need to pass the JWT in header, so it is necessary to follow the steps of project DeveloperStore-API (https://github.com/rafaelmarinhos/ambev-developer-store) to create a user, this way, it will be possible to log in on **DeveloperStore-WEB**.

After creating the user and successfully logging in, you will be redirected to the home page to the sale management:

![image](https://github.com/user-attachments/assets/b940d599-580b-417b-aa38-1b739db31d34)



