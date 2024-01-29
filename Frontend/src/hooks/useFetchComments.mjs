const useFetchComments = () => {
    async function getAllComments(blogId) {
        try {
            const response = await fetch(`http://localhost:5000/api/comment/${blogId}`);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch comments. Status: ${response.status}`);
            }

            const comments = await response.json();
            return comments;
        } catch (error) {
            console.error(error);
        }
    }

    return getAllComments;
};

export default useFetchComments;
