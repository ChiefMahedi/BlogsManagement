import UserUseCase from "../../useCases/UserUseCases";
import CreateCommentDTO from "../../dtos/CreateCommentDTO";
import UpdateBlogDTO from "../../dtos/UpdateBlogDTO";
import UpdateCommentDTO from "../../dtos/UpdateCommentDTO";
import BlogPresenter from "../../presenters/BlogPresenter";
import CommentPresenter from "../../presenters/CommentPresenter";
import createBlogDTO from "../../dtos/CreateBlogDTO";

export default class UserController{
    private userUseCase: UserUseCase;
    constructor(_userUseCase: UserUseCase)
    {
        this.userUseCase = _userUseCase;
    }
    //Blog related
    async createBlogController(createBlogDTO: createBlogDTO): Promise<BlogPresenter>{
        try {
            const blog = await  this.userUseCase.createBlogUserUseCase(createBlogDTO);
            return blog ? blog: null;
        } catch (error) {
            console.log(error);
        }
    }
    async updateBlogController(updateBlogDTO: UpdateBlogDTO): Promise<BlogPresenter>{
        try {
            const blog = await  this.userUseCase.updateBlogUserUseCase(updateBlogDTO);
            return blog ? blog : null;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteBlogController(blogId: String): Promise<Boolean>
    {
        try {
            const status = await  this.userUseCase.deleteBlogUserUseCase(blogId);
            return status;
        } catch (error) {
            console.log(error);
        }
    }
    async getBlogByIdController(blogId: String): Promise<BlogPresenter>{
        try {
            const blog = await  this.userUseCase.getBlogByIdUserUseCase(blogId);
            return blog ? blog : null;
        } catch (error) {
            console.log(error);
        }
    }
    async getBlogsController():Promise<BlogPresenter[]>{
        try {
            const blogs = await  this.userUseCase.getBlogsUserUseCase();
            return blogs? blogs : null;
        } catch (error) {
            console.log(error);
        }
    }
    //Comment related
    async createCommentController(createCommentDTO: CreateCommentDTO): Promise<CommentPresenter>
    {
        try {
            const comment = await  this.userUseCase.createCommentUserUseCase(createCommentDTO);
            return comment ? comment : null
        } catch (error) {
            console.log(error);
        }
    }
    async updateCommentController(updateCommentDTO: UpdateCommentDTO): Promise<CommentPresenter>
    {
        try {
            const comment = await  this.userUseCase.updateCommentUserUseCase(updateCommentDTO);
            return comment ? comment : null;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteCommentController(commentId:string): Promise<Boolean>
    {
        try {
            const status = await  this.userUseCase.deleteCommentUserUseCase(commentId);
            return status;
        } catch (error) {
            console.log(error);
        }
    }
    async getBlogsCommentsController(blogId: string): Promise<CommentPresenter[]>
    {
        try {
            const comments = await  this.userUseCase.getBlogsComments(blogId);
            return comments ? comments : null;
        } catch (error) {
            console.log(error)
        }
    }
}