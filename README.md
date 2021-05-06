# Marvel app: Platzi master project

This repo is the result of a one week project from platzi master.

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes.

### Prerequisites

You must have installed node.js in your computer, see the  link for more info on how to get started with node.
- [Node.js](https://nodejs.org/en/)


### Installing

Once you make sure that you have node.js installed globally in your computer the next step is to either clone this repository to you computer or to download the project.

Up next you'll need to use preferred command console and make sure that you are on the right folder (That would be the main folder of the project the one that has this readme file in it)

Now we are ready.

firstly run the next command

    npm install

this will install the dependencies from the package.json 

After we are done installing dependencies we'll need to create a file called '.env' 

    touch .env

Then will write in this file our database connection and if we wish to we could also tell the app in which port to run but that is optional.
Check out the 'env.example' file so that you get a better idea on how to configurate your own file

Finally we can run this command 

    npm run dev
If we wish to run the server with a developer configuration.


Or alternatively use this command

    npm start

Additionally  yo can run 

    npm test

Just to see if everything is running as expected.


# Backend/API endpoints

Backend made with Express.

## Users

### Create a user

**method**: POST

**route**: /api/user/register

**body**:

```json
{
	"username": String,
    "email": String,
    "password" String
}
```

**Success**:

**Status code**: 201

```json
{
	"Message": "User created"
}
```


### Loggin a user

**method**: POST

**route**: /api/user/login

**body**:

```json
{
	"username": String,
    "password" String
}
```

**Success**:

**Status code**: 200

```json
{
	"jwt": String
}
```


### Get one user's favorite comics

**method**: GET

**route**: /api/user/favorites

**Athorization Bearer Token**: jwt

**Success**:

**Status code**: 200

```json
{
	"favorites": List[
        {
        "title": String,
        "description": String,
        "image": String,
        "publish": String,
        "coverArtist": String,
        "penciler": String,
        "writer": String
        },
    ]
}
```

### Add one comic to a user's favorite comics

**method**: POST

**route**: /api/user/favorites

**Athorization Bearer Token**: jwt

**Body**:
```json
{
    "title": String,
    "description": String,
    "image": String,
    "publish": String,
    "coverArtist": String,
    "penciler": String,
    "writer": String
}
```

**Succes**:

**Status code**: 200

```json
{
	"Message": "Comic added to user"
}
```

## auth

### Both loggin and Sign up

**method**: GET

**route**: /api/auth/google

**Success**: **Redirect to**: /api/auth/register

**Status code**: 200

```json
{
	"jwt": String
}
```

## comics

### Get comics of a given hero

**method**: GET

**route**: /api/comics/

**Athorization Bearer Token**: jwt

**Param**: heroname = String

**Status code**: 200


```json
{
    "heroInfo": 
        {
            "heroName": String,
            "heroDescription": String,
            "heroImage": String
        },

    "comicsArray": List[
                {
            "title": String,
            "description": String,
            "image": String,
            "publish": String,
            "coverArtist": String,
            "penciler": String,
            "writer": String
            },
]
}
```

### Get comics of a given hero

**method**: GET

**route**: /api/comics/randoms

**Athorization Bearer Token**: jwt

**Param**: limit = number of comics that you want to get

**Status code**: 200


```json
{
    "comicsArray": List[
                {
            "title": String,
            "description": String,
            "image": String,
            "publish": String,
            "coverArtist": String,
            "penciler": String,
            "writer": String
            },
        ]
}
```

# Authors

  - **Jorge Alberto Delgadilo Alonso** 