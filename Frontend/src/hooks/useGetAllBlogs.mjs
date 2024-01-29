/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// Custom hook for fetching dishes
const useFetchBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    // Fetch products from the server
    fetch("http://localhost:5000/api/blog")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        else console.log("Successfully fetched dishes")
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        setBlogs(data.blogs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return {blogs, setBlogs};
};

export default useFetchBlogs;