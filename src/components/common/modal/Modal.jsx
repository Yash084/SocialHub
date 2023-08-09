import React, { useState } from 'react';
import { Modal, Button, Progress } from 'antd';
import './Modal.scss';
import { AiOutlinePicture } from "react-icons/ai";
import TextArea from 'antd/es/input/TextArea';

const ModalComponent = ({ 
    modalOpen, 
    setModalOpen, 
    setStatus, 
    status, 
    sendStatus, 
    isEdit, 
    updateStatus, 
    uploadPostImage, 
    setPostImage, 
    postImage, 
    currentPost 
}) => {


    const [progress, setProgress] = useState(0);

    return (
        <>
            <Modal
                title="Create a post"
                centered
                open={modalOpen}
                onOk={() => {
                    setStatus('')
                    setModalOpen(false)
                    setPostImage("")
                }}
                onCancel={() => {
                    setStatus('');
                    setModalOpen(false)
                    setPostImage("")
                }}
                footer={[
                    <Button
                        onClick={isEdit ? updateStatus : sendStatus}
                        key="submit"
                        type="primary"
                        disabled={status.length > 0 ? false : true}
                    >
                        {isEdit ? "Update" : "Post"}
                    </Button>,
                ]}
            >
                <div className='posts-body'>
                    <TextArea
                        rows={3}
                        cols={3}
                        className='modal-input'
                        type="text"
                        placeholder='what do you want to talk about?'
                        onChange={(event) => setStatus(event.target.value)}
                        value={status}
                    />

                    {progress === 0 || progress === 100 ? <></> : <div className='progress-bar'>
                        <Progress type="circle" percent={progress} />
                    </div>}

                    {postImage?.length > 0 || currentPost?.postImage?.length ? (
                        <img
                            className="preview-image"
                            src={postImage || currentPost?.postImage}
                            alt="postImage"
                        />
                    ) : (
                        <></>
                    )}
                </div>
                <label for="pic-upload">
                    <AiOutlinePicture size={35} className="pitcure-icon" />
                </label>
                <input
                    id="pic-upload"
                    type={"file"}
                    hidden
                    onChange={(event) =>
                        uploadPostImage(event.target.files[0], setPostImage, setProgress)
                    }
                />
            </Modal>
        </>
    );
};

export default ModalComponent;