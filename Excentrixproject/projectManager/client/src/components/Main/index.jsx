import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard';
import styles from '../Main/styles.module.css';
// import ProjectPage from '../ProjectPage';
import FileDropzone from '../DropFiles';

const Main = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logging out...'); // Debugging line
        localStorage.removeItem("token");
        navigate('/login');  // Redirect to login page after logout
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            <div className={styles.content}>
                <Dashboard />
                {/* <ProjectPage /> */}
                <FileDropzone />
            </div>
        </div>
    );
};

export default Main;
