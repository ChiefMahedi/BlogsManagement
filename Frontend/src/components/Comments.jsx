/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import UpdateComment from './UpdateComment';
import DeleteComment from './DeleteComment';

export default function Comments({ blogId }) {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const localStorageComments = localStorage.getItem(`comments_${blogId}`);
        if (localStorageComments) {
          console.log("Comments found on localstorage");
          setComments(JSON.parse(localStorageComments));
          return; 
        }
        console.log("Comments was not found on localstorage");
        const response = await fetch(`http://localhost:5000/api/comment/${blogId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch comments. Status: ${response.status}`);
        }

        const commentsData = await response.json();
        setComments(commentsData.comments);
        localStorage.setItem(`comments_${blogId}`, JSON.stringify(commentsData.comments));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [blogId]);

  return (
    <>
      <div>
        {comments && comments.map((comment) => (
          <div key={comment.commentId}>
            <div>
              <p style={{ padding: '3px' }}>
                <b>Commenter Name:</b> {comment.name}
              </p>
              <p style={{ padding: '3px' }}>
                <b>Email:</b> {comment.email}
              </p>
              <p style={{ padding: '3px' }}>
                <b>Comment:</b> {comment.body}
              </p>
            </div>
            <UpdateComment cmntId={comment.commentId} />
            <DeleteComment cmntId={comment.commentId}/>
          </div>
        ))}
      </div>
    </>
  );
}
