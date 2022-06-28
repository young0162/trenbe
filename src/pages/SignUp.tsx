import React, { useState } from 'react';
import styles from '../assets/css/SignUp.module.css';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormGroup } from '@mui/material';
import axios from 'axios';
import { ISignInfo } from '../util/db';

const SignUp = () => {
  const [signUpInfo, setSignUpInfo] = useState<ISignInfo | null>({
    phone1: '010',
  });
  const [passwordLength, setPasswordLength] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const getInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = e.target.value;
    setSignUpInfo({ ...signUpInfo, [type]: value });

    if (type === 'password') {
      if (value.length < 8) {
        setPasswordLength(true);
      } else {
        setPasswordLength(false);
      }

      if (
        signUpInfo?.passwordCheck &&
        signUpInfo?.passwordCheck?.length > 0 &&
        value !== signUpInfo?.passwordCheck
      ) {
        setPasswordCheck(true);
      } else {
        setPasswordCheck(false);
      }
    }

    if (type === 'passwordCheck' && value !== signUpInfo?.password) {
      setPasswordCheck(true);
    } else if (type === 'passwordCheck' && value === signUpInfo?.password) {
      setPasswordCheck(false);
    }
  };

  const sendSignUp = () => {
    const data = {
      email: signUpInfo?.id,
      nick_name: signUpInfo?.nickname,
      password: signUpInfo?.password,
      phone:
        signUpInfo?.phone1 &&
        signUpInfo?.phone1 + signUpInfo?.phone2 + signUpInfo.phone3,
      received_marketing_agreed:
        signUpInfo?.marketing === undefined ? false : signUpInfo?.marketing,
    };

    if (passwordCheck || passwordLength) {
      alert('비밀번호를 확인해주세요.');
      return;
    }

    if (!signUpInfo?.agree) {
      return alert('필수 이용약관에 동의 해주세요.');
    }

    axios
      .post('http://3.39.198.214:8080/users/sign-up/', data)
      .then(res => {
        if (res && res.status === 200) {
          alert('회원가입에 성공 하였습니다.');
          window.location.href = '/';
        } else {
          alert('회원가입에 실패 하였습니다.');
        }
      })
      .catch(error => {
        console.log('sign-up-error', error);
      });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.title}>회원가입</div>
        <div className={styles.inputWrap}>
          <div className={styles.title}>아이디</div>
          <div className={styles.inputDiv}>
            <input
              type={'text'}
              onChange={e => getInputValue(e, 'id')}
              placeholder={'아이디'}
            />
          </div>
        </div>
        <div className={styles.inputWrap}>
          <div className={styles.title}>비밀번호</div>
          <div className={styles.inputDiv}>
            <input
              type={'password'}
              onChange={e => getInputValue(e, 'password')}
              placeholder={'비밀번호 8자 이상'}
            />
            {passwordLength && (
              <div className={styles.passwordTip}>
                비밀번호를 8자 이상 입력해주세요.
              </div>
            )}
          </div>
        </div>
        <div className={styles.inputWrap}>
          <div className={styles.title} />
          <div className={styles.inputDiv}>
            <input
              type={'password'}
              onChange={e => getInputValue(e, 'passwordCheck')}
              placeholder={'비밀번호 확인'}
            />
            {passwordCheck && (
              <div className={styles.passwordTip}>
                비밀번호가 일치하지 않습니다.
              </div>
            )}
          </div>
        </div>
        <div className={styles.inputWrap}>
          <div className={styles.title}>닉네임</div>
          <div className={styles.inputDiv}>
            <input
              type={'text'}
              onChange={e => getInputValue(e, 'nickname')}
              placeholder={'닉네임을 입력해주세요.'}
            />
          </div>
        </div>
        <div className={styles.inputWrap}>
          <div className={styles.title}>이름</div>
          <div className={styles.inputDiv}>
            <input
              type={'text'}
              onChange={e => getInputValue(e, 'name')}
              placeholder={'반드시 실명을 입력해주세요.'}
            />
          </div>
        </div>
        <div className={styles.inputWrap}>
          <div className={styles.title}>연락처</div>
          <div className={`${styles.inputDiv} ${styles.flex}`}>
            <select
              onChange={e =>
                setSignUpInfo({ ...signUpInfo, phone1: e.target.value })
              }
              value={signUpInfo?.phone1}
            >
              <option value={'010'}>010</option>
              <option value={'011'}>011</option>
            </select>
            &nbsp;-&nbsp;
            <input type={'text'} onChange={e => getInputValue(e, 'phone2')} />
            &nbsp;-&nbsp;
            <input type={'text'} onChange={e => getInputValue(e, 'phone3')} />
          </div>
        </div>
        <div className={styles.agreement}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  onChange={e => getInputValue(e, 'agree')}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              }
              label="[필수] 이용약관 동의"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  onChange={e => getInputValue(e, 'marketing')}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              }
              label="[선택] 마켓팅 수집 및 이용동의"
            />
          </FormGroup>
        </div>
        <div className={styles.signUpBtn}>
          <button onClick={sendSignUp}>가입하기</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
