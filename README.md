# Calorie Calculator Application

Live link - https://trackyourdiet.netlify.app/

## Technologies Used

### Frontend
-> Reactjs.   
-> Material UI.   
-> Other libraries including React Router, jsonwebtoken, moment, react cookie etc.   

### Backend
->NestJs.   
->Typeorm.   
->Sqlite3.   
->Joi for validation.   

There are 2 users :- Regular user and Admin.

-> Users can manage food entries.  
-> A user can add a new food entry. 
-> A User can filter those entries by entry date (date from / date to). 

#### Calorie limit warning per day
-> The daily threshold limit of calories is 2100 by default.   
-> The users can see for which day they reached that limit.   
-> If a user has spent more than $1.000 per month, a warning message is shown to the user saying they reached the monthly limit.     

#### Admin role
-> Admin can see a screen with all added food entries of all users and manage existing food entries (read, update, create, delete).      
-> Admin can also see the report screen with the following information.    
> Number of added entries in the last 7 days vs. added entries the week before that.
> The average number of calories added per user for the last 7 days
