const useDeleteComment = ()=>{
    async function deleteComment(cmntId)
    {
        try {
            await fetch(
                `http://localhost:5000/api/comment/${cmntId}`,
                {
                  method: "DELETE"
                }
              );
        } catch (error) {
            console.error(error);
        }
    }
    return deleteComment;
}
export default  useDeleteComment;