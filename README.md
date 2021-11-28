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

![guest_home](https://user-images.githubusercontent.com/78507737/135297487-b83e4f7e-3a9f-47c4-bf88-5d6fc84152a1.PNG)



- To save your chat, you should sign in before creating a room. After signing in you can click the 'Create Chatting Room' button in the home page

![home](https://user-images.githubusercontent.com/78507737/135297493-273c7ff9-b063-4a25-916f-16879682ac06.PNG)



- If user is not signed-in, he will be asked to enter his name before joining chat room

![get_name](https://user-images.githubusercontent.com/78507737/135298032-502e8ad4-fd9d-42aa-9652-12cb9ad91d90.PNG)



- Click 'Copy link' and send it to a friend you want to have a private chat with

![waiting-room](https://user-images.githubusercontent.com/78507737/135298225-34bbeae4-d3ff-455b-bb34-a789697df478.PNG)



- After a user joins through the link, the user can either sign in first to be able to save his chat, or just enter his name and join the chat room

![join_room](https://user-images.githubusercontent.com/78507737/135298927-a32770df-c0ff-4625-9a5b-9cb85cdae364.PNG)

![user2chat](https://user-images.githubusercontent.com/78507737/135300379-bbb3d204-bfbb-4566-bd18-ef3bcc223520.PNG)



- When the user's friend joins the chat room, he will be automatically redirected to the chat room

![user1chat](https://user-images.githubusercontent.com/78507737/135300564-4c764d7e-db9f-40ab-88bb-8b6e86e5b319.PNG)



## Sign Up

![sign_up](https://user-images.githubusercontent.com/78507737/135303276-117c3a34-e2a5-44d1-bdfe-ca6de7be8da8.PNG)



## Sign In

![sign_in](https://user-images.githubusercontent.com/78507737/135309063-0ee1a8be-4dd3-4963-bba0-0478b10fcaf8.PNG)


## Download your chat logs

- Click the download icon of the chat log row you want to save

![_logs](https://user-images.githubusercontent.com/78507737/135313667-2777663d-38ce-447d-9b54-df1a20ac1a27.PNG)



- Downloaded file:
 
![chat_file](https://user-images.githubusercontent.com/78507737/135314457-6d190b77-8dab-4949-90a8-69b7ac9c8920.PNG)



## Admins

- Admin home page

![admin_home_page](https://user-images.githubusercontent.com/78507737/136858280-74c58f65-3fcf-4283-bc19-8f2398d49614.PNG)



- Admins can view and ban users

![users](https://user-images.githubusercontent.com/78507737/135309102-3793b492-c82d-4996-9d64-2e76f45e8c19.PNG)



- Admins can view reported bugs and mark them solved or unsolved

![reports](https://user-images.githubusercontent.com/78507737/135304252-9bb11850-e0ea-4521-b8ad-08eda50fd55b.PNG)



- Admins can view submitted contact forms and delete them

![forms](https://user-images.githubusercontent.com/78507737/135304770-1de55c73-9c73-4783-8496-b813b103cb5f.PNG)



# Entity Relationship Diagram

![Seguro ERD](https://user-images.githubusercontent.com/78507737/135308758-73808db1-5b1a-4004-b536-eb2eb1e6435c.png)




### [Try Seguro Here](https://seguroo.herokuapp.com/)
