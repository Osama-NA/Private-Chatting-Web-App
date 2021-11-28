# Seguro  

### Seguro is a web application which provides secure chatting between users, simply by creating a chatting room with one click, then sending a friend the generated url to start a chat with them.

### Seguro does not collect user data or save users chat logs. Chat logs can be saved by signed in users while they are in a chat room, the saved chat logs are encrypted then stored in the database. 

## Technologies Used

- Socket.io
- Node.js / Express.js
- MySQL
- Passport.js
- Handlebars.js
- HTML / CSS
- jQuery

## Steps to create a chat room

- Click the 'Create Chatting Room' button in the home page

![home_page](https://user-images.githubusercontent.com/78507737/143783022-fffdc320-1e65-4ebb-b9e7-bcdee8a89ef0.JPG)



- To save your chat, you should sign in before creating a room. After signing in you can click the 'Create Chatting Room' button in the home page

![signed_home_page](https://user-images.githubusercontent.com/78507737/143783014-02ae80d7-fe83-440f-aa88-de5c533875e2.JPG)



- If user is not signed-in, he will be asked to enter his name before joining chat room

![enter_name](https://user-images.githubusercontent.com/78507737/143783026-c9d981e5-b779-49a2-80c6-56d0bb9e085a.JPG)



- Click 'Copy link' and send it to a friend you want to have a private chat with

![waiting_room](https://user-images.githubusercontent.com/78507737/143783007-d1b06c26-187e-4fd4-9343-b0a903644716.JPG)



- After a user joins through the link, the user can either sign in first to be able to save his chat, or just enter his name and join the chat room

![enter_name2](https://user-images.githubusercontent.com/78507737/143783410-ce195609-6481-4a35-9b28-efd82bb26271.JPG)
![chat_room](https://user-images.githubusercontent.com/78507737/143783039-227ef577-e951-404b-9e2f-45b0127fb2e7.JPG)



- When the invited user joins the chat room, the invitee will be automatically redirected to the chat room

![chat_room_user1](https://user-images.githubusercontent.com/78507737/143783037-aec82dfa-7fb2-4293-8b6e-61b84f482f1a.JPG)



## Sign Up

![sign_up](https://user-images.githubusercontent.com/78507737/143783017-e1e852c3-1df9-4701-8c17-a7c90ed85da9.JPG)



## Sign In

![sign_in](https://user-images.githubusercontent.com/78507737/143783021-f82f196e-6e88-4b3f-b053-847ebd92b62a.JPG)


## Download your chat logs

- Click the download icon of the chat log row you want to save

![chat_logs](https://user-images.githubusercontent.com/78507737/143782990-6ddb23bc-9c69-43a8-ab70-3fb8506f2d9b.JPG)



- Downloaded file:
 
![chat_file](https://user-images.githubusercontent.com/78507737/135314457-6d190b77-8dab-4949-90a8-69b7ac9c8920.PNG)



## Admins

- Admin home page

![admin_home](https://user-images.githubusercontent.com/78507737/143782996-43570cfa-b951-4d45-baa9-7c7e5591cbdc.JPG)



- Admins can view and ban users

![view_users](https://user-images.githubusercontent.com/78507737/143783011-df99642b-b35c-49af-ac75-0f61f1f6a527.JPG)



- Admins can view reported bugs and mark them solved or unsolved

![bug_reports](https://user-images.githubusercontent.com/78507737/143782998-dd61ec71-8ae7-4dd7-a590-ab06f70fd317.JPG)



- Admins can view submitted contact forms and delete them

![contact_forms](https://user-images.githubusercontent.com/78507737/143783006-36d9e6be-54c5-43c8-8ee6-c78e50714150.JPG)



# Entity Relationship Diagram

![Seguro ERD](https://user-images.githubusercontent.com/78507737/135308758-73808db1-5b1a-4004-b536-eb2eb1e6435c.png)



### [Try Seguro Here](https://seguroo.herokuapp.com/)
