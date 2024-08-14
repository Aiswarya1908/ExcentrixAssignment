import React from 'react';
// import styles from './styles.module.css';
import styles from '../styles/styles.css';

const FileList = ({ files }) => {
    return (
        <ul className={styles.file_list}>
            {files.map((file) => (
                <li key={file._id}>
                    <a href={`http://localhost:8080/uploads/${file.filename}`} download>
                        {file.filename}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default FileList;
