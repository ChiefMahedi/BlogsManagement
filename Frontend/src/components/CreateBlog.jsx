import { useState, useRef } from 'react';
import useCreateBlog from '../hooks/useCreateBlog.mjs';
import styles from '../assets/CreateBlogForm.module.css';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const createBlog = useCreateBlog();

  function handTitleChange(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleBodyChange(e) {
    e.preventDefault();
    setBody(e.target.value);
  }

  async function handleDishCreationSubmit(e) {
    e.preventDefault();

    const blogData = {
      title: title,
      body: body,
    };

    try {
      await createBlog(blogData);
    } catch (error) {
      console.error('Error adding blog:', error);
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
          Create a new Blog
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
                  <form className={styles.form} onSubmit={handleDishCreationSubmit}>
                    <h1 className={styles.h1}>Create A New Blog!</h1>
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
                    <button className={styles.button}>Create Blog</button>
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
