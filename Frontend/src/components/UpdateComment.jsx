/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import useUpdateComment from '../hooks/useUpdateComment.mjs';
import styles from '../assets/CreateBlogForm.module.css';

export default function UpdateComment({ cmntId }) {
    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const modalRef = useRef(null);
    const updateComment = useUpdateComment();
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

    async function handleupdate(e) {
        e.preventDefault();

        const commentData = {
            commentId: cmntId,
            name: name,
            email: email,
            body: body
        };
        try {
            await updateComment(commentData);
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
                    Update Comment
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
                                        <h1 className={styles.h1}>Update comment</h1>
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
