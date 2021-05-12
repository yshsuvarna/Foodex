# Foodex
Grp:P003 FOODEX<br/>
By<br/>
-Neel K.Parikh(190001044)<br/>
-Bhoomil Gohel(190001008)<br/>
-Yash Suvarna(190001068)<br/>
-Parul Mogre(190001037)<br/>
-Shivesh Dave(190001057)<br/>

# Introduction

Foodex is an Web-Application Restaurant Management System that aims to digitalize the ordering, hall, and management processes in restaurants.<br/>
The key goal is to boost the restaurant's efficiency by eliminating regular paperwork. Tasks will be completed in less time and with greater efficiency with this method. Another advantage of this programme is that it can easily balance the load during rush hours, allowing restaurants to perform better than normal. It also expands the customer base and the online presence of the restaurant. Furthermore, human error that happens when performing tasks manually is reduced. The device would also result in a reduction in labour, lowering the restaurant's costs.
<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![image](https://user-images.githubusercontent.com/59607002/117834363-b5353880-b294-11eb-9ff6-7e419396f787.png)
<br/>

# Installation steps to run the site locally:
1.	Install the latest version of node and install npm by typing:
   -node i npm
2.	Download the code folder from github.
3.	Initialise npm in the folder project by running the following line in the terminal :
   - npm init
4.	Install all the required dependancies by running
   - npm i
5.	Run the programme by typing : node app.js
6.	Visit “localhost:3000” on your browser.   
<br/>	

# Usage steps:

<br/>
•	The user/customer needs to visit the website (https://guarded-bastion-42339.herokuapp.com/) and register on the system using his credentials. He then needs to login to the website with the credentials he entered.

<br/><br/>
![image](https://user-images.githubusercontent.com/59607002/117837463-1a8a2900-b297-11eb-90ed-3a50ac15de2c.png)<br/>


•	The user can then look at the available dishes he can order on the “Food Menu” tab. Each dish has buttons leading to:-<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◦“Reviews”: Check the ratings and reviews of the specific dish that other users have previously given. You can also add your own ratings and reviews.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◦	“Add to cart”: This button will add a single quantity of the dish to your cart, while clicking multiple times will add multiple quantities of the dish.


<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![image](https://user-images.githubusercontent.com/59607002/117834505-d564f780-b294-11eb-8151-0db76d7f845e.png)<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![image](https://user-images.githubusercontent.com/59607002/117834531-dd249c00-b294-11eb-9b8c-38b3710714b3.png)<br/><br/>


&nbsp;&nbsp;&nbsp;•	After adding the required dishes to the cart, the user can click on the “My cart” tab where one can look at the current items in the cart along with their respective quantities and the sum total of all. The user can also remove a particular dish from the cart as well.
<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![image](https://user-images.githubusercontent.com/59607002/117834459-ce3de980-b294-11eb-860b-b916174c9179.png)<br/><br/>

		
&nbsp;&nbsp;&nbsp;•	On the “My cart” page, the button labelled “Place Order” can be clicked to finally order the dishes, after filling in the address form for the delivery address.<br/>
&nbsp;&nbsp;&nbsp;•	Once the order is places, the user can click on the “check status” button as he needs to check the status of his order. There are a total of 5 status options possible:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◦	New Orders<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◦	Confirmed Orders<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◦	Food Dispatched<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◦	Food Delivered<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◦	Cancelled.<br/>
&nbsp;&nbsp;&nbsp;•	The admin, from his side, will be able to look at the user’s order and change the status to be displayed on the user’s side as he sees fit and as the delivery process goes on.<br/> 
&nbsp;&nbsp;&nbsp;•	The user can also prematurely cancel the order before the status has changed to food dispatched if he/she wishes to. This will reflect on the admin side and the order will not be delivered.<br/>
Extraneous Features:<br/>
&nbsp;&nbsp;&nbsp;•	The user can change his/her profile information from the “Update Profile” tab in the “Profile” tab.<br/>
&nbsp;&nbsp;&nbsp;•	The user can also log out from the website once his/her work is done.<br/>
&nbsp;&nbsp;&nbsp;•	The user can also change his/her password to a new one.
<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![image](https://user-images.githubusercontent.com/59607002/117834580-e7469a80-b294-11eb-983d-e76d0287f1ad.png)<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![image](https://user-images.githubusercontent.com/59607002/117834624-ef063f00-b294-11eb-845f-ce7a295ea1f2.png)<br/><br/>

# Admin Usage:<br/>
&nbsp;&nbsp;&nbsp;•	The admin of the restaurant has his own side of the website to operate on.<br/>
&nbsp;&nbsp;&nbsp;•	The admin will click on the “admin login” tab in the footer of the landing page, and it will lead to the admin dashboard page after successfully logging in with the correct credentials.<br/>
&nbsp;&nbsp;&nbsp;•	The dashboard provides the admin a systematic look at the recieved orders (past and current) which are grouped by their current status.<br/>
&nbsp;&nbsp;&nbsp;•	The admin can click on any particular order and change the status to reflect it on the user side accordingly.<br/>
&nbsp;&nbsp;&nbsp;•	The admin also has the option to update the menu which is being displayed on the user side under “Food Menu”. He can add new dishes to the menu as well as remove existing dishes.<br/>
&nbsp;&nbsp;&nbsp;•	He can also create new categories for new dishes to reside in.<br/>
&nbsp;&nbsp;&nbsp;•	The admin also has the access to the contact information of all the users currently registered on the system, their emails and phone numbers, to contact them via these if need be.
		<br/>		<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![image](https://user-images.githubusercontent.com/59607002/117834672-f75e7a00-b294-11eb-8adf-1871c99ae328.png)<br/><br/>

# How We Deployed our Foodex app using Heroku:<br/>

(1)Creating Account on Heroku<br/>
&nbsp;&nbsp;&nbsp;First we created an account on Heroku and then downloaded Heroku  CLI.<br/>
(2)Preparing Codebase for Heroku Deployment<br/>
&nbsp;&nbsp;&nbsp;(2a)Tracking Code in Git Repository<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;First we initialise empty git repository using command:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(PS C:\Users\91932\Desktop\Projects\FoodexFinal-main> git init)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then we will add all files in it and commit these changes using commands:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(PS C:\Users\91932\Desktop\Projects\FoodexFinal-main> git add .)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(PS C:\Users\91932\Desktop\Projects\FoodexFinal-main> git commit -m “Commit Message”)<br/>
&nbsp;&nbsp;&nbsp;(2b)Add Heroku Git Remote <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To do this we first need to login into heroku:<br/>
&nbsp;&nbsp;&nbsp;(PS C:\Users\91932\Desktop\Projects\FoodexFinal-main> heroku login)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Above command will redirect us to the login page.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;After that To create git we will write,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(PS C:\Users\91932\Desktop\Projects\FoodexFinal-main> heroku create).<br/>
&nbsp;&nbsp;&nbsp;(2c)Adding Procfile<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We will add Procfile using:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(PS C:\Users\91932\Desktop\Projects\FoodexFinal-main> touch Procfile).<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;After that we will open it and add web: node app.js line in that file.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To open File we will use:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(PS C:\Users\91932\Desktop\Projects\FoodexFinal-main>open Procfile).<br/>
&nbsp;&nbsp;&nbsp;(2d)Changing local port to correct port<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We will add following lines in app.js:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;let port = process.env.PORT;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (port == null || port == "") {<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port = 8000;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app.listen(port);<br/>


&nbsp;&nbsp;&nbsp;(2e)Creating Database in Heroku Using ClearDB MySQL <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We created Database from an existing database in our computer using dump data and structure in the workbench.We exported data from local database into single file and imported that file into our remote database.For remote database,we will get url from ClearDB MySQL for username,host ,password and name.

&nbsp;&nbsp;&nbsp;(2f)Node language setup:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Specifying Node version in package.json file :<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"engines": {<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"node": "14.x" },<br/>
&nbsp;&nbsp;&nbsp;(3)Building App<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Atlast,we will add and commit all changes into our git file using:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(PS C:\Users\91932\Desktop\Projects\FoodexFinal-main> git add .)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(PS C:\Users\91932\Desktop\Projects\FoodexFinal-main> git commit -m “Commit Message”)<br/>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To push,All changes in heroku git we will write:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(PS C:\Users\91932\Desktop\Projects\FoodexFinal-main> git push heroku master.)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This will build our app and we will get the url where our site is hosted.(Our Url:https://guarded-bastion-42339.herokuapp.com/)<br/>

This web-application was created as part of our Software Engineering (CS258) course's project. 
Individual Contribution:
1.	User Backend - Bhoomil Gohel and Parul Mogre
2.	User Frontend – Shivesh Dave
3.	Admin Side, Hosting and Testing – Neel Parikh, Yash Suvarna
