const useAddComment = () => {
    async function addComment(commentData) {
      try {
         await fetch("http://localhost:5000/api/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        });
      } catch (error) {
        console.error(error);
      }
    }
  
    return addComment;
  };
  
  export default useAddComment;
  