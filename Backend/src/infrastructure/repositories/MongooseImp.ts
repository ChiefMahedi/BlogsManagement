import createBlogDTO from "../../dtos/CreateBlogDTO";
import CreateCommentDTO from "../../dtos/CreateCommentDTO";
import UpdateBlogDTO from "../../dtos/UpdateBlogDTO";
import UpdateCommentDTO from "../../dtos/UpdateCommentDTO";
import BlogPresenter from "../../presenters/BlogPresenter";
import CommentPresenter from "../../presenters/CommentPresenter";
import IUserRepository from "../../repositories/UserRepositores";
import Blog from "../../infrastructure/Models/Blog";
import Comment from "../../infrastructure/Models/Comment";
export default class MongooseImp implements IUserRepository{
    async createBlog(createBlogDTO: createBlogDTO): Promise<BlogPresenter> {
        try {
            const { userId, title, body } = createBlogDTO;
            console.log(createBlogDTO)
            const blog = new Blog({
                userId: Number(userId),
                title,
                body,
            })
            const blogSaved = await await blog.save();
            const blogPresenter: BlogPresenter = {
                blogId: blogSaved._id.toString(),
                userId: blogSaved.userId.toString(),
                title: String(blogSaved.title), // Explicitly cast to string
                body: String(blogSaved.body), // Explicitly cast to string
                comments: blogSaved.comments ? blogSaved.comments.map(String) : [], // Cast each comment to string
            };
            return blogPresenter;
        } catch (error) {
            throw new Error("Error creating blog: " + error.message);
        }
    }
    async updateBlog(updateBlogDTO: UpdateBlogDTO): Promise<BlogPresenter> {
        try {
            const { blogId, title, body } = updateBlogDTO;
            const existingBlog = await Blog.findById(blogId);

            if (!existingBlog) {
                throw new Error(`Blog with ID ${blogId} not found.`);
            }
            existingBlog.title = title;       
            existingBlog.body = body;
            const blog = await existingBlog.save();
            const blogPresenter: BlogPresenter = {
                blogId: blog._id.toString(),
                userId: blog.userId.toString(),
                title: String(blog.title), // Explicitly cast to string
                body: String(blog.body), // Explicitly cast to string
                comments: blog.comments ? blog.comments.map(String) : [], // Cast each comment to string
            };
            return blogPresenter;
        } catch (error) {
            throw new Error("Error updating blog: " + error.message);
        }
    }
    async deleteBlog(blogId: String): Promise<Boolean> {
        try {
            const existingBlog = await Blog.findById(blogId);
            if (!existingBlog) {
                throw new Error(`Blog with ID ${blogId} not found.`);
            }
            await existingBlog.deleteOne();
            return true;
        } catch (error) {
            throw new Error("Error deleting blog: " + error.message);
        }
    }
    async getBlog(blogId: string): Promise<BlogPresenter> {
        try {
            const blog = await Blog.findById(blogId);
            if (!blog) {
                throw new Error(`Blog with ID ${blogId} not found.`);
            }
    
            const blogPresenter: BlogPresenter = {
                blogId: blog._id.toString(),
                userId: blog.userId.toString(),
                title: String(blog.title), // Explicitly cast to string
                body: String(blog.body), // Explicitly cast to string
                comments: blog.comments ? blog.comments.map(String) : [], // Cast each comment to string
            };
    
            return blogPresenter;
        } catch (error) {
            throw new Error("Error getting blog: " + error.message);
        }
    }
    async getBlogs(): Promise<BlogPresenter[]> {
        try {
            const blogs = await Blog.find();
            const blogPresenters: BlogPresenter[] = blogs.map((blog) => ({
                blogId: blog._id.toString(),
                userId: blog.userId.toString(),
                title: String(blog.title), 
                body: String(blog.body), 
                comments: blog.comments ? blog.comments.map(String) : [], 
            }));
    
            return blogPresenters;
        } catch (error) {
            throw new Error("Error getting blogs: " + error.message);
        }
    }
    async createComment(createCommentDTO: CreateCommentDTO): Promise<CommentPresenter> {
        try {
            const { blogId, name, email, body } = createCommentDTO;
            const newComment = new Comment({
                blogId,
                name,
                email,
                body,
            });
            const savedComment = await newComment.save();
            const commentPresenter: CommentPresenter = {
                commentId: savedComment._id.toString(),
                blogId: savedComment.blogId.toString(),
                name: savedComment.name,
                email: savedComment.email,
                body: savedComment.body,
            };
            return commentPresenter;
        } catch (error) {
            throw new Error("Error creating comment: " + error.message);
        }
    }
    async updateComment(updateCommentDTO: UpdateCommentDTO): Promise<CommentPresenter> {
        try {
            const { commentId, body, name, email } = updateCommentDTO;
            const comment = await Comment.findById(commentId);
            if (!comment) {
                throw new Error(`Comment with ID ${commentId} not found.`);
            }
            comment.body = body;
            comment.name = name;
            comment.email = email;
            const updatedComment = await comment.save();
            const commentPresenter: CommentPresenter = {
                commentId: updatedComment._id.toString(),
                blogId: updatedComment.blogId.toString(),
                name: updatedComment.name,
                email: updatedComment.email,
                body: updatedComment.body,
            };

            return commentPresenter;
        } catch (error) {
            throw new Error("Error updating comment: " + error.message);
        }
    }
    async deleteComment(commentId: String): Promise<boolean> {
        try {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                throw new Error(`Comment with ID ${commentId} not found.`);
            }
            const deletionResult =  await comment.deleteOne();
            if (deletionResult.deletedCount === 1) {
                return true;
            } else {
                throw new Error(`Error deleting comment with ID ${commentId}.`);
            }
        } catch (error) {
            throw new Error("Error deleting comment: " + error.message);
        }
    }
    async getBlogsComments(blogId: String): Promise<CommentPresenter[]> {
        try {
            const comments = await Comment.find({ blogId });
            const commentPresenters: CommentPresenter[] = comments.map(comment => ({
                commentId: comment._id.toString(),
                blogId: comment.blogId.toString(),
                name: comment.name,
                email: comment.email,
                body: comment.body,
            }));

            return commentPresenters;
        } catch (error) {
            throw new Error("Error getting blog comments: " + error.message);
        }
    }
    
}