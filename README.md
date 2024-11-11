# OdinBook_API
Odin Project Assignment

# Routes
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

Like Route:
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