import React, { useState } from 'react';
import styles from '../assets/css/Login.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const getId = (value: string) => {
    setId(value);
  };

  const getPw = (value: string) => {
    setPw(value);
  };

  const signIn = () => {
    const data = {
      email: id,
      password: pw,
    };

    axios
      .post('http://3.39.198.214:8080/users/sign-in/', data)
      .then(res => {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + res.data.access_token;
        setCookie('token', res.data.access_token);
        window.location.href = '/';
      })
      .catch(error => {
        console.log('login-error', error);
      });
  };

  const enterLogin = (e: HTMLFormElement) => {
    if (e.key === 'Enter') {
      signIn();
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.title}>LOGIN</div>
        <div className={styles.id}>
          <span>아이디</span>
          <input
            type={'text'}
            onChange={e => getId(e.target.value)}
            placeholder={'아이디'}
          />
        </div>
        <div className={styles.password}>
          <span>비밀번호</span>
          <input
            type={'password'}
            onChange={e => getPw(e.target.value)}
            onKeyPress={e => enterLogin}
            placeholder={'비밀번호'}
          />
        </div>
        <div className={styles.signUp}>
          <div>
            <Link to={'/signUp'}>회원가입</Link>
          </div>
          <div className={styles.bar}>|</div>
          <div>아이디/비밀번호 찾기</div>
        </div>
        <div className={styles.loginBtn}>
          <button onClick={signIn}>로그인</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
