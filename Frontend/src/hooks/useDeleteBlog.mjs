const useDeleteBlog = ()=>{
    async function deleteBlog(blogId)
    {
        try {
            await fetch(
                `http://localhost:5000/api/${blogId}`,
                {
                  method: "DELETE"
                }
              );
        } catch (error) {
            console.error(error);
        }
    }
    return deleteBlog;
}
export default  useDeleteBlog;