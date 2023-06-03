# Introduction

This prject is called **Funnny movie** to offer users a place to share the interesting movies just by sending the youtube video link to users access the application. the main features are the guest users can view the list of shared movies, the auth users can share the video by saving the youtube video link, other auth users can see the real-time notificaions when someone just posted the video.

https://funny-movies-1agb3fay9-buiductai232.vercel.app/

# Prerequisites

* NodeJS 18, 
* Npm 8
* Posgresql 14
* Typescript 5
* NextJS 13
* ReactJS 18
* ExpressJS 4
* Prisma client 4

# Installation & Configuration

### Clone project from github
```
git clone https://github.com/Taibdse/funny-movies.git
git clone git@github.com:Taibdse/funny-movies.git // for ssh clone

```

### Install frontend dependencies and setup frontend config in local
```
cd client
npm i
```
Add a **.env.local** file at the root client with some configs below

```
NEXT_PUBLIC_ROOT_API=http://localhost:3001/api
NEXT_PUBLIC_SOCKET_IO_URL=http://localhost:3001
```

**NEXT_PUBLIC_ROOT_API**: is api endpoint 

**NEXT_PUBLIC_SOCKET_IO_URL**: is socket io endpoint 

### Install backend dependencies and setup backend config in local
```
cd backend
npm i
```

Create .env in backend root folder and Add some configs in .env
```
DATABASE_URL="postgresql://postgres:123456@localhost:5432/funny-movies"
JWT_SECRET_KEY=123abc
APP_PORT=3001
YOUTUBE_API_URL=https://www.youtube.com/oembed
```
**DATABASE_URL**: is the database connection url, we can change the username, password, port, database-name to mathc the local db on machine 

**JWT_SECRET_KEY**: is secret key when generating jwt token, we can change this value

**APP_PORT**: backend post, shoule be aligned as the FE configs **NEXT_PUBLIC_ROOT_API** and **NEXT_PUBLIC_SOCKET_IO_URL**. They must have the same port!

**YOUTUBE_API_URL**: the public youtube api url to get video info, should not change this value cause the function share movie cannot get the video info (title, iframe src)


Initialize prisma client and migrate database

```
npx prisma migrate dev --name init
```
We can check the local database and see the new created database called funny-movies and the tables (Movie, User)


# Database Setup
Follow the step above to setup database postgresql for local project

# Running the Application
**Run backend app**
```
npm run dev
```
Open browser and hit http://localhost:3001/api/movie to view all the movies in database

**Run test backend app**
```
npm run test
```

**Run frontend app**
```
npm run dev
```
Open browser and hit http://localhost:3000 to preview the funny-movies application

**Run test frontend app**
```
npm run test
```

# Deployment
**Deploy Frontend application**

Using the **vercel** platform to deploy. Login to vercel, connect vercel with github repository, config env, build step and deploy the project, then preview on the site https://funny-movies-1agb3fay9-buiductai232.vercel.app/
![vercel deployment](https://res.cloudinary.com/ductai/image/upload/v1685767333/test/vercel-deploy-fe-funny-movies_yprq3t.png "This is a sample image.")


**Deploy Backend application**

Using the **render.com** platform to deploy. Login to render, choose option deploy **Web service** then connect with github repository, config env, build step and deploy the project, then preview the API on the site https://funny-movies-c5qb.onrender.com

We can see the list of shared movies here: https://funny-movies-c5qb.onrender.com/api/movie/api/movie

![render.com deployment](https://res.cloudinary.com/ductai/image/upload/v1685767065/test/render-be-funny-movie-deploy_cue8ct.png "This is a sample image.")

![render.com deployment](https://res.cloudinary.com/ductai/image/upload/v1685767064/test/render-be-funny-movie-deploy-2_rtf2qc.png "This is a sample image.")


# Usage
At the very fitst time access the application domain, we can see the list of shared movies. We can create a new account by input email and password in the navbar. After that we click on the **Share a movie** button to navigate to the page where we can input the video link to share. After sharing, the other loged-in users can see the notification with our name and video's title that we just shared

# Troubleshooting
NA

