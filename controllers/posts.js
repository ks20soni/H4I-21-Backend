const client = require("../configs/db");

exports.createPost = (req, res) => {
  const { content, room } = req.body;
  if (content.length === 0) {
    res.status(400).json({
      message: "Cannot create an empty post",
    });
  }
    else{
  client
    .query(
      `INSERT INTO posts (email,name,content, room) VALUES ('${req.email}', '${req.name}','${content}', '${room}');`
    )
    .then((data) => {
      res.status(200).json({
        message: "Post created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Database error occured",
      });
    });
  }
};

//likes route
exports.likesCount = (req, res) => {
  //taking postId in the body
  const postId = req.body.postId;
  //selecting everything from likes table, corresponding to a specific post id and specific email
  client
    .query(
      `SELECT * FROM likes WHERE postid = '${postId}' AND email = '${req.email}';`
    )
    //if the same row is repeated that is if its length is greater than zero then it displays a message stating user has already liked the post
    .then((data) => {
      if (data.rows.length > 0) {
        res.status(400).json({
          error: "User has already liked the post",
        });
      }
      //if the user has not liked the post, then it inserts the details of that user in likes table
      else {
        client
          .query(
            `INSERT into likes (email,postid) VALUES ('${req.email}','${postId}'); `
          )
          //selecting the post with a specific postId from the posts table
          .then((data2) => {
            client
              .query(`SELECT * FROM posts WHERE id = '${postId}';`)
              //incrementing the likes by one
              .then((data3) => {
                const currLikes = data3.rows[0].likes;
                const newLikes = currLikes + 1;
                //updating the new likes of a specific postId in posts table
                client
                  .query(
                    `UPDATE posts set likes = '${newLikes}' WHERE id='${postId}';`
                  )
                  //if the likes are updated it shows a success message saying likes updated successfully
                  .then((data4) => {
                    res.status(200).json({
                      message: "Likes updated successfully",
                      newLikes,
                    });
                  })
                  //if an error happens while updating the likes it shows database error
                  .catch((err4) => {
                    console.log(err);
                    res.status(500).json({
                      message: "Database error",
                    });
                  })
                  //if the likes is not incremented it shows database error
                  .catch((err3) => {
                    res.status(500).json({
                      message: "Database error",
                    });
                  });
              })
              //if an error occurs while fetching data from posts table it shows database error
              .catch((err2) => {
                res.status(500).json({
                  message: "Database error",
                });
              });
          })
          //if an error happens in the entire liking process it shows database error
          .catch((err1) => {
            res.status(400).json({
              error: "User has already liked the post",
            });
          });
      }
    });
};


//get posts of a specific user route
exports.getPosts1 = (req, res) => {
  //selecting the rows from the posts table for a specific email
  client
    .query(`SELECT * FROM posts WHERE room = '1';`)
    .then((data) => {
      const postData = data.rows;
      const newdata = postData.map((post) => {
        //displaying  the data of that specific user
        return {
          postId: post.id,
          name: post.name,
          content: post.content,
          likes: post.likes,
        };
      });
      console.log(newdata);
      //if data is displayed successfully it shows a success message
      res.status(200).json({
        message: "Data Displayed Successfully",
        data: newdata,
      });
    })
    //if any error happens during the process it shows database error
    .catch((err) => {
      res.status(500).json({
        message: "Database error",
      });
    });
};


//get posts of a specific user route
exports.getPosts2 = (req, res) => {
  //selecting the rows from the posts table for a specific email
  client
    .query(`SELECT * FROM posts WHERE room = '2';`)
    .then((data) => {
      const postData = data.rows;
      const newdata = postData.map((post) => {
        //displaying  the data of that specific user
        return {
          postId: post.id,
          name: post.name,
          content: post.content,
          likes: post.likes,
        };
      });
      console.log(newdata);
      //if data is displayed successfully it shows a success message
      res.status(200).json({
        message: "Data Displayed Successfully",
        data: newdata,
      });
    })
    //if any error happens during the process it shows database error
    .catch((err) => {
      res.status(500).json({
        message: "Database error",
      });
    });
};


//get posts of a specific user route
exports.getPosts3 = (req, res) => {
  //selecting the rows from the posts table for a specific email
  client
    .query(`SELECT * FROM posts WHERE room = '3';`)
    .then((data) => {
      const postData = data.rows;
      const newdata = postData.map((post) => {
        //displaying  the data of that specific user
        return {
          postId: post.id,
          name: post.name,
          content: post.content,
          likes: post.likes,
        };
      });
      console.log(newdata);
      //if data is displayed successfully it shows a success message
      res.status(200).json({
        message: "Data Displayed Successfully",
        data: newdata,
      });
    })
    //if any error happens during the process it shows database error
    .catch((err) => {
      res.status(500).json({
        message: "Database error",
      });
    });
};


//get posts of a specific user route
exports.getPosts4 = (req, res) => {
  //selecting the rows from the posts table for a specific email
  client
    .query(`SELECT * FROM posts WHERE room = '4';`)
    .then((data) => {
      const postData = data.rows;
      const newdata = postData.map((post) => {
        //displaying  the data of that specific user
        return {
          postId: post.id,
          name: post.name,
          content: post.content,
          likes: post.likes,
        };
      });
      console.log(newdata);
      //if data is displayed successfully it shows a success message
      res.status(200).json({
        message: "Data Displayed Successfully",
        data: newdata,
      });
    })
    //if any error happens during the process it shows database error
    .catch((err) => {
      res.status(500).json({
        message: "Database error",
      });
    });
};


//update route
exports.updatePosts = (req, res) => {
  const postId = req.postId;
  const { content } = req.body;
  //updating the content of a corresponding postId
  client
    .query(`UPDATE posts set content = '${content}' WHERE id='${postId}';`)
    .then((data) => {
      //if content is not updated it shows a message to user to update the caption
      if (!content) {
        res.status(400).json({
          message: "Please update the caption",
        });
      }
      //if everything goes fine, it shows a success message that post is updated
      else {
        res.status(200).json({
          message: "Posts Updated Successfully",
        });
      }
    })
    //if any error occurs during the process it shows database error
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Database error",
      });
    });
};

//delete route
exports.deletePosts = (req, res) => {
  const postId = req.body.postId;
  //taking everything from posts table with a specific postId and deleting it
  client
    .query(`DELETE FROM  posts WHERE id ='${postId}';`)
    .then((data) => {
      //if post is deleted a success response is sent saying post deleted
      res.status(200).json({
        message: "Posts Deleted Successfully",
      });
    })
    //if an error occurs during the process it shows database error
    .catch((err) => {
      res.status(500).json({
        message: "Database error",
      });
    });
};

