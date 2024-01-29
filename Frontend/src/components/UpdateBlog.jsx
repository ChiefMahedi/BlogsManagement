/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import useUpdateBlog from '../hooks/useUpdateBlog.mjs';
import styles from '../assets/CreateBlogForm.module.css';

export default function UpdateBlog({blogId}) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const updateBlog = useUpdateBlog();

  function handTitleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleBodyChange(e) {
    e.preventDefault();
    setBody(e.target.value);
  }

  async function handleupdate(e) {
    e.preventDefault();

    const blogData = {
      blogId: blogId,
      title: title,
      body: body,
    };

    try {
      await updateBlog(blogData);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  }

  const openModal = (e) => {
    e.preventDefault();
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && event.target === modalRef.current) {
      closeModal();
    }
  };

  return (
    <>
      <div className="modal-container">
        <button className={styles['modal-btn']} onClick={openModal}>
          Update Blog
        </button>
        {modalVisible && (
          <div
            id="myModal"
            className={styles['modal']}
            onClick={handleOutsideClick}
            ref={modalRef}
          >
            <div className={styles['modal-content']}>
              <div className={styles['container']} id="container">
                <div className={styles['form-container']}>
                  <form className={styles.form} onSubmit={handleupdate}>
                    <h1 className={styles.h1}>  Update Blog</h1>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Blog Title"
                      onChange={handTitleChange}
                    />
                    <textarea
                      className={styles.textarea}
                      rows={4}
                      cols={50}
                      placeholder={'Enter Blog Content Here...'}
                      onChange={handleBodyChange}
                    />
                    <button className={styles.button}>  Update Blog</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
