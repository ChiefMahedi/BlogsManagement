/* eslint-disable react/prop-types */
import useDeleteBlog from "../hooks/useDeleteBlog.mjs"
import styles from '../assets/DeletBlog.module.css'
import { useState, useRef } from "react";
export default function DeleteBlog({blogId})
{
    const [modalVisible, setModalVisible] = useState(false);
    const modalRef = useRef(null);
    const deleteBlog = useDeleteBlog();
    async function handleDelete(e) {
      e.preventDefault();
      try {
        await deleteBlog(blogId);
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
          <button onClick={openModal}>Delete</button>
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
                      <h1 className={styles.h1}>Remove Blog?</h1>
                      <button className={styles.button} onClick={handleDelete}>Remove</button>
                </div>
              </div>
            </div>
          )}
        </>
      </>
    );
}