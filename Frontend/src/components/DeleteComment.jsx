/* eslint-disable react/prop-types */
import styles from '../assets/DeletBlog.module.css'
import { useState, useRef } from "react";
import useDeleteComment from '../hooks/useDeleteComment.mjs';
export default function DeleteComment({cmntId})
{
    const [modalVisible, setModalVisible] = useState(false);
    const modalRef = useRef(null);
    const deleteBlog = useDeleteComment();
    async function handleDelete(e) {
      e.preventDefault();
      try {
        await deleteBlog(cmntId);
      } catch (error) {
        console.error("Error removing blog:", error);
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
        <>
          {/* Trigger/Open The Modal */}
          <button onClick={openModal}>Delete Comment</button>
          {/* The Modal */}
          {modalVisible && (
            <div
              id="myModal"
              className={styles["modal"]}
              onClick={handleOutsideClick}
              ref={modalRef}
            >
              {/* Modal content */}
              <div className={styles["modal-content"]}>
                <div className={styles["container"]} id="container">
                      <h1 className={styles.h1}>Remove Comment?</h1>
                      <button className={styles.button} onClick={handleDelete}>Remove</button>
                </div>
              </div>
            </div>
          )}
        </>
      </>
    );
}