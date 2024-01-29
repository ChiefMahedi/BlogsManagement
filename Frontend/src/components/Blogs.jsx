/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import useFetchBlogs from '../hooks/useGetAllBlogs.mjs';
import styles from '../assets/Blogs.module.css'
import UpdateBlog from './UpdateBlog';
import DeleteBlog from './DeleteBlog';
import { Link } from 'react-router-dom';
export default function Blogs() {
  const{blogs, setBlogs} = useFetchBlogs();
  return (
    <>
      <div className={styles["menu-container"]}>
        {blogs.map((blog) => (
          <div key={blog.blogId} className={styles["card"]}>
            <div className={styles["container"]}>
              <p style={{ padding: "3px" }}>
                {" "}
                <b>Blog Title:</b>
                {blog.title}
              </p>
              <p style={{ padding: "3px" }}>
                <b>Blog Content:</b> {blog.body}
              </p>
            </div>
            <Link to={`/blog/${blog.blogId}`}>
              <button style={{ marginRight: '5px' }}>View Full Blog</button>
            </Link>
            <UpdateBlog blogId={blog.blogId}/>
            <DeleteBlog blogId={blog.blogId}/>
          </div>
        ))}
      </div>
    </>
  );
}
