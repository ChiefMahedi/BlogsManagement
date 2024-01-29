/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetBlog from '../hooks/useGetBlog.mjs';
import AddComment from './AddComment';
import Comments from './Comments';
const Blog = () => {
  const { blogId } = useParams();
  const getBlog = useGetBlog();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlog(blogId);
        setBlog(blogData);
      } 
      catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, []);

  return (
    <>
      {blog && (
        <>
          <div className='blog-container'>
            <h2>{blog.title}</h2>
            <p>{blog.body}</p>
            <h3>All comments</h3>
            <Comments blogId={blogId}/>
            <AddComment blogId={blogId}/>
          </div>
        </>
      )}
    </>
  );
};

export default Blog;
