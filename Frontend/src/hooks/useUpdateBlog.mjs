
const useUpdateBlog = () => {
  async function updateBlog(blogData) {
    try {
     const response = await fetch("http://localhost:5000/api/blog", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });
      const blogs = await response.json();
      return blogs
    } catch (error) {
      console.error(error);
    }
  }

  return updateBlog;
};

export default  useUpdateBlog;
