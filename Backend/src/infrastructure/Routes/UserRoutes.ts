import express from 'express';
import UserController from '../../infrastructure/Controllers/UserController';
import UserUseCase from '../../useCases/UserUseCases';
import MongooseImp from '../../infrastructure/repositories/MongooseImp';
import CreateBlogDTO from '../../dtos/CreateBlogDTO';
import UpdateBlogDTO from '../../dtos/UpdateBlogDTO';
import CreateCommentDTO from '../../dtos/CreateCommentDTO';
import UpdateCommentDTO from '../../dtos/UpdateCommentDTO';

const router = express.Router();
const mongooseImp = new MongooseImp()
const userUseCase = new UserUseCase(mongooseImp);
const userController = new UserController(userUseCase);
router.get('/test', async (req, res)=>{
    res.send("Hello server is working");
})
router.post('/blog', async (req, res)=>{
    const {title , body} = req.body;
    const userId = 1;
    const createBlogDTO = new CreateBlogDTO();
    createBlogDTO.title = title;
    createBlogDTO.body = body;
    createBlogDTO.userId = userId;
    const newBlog = await userController.createBlogController(createBlogDTO);
    if(newBlog)
    {
        return res
        .status(201)
        .json({
          message: "Blog creation was successful",
          status: "201",
          newBlog
        });
    }
    else {
        return res
        .status(500)
        .json({
          message: "Blog creation falied",
          status: "500",
        });
    }
})
router.get('/blog', async (req, res)=>{
    const blogs = await userController.getBlogsController();
    if(blogs )
    {
        return res
        .status(201)
        .json({
          message: "Blogs fetch successful",
          status: "201",
          blogs 
        });
    }
    else {
        return res
        .status(500)
        .json({
          message: "Blog fetch failed",
          status: "500",
        });
    }
})
router.put('/blog', async(req, res)=>{
    console.log(req.body)
    const {blogId, title, body} = req.body;
    const updateBlogDTO = new UpdateBlogDTO();
    updateBlogDTO.blogId = blogId;
    updateBlogDTO.title = title;
    updateBlogDTO.body = body;
    const blog = await userController.updateBlogController(updateBlogDTO);
    if(blog )
    {
        return res
        .status(201)
        .json({
          message: "Blog update successful",
          status: "201",
          blog
        });
    }
    else {
        return res
        .status(500)
        .json({
          message: "Blog update failed",
          status: "500",
        });
    }
})
router.delete('/:blogId', async (req, res)=>{
    const id = req.params.blogId;
    const status = await userController.deleteBlogController(id);
    if(status){
        return res
        .status(201)
        .json({
          message: "Blog delete successful",
          status: "201",
        });
    }
    else{
        return res
        .status(500)
        .json({
          message: "Blog delete failed",
          status: "500",
        });
    }
})
router.get('/:blogId', async(req, res)=>{
    const blogId =req.params.blogId;
    const blog = await userController.getBlogByIdController(blogId);
    return res
    .status(201)
    .json({
      message: "Blog delete successful",
      status: "201",
      blog
    });
})
router.post('/comment', async(req, res)=>{
    const {blogId, name, email, body} = req.body;
    const createCommentDTO = new CreateCommentDTO();
    createCommentDTO.blogId = blogId;
    createCommentDTO.body = body;
    createCommentDTO.email = email;
    createCommentDTO.name = name;
    const comment = await userController.createCommentController(createCommentDTO);
    return res
    .status(201)
    .json({
      message: "Comment successful",
      status: "201",
      comment
    });
})
router.get('/comment/:blogId', async (req, res)=>{
    console.log("Hit");
    const blogId = req.params.blogId;
    const comments = await userController.getBlogsCommentsController(blogId);
    console.log(comments);
    if(comments)
    {
        return res
        .status(201)
        .json({
          message: "Comments fetched successfully",
          status: "201",
          comments
        });
    }
    else{
        return res
        .status(500)
        .json({
          message: "Comments couldn't be fetched successfully",
          status: "500"
        });
    }
})
router.put('/comment', async(req, res)=>{
    const {commentId, name, email, body} = req.body;
    const updateCommentDTO = new UpdateCommentDTO();
    updateCommentDTO.commentId = commentId;
    updateCommentDTO.body = body;
    updateCommentDTO.email = email;
    updateCommentDTO.name = name;
    const comment = await userController.updateCommentController(updateCommentDTO);
    console.log(comment);
    if(comment)
    {
        return res
        .status(201)
        .json({
          message: "Comments updated successfully",
          status: "201",
          comment
        });
    }
    else{
        return res
        .status(500)
        .json({
          message: "Comments couldn't be updated successfully",
          status: "500"
        });
    }
})
router.delete('/comment/:cmntId', async (req, res)=>{
    const cmntId = req.params.cmntId;
    const status = await userController.deleteCommentController(cmntId);
    console.log(status);
    if(status)
    {
        return res
        .status(201)
        .json({
          message: "Comments deleted successfully",
          status: "201",
        });
    }
    else{
        return res
        .status(500)
        .json({
          message: "Comments couldn't be deleted successfully",
          status: "500"
        });
    }
})
export default router;