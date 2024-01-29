import CreateBlogDTO from "../dtos/CreateBlogDTO";
import CreateCommentDTO from "../dtos/CreateCommentDTO";
import UpdateBlogDTO from "../dtos/UpdateBlogDTO";
import UpdateCommentDTO from "../dtos/UpdateCommentDTO";
import BlogPresenter from "../presenters/BlogPresenter";
import CommentPresenter from "../presenters/CommentPresenter";

export default interface IUserRepository{
    createBlog(createBlogDTO: CreateBlogDTO): Promise<BlogPresenter>;
    updateBlog(updateBlogDTO: UpdateBlogDTO ): Promise<BlogPresenter>;
    deleteBlog(blogId: String): Promise<Boolean>;
    getBlog(blogId: String): Promise<BlogPresenter>;
    getBlogs():Promise<BlogPresenter[]>;

    createComment(createCommentDTO: CreateCommentDTO): Promise<CommentPresenter>;
    updateComment(updateCommentDTO: UpdateCommentDTO) :Promise<CommentPresenter>;
    deleteComment(commentId: String): Promise<boolean>;
    getBlogsComments(blogId: String): Promise<CommentPresenter[]>;
}