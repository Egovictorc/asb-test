<p>
ASB Junior developer test
</p>

## Quick start


This project has two api routes for performing crud operations on both rooms and  admins

The routes can be accessed via:

For rooms, Open [http://localhost:5000/api/rooms](http://localhost:5000/api/rooms)

For admins, Open [http://localhost:5000/api/admins](http://localhost:5000/api/admins)

Admin is required to create account via
[http://localhost:5000/api/admins/create-account](http://localhost:5000/api/admins/create-account). The new admin must provide the required credentials ( name, email and password ) as the request body 

CRUD OPERATIONS FOR ADMIN  
   To see all admins, make a get request to
   [http://localhost:5000/api/admins](http://localhost:5000/api/admins)
  
  To login, make a get request to
   [http://localhost:5000/api/admins/login](http://localhost:5000/api/admins/login). The admin email, name and password are passed as request body which will be validated before login.
   
   Add new Admin, visit:
   [http://localhost:5000/api/admins/create-admin](http://localhost:5000/api/admins/create-admin)


CRUD OPERATIONS FOR ROOM  
To see all rooms, make a get request to [http://localhost:5000/api/rooms](http://localhost:5000/api/rooms)

To create room, make a post request to  [http://localhost:5000/api/rooms/create-room](http://localhost:5000/api/rooms/create-room)

To edit / update (book) room, make a put request to  [http://localhost:5000/api/rooms/:slug](http://localhost:5000/api/rooms/slug)
where `slug` is the room description passed into request params.

To remove a room, make a delete request to  [http://localhost:5000/api/rooms/delete/slug](http://localhost:5000/api/rooms/delete/slug)
where `slug` is the room description passed into request params.
