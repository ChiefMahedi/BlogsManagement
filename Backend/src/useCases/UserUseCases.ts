import createBlogDTO from "../dtos/CreateBlogDTO";
import CreateCommentDTO from "../dtos/CreateCommentDTO";
import UpdateBlogDTO from "../dtos/UpdateBlogDTO";
import UpdateCommentDTO from "../dtos/UpdateCommentDTO";
import BlogPresenter from "../presenters/BlogPresenter";
import CommentPresenter from "../presenters/CommentPresenter";
import IUserRepository from "../repositories/UserRepositores";

export default class UserUseCase{
    private userRepo: IUserRepository
    constructor(_userRepo: IUserRepository)
    {
        this.userRepo = _userRepo;
    }

    //Blog related
    async createBlogUserUseCase(createBlogDTO: createBlogDTO): Promise<BlogPresenter>{
        try {
            const blog = await this.userRepo.createBlog(createBlogDTO);
            return blog ? blog: null;
        } catch (error) {
            console.log(error);
        }
    }
    async updateBlogUserUseCase(updateBlogDTO: UpdateBlogDTO): Promise<BlogPresenter>{
        try {
            const blog = await this.userRepo.updateBlog(updateBlogDTO);
            return blog ? blog : null;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteBlogUserUseCase(blogId: String): Promise<Boolean>
    {
        try {
            const status = await this.userRepo.deleteBlog(blogId);
            return status;
        } catch (error) {
            console.log(error);
        }
    }
    async getBlogByIdUserUseCase(blogId: String): Promise<BlogPresenter>{
        try {
            const blog = await this.userRepo.getBlog(blogId);
            return blog ? blog : null;
        } catch (error) {
            console.log(error);
        }
    }
    async getBlogsUserUseCase():Promise<BlogPresenter[]>{
        try {
            const blogs = await this.userRepo.getBlogs();
            return blogs? blogs : null;
        } catch (error) {
            console.log(error);
        }
    }
    //Comment related
    async createCommentUserUseCase(createCommentDTO: CreateCommentDTO): Promise<CommentPresenter>
    {
        try {
            const comment = await this.userRepo.createComment(createCommentDTO);
            return comment ? comment : null
        } catch (error) {
            console.log(error);
        }
    }
    async updateCommentUserUseCase(updateCommentDTO: UpdateCommentDTO): Promise<CommentPresenter>
    {
        try {
            const comment = await this.userRepo.updateComment(updateCommentDTO);
            return comment ? comment : null;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteCommentUserUseCase(commentId:string): Promise<Boolean>
    {
        try {
            const status = await this.userRepo.deleteComment(commentId);
            return status;
        } catch (error) {
            console.log(error);
        }
    }
    async getBlogsComments(blogId: string): Promise<CommentPresenter[]>
    {
        try {
            const comments = await this.userRepo.getBlogsComments(blogId);
            return comments ? comments : null;
        } catch (error) {
            console.log(error)
        }
    }

}