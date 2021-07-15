const express = require("express");
const {
  createPost,
  getPosts1,
  getPosts2,
  getPosts3,
  getPosts4,
  updatePosts,
   likesCount,
  deletePosts,
  
} = require("../controllers/posts");
const { verifyToken } = require("../middlewares/authMiddleware");
const { postIdParam } = require("../middlewares/postsMiddleware");
const router = express.Router();

router.param("postId", postIdParam);

router.post("/create", verifyToken, createPost);

router.get("/getposts1", verifyToken, getPosts1);

router.get("/getposts2", verifyToken, getPosts2);

router.get("/getposts3", verifyToken, getPosts3);

router.get("/getposts4", verifyToken, getPosts4);

router.put("/update/:postId", verifyToken, updatePosts);

router.delete("/delete", verifyToken, deletePosts);

router.post("/likes", verifyToken, likesCount);

module.exports = router;

//localhost:8000/posts/create
//localhost:8000/posts/uploadimage
//localhost:8000/posts/update/:postId
//localhost:8000/posts/likeposts/:postId
//localhost:8000/posts/likes
//localhost:8000/posts/getposts1
//localhost:8000/posts/getposts2
//localhost:8000/posts/getposts3
//localhost:8000/posts/getposts4

