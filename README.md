# OdinBook_API
Odin Project Assignment

## Implementation

### Rest API
THe Rest API is implemented using Node.js and express.js with plain javascript.

### Authentication and Security
The API performs validation on any post requests.
Authentication is handled via JWS Tokens.
Passwords are encrypted using the bcrypt library before being stored to the Database.

### Database
I'm using a postgres database to persist data.
Also I'm leveraging prisma orm for easier db querying and fast db migration.

### Avatars
I'm using the Gravatar API to use user avatars.

## Routes
User Route:
* post  => /user => create new user
    + requires body: username, email, pw, cpw
    + sends { ok:bool, data?, message? }
  
* get   => /user/:userId => get single user data
    + sends { ok:bool, data?: { username, email, followerCount }, message? }
  
* put => /user/:userId => updated user data
    + requires Header: Authorization: Bearer Token
    + sends { ok:bool, data: null, message }

* put => /user/:userId/follow/:followId => updated user data
  + requires Header: Authorization: Bearer Token
  + sends { ok:bool, data: null, message }

* delete => /user/:userId => cascade deletes a user
    + requires Header: Authorization: Bearer Token
    + sends { ok: bool, data: null, message }

Post Route:

* post => /post => create post
    + requires body: userId, text, commentedId?
    + sends { ok:bool, data?, message? }
* get => /post/:postId => get single post
    + sends { ok:bool, data?: { postId, text, time, likes, comments, user }, message? }
* get => /post/user/:userId
    + sends array of posts of user and users followed
    + sends { ok:bool, data?: [ { postId, text, time, likes, comments, user } ], message? }
* put => /post/:postId => update single post
    + requires Header: Authorization: Bearer Token
    + sends { ok:bool, data: null, message }
* delete => /post/:postId => delete single post
    + requires Header: Authorization: Bearer Token
    + sends { ok:bool, data: null, message }

LikeEntity Route:
* get => /like/:postId => get likes by post
    + send { ok:bool, data?, message? }
* get => /like/:postId/user/:userId => check if post is liked by user
  + send { ok:bool, data?:bool, message? }
* post => /like/:postId => likes a post
    + requires body: userId
    + sends { ok:bool, data: null, message }
* delete => /like/:postId => likes a post
  + requires body: userId
  + sends { ok:bool, data: null, message }
