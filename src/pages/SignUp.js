import React from 'react';
import styles from '../assets/css/SignUp.module.css';
import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel, FormGroup} from "@mui/material";

const SignUp = () => {
    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.title}>회원가입</div>
                <div className={styles.inputWrap}>
                    <div className={styles.title}>아이디</div>
                    <div className={styles.inputDiv}>
                        <input type={"text"}  placeholder={"아이디"} />
                    </div>
                </div>
                <div className={styles.inputWrap}>
                    <div className={styles.title}>비밀번호</div>
                    <div className={styles.inputDiv}>
                        <input type={"password"}  placeholder={"비밀번호 8자 이상"} />
                    </div>
                </div>
                <div className={styles.inputWrap}>
                    <div className={styles.title} />
                    <div className={styles.inputDiv}>
                        <input type={"password"}  placeholder={"비밀번호 확인"} />
                    </div>
                </div>
                <div className={styles.inputWrap}>
                    <div className={styles.title}>닉네임</div>
                    <div className={styles.inputDiv}>
                        <input type={"text"}  placeholder={"닉네임을 입력해주세요."} />
                    </div>
                </div>
                <div className={styles.inputWrap}>
                    <div className={styles.title}>이름</div>
                    <div className={styles.inputDiv}>
                        <input type={"text"}  placeholder={"반드시 실명을 입력해주세요."} />
                    </div>
                </div>
                <div className={styles.agreement}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox color="secondary" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} label="[필수] 이용약관 동의" />
                    </FormGroup>
                </div>
                <div className={styles.signUpBtn}>
                    <button>가입하기</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;