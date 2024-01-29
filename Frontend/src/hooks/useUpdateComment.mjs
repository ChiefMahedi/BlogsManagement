
const useUpdateComment= () => {
    async function updateComment(cmntData) {
      try {
       const response = await fetch("http://localhost:5000/api/comment", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cmntData),
        });
        const comments = await response.json();
        return comments;
      } catch (error) {
        console.error(error);
      }
    }
  
    return updateComment;
  };
  
  export default  useUpdateComment;
  