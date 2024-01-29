/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import useAddComment from '../hooks/useAddComment.mjs';
import styles from '../assets/CreateBlogForm.module.css';

export default function AddComment({blogId}) {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const addComment =  useAddComment();

  function handNameChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleBodyChange(e) {
    e.preventDefault();
    setBody(e.target.value);
  }
  function handleEmailChange(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }
  async function handleCommentSubmit(e) {
    e.preventDefault();
    const commentData = {
        blogId: blogId,
        name: name,
        email: email,
        body: body
    };
    try {
      await addComment(commentData);
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
      <div className="modal-container add-a-cmnt">
        <button className={styles['modal-btn']} onClick={openModal}>
         Add a comment
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
                  <form className={styles.form} onSubmit={handleCommentSubmit}>
                    <h1 className={styles.h1}>Write new comment</h1>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Name"
                      onChange={handNameChange}
                    />
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Email"
                      onChange={handleEmailChange}
                    />
                    <textarea
                      className={styles.textarea}
                      rows={4}
                      cols={50}
                      placeholder={'Enter Comment Here...'}
                      onChange={handleBodyChange}
                    />
                    <button className={styles.button}>Submit</button>
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
