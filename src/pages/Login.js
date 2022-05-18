import React from 'react';
import styles from '../assets/css/Login.module.css';

const Login = () => {
    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.title}>로그인</div>
                <div className={styles.id}>
                    <span>아이디</span>
                    <input type={"text"} placeholder={"아이디"} />
                </div>
                <div className={styles.password}>
                    <span>비밀번호</span>
                    <input type={"password"} placeholder={"비밀번호"} />
                </div>
            </div>
        </div>
    )
}

export default Login;