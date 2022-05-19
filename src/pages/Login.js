import React from 'react';
import styles from '../assets/css/Login.module.css';
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.title}>LOGIN</div>
                <div className={styles.id}>
                    <span>아이디</span>
                    <input type={"text"} placeholder={"아이디"} />
                </div>
                <div className={styles.password}>
                    <span>비밀번호</span>
                    <input type={"password"} placeholder={"비밀번호"} />
                </div>
                <div className={styles.signUp}>
                    <div><Link to={"/signUp"}>회원가입</Link></div>
                    <div className={styles.bar}>|</div>
                    <div>아이디/비밀번호 찾기</div>
                </div>
                <div className={styles.loginBtn}>
                    <button>로그인</button>
                </div>
            </div>
        </div>
    )
}

export default Login;