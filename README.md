<p>
ASB Junior developer test
</p>

## Quick start

First run the development server:

```js
npm run dev

```

This project has two api routes for performing crud operations on both rooms and  admins

The routes can be accessed via:

For rooms, Open [http://localhost:5000/api/rooms](http://localhost:5000/api/rooms)

For admins, Open [http://localhost:5000/api/admins](http://localhost:5000/api/admins)

Admin is required to create account via
[http://localhost:5000/api/admins/create-account](http://localhost:5000/api/admins/create-account). The new admin must provide the required credentials ( name, email and password ) as the request body 

Admin is required to login via
[http://localhost:5000/api/admins/login](http://localhost:5000/api/admins/login)