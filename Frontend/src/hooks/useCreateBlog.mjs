const useCreateBlog = () => {
  async function createBlog(blogData) {
    try {
       await fetch("http://localhost:5000/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });
    } catch (error) {
      console.error(error);
    }
  }

  return createBlog;
};

export default useCreateBlog;
