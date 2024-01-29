const useGetBlog = ()=>{
    async function getBlog(blogId)
    {
        try {
            const response = await fetch(
                `http://localhost:5000/api/${blogId}`,
              );
            const data = await response.json();
            console.log(data);
            return data.blog;
        } catch (error) {
            console.error(error);
        }
    }
    return getBlog;
}
export default useGetBlog;