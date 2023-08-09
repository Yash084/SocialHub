import React from 'react';
import { Button, Modal, Progress } from 'antd';
import "./FileUploadModal.scss"

const FileUploadModal = ({ modalOpen, setModalOpen, getImage, uploadImage, currentImage, progress}) => {
    return (
        <div>
            <Modal
                title="Add a profile pitcure"
                centered
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                footer={[
                    <Button
                        disabled={currentImage.name ? false : true}
                        key="submit" type="primary" onClick={uploadImage} >
                        Upload Profile Pitcure
                    </Button>,

                ]}
            >
                <div className='image-upload-main'>
                    <label className='upload-btn' htmlFor='image-upload'>Add an Image</label>
                    <p>{currentImage.name}</p>
                    {
                        progress === 0 ?
                            <></> :
                            <div className='progress-bar'>
                                <Progress type="circle" percent={progress} />
                            </div>
                    }
                    <input hidden type={"file"} name="" id="image-upload" onChange={getImage} />
                </div>
            </Modal>
        </div>
    );
}

export default FileUploadModal;



