import React, {useEffect, useState} from 'react';
import styles from '../assets/css/MyPage.module.css';
import axios from "axios";
import {useCookies} from "react-cookie";

const MyPage = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [subscribeInfo, setSubscribeInfo] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            },
        }

        axios.get('http://3.39.198.214:8080/users/me/subscriptions', config)
            .then((res) => {
                console.log('res' , res)
            })
            .catch((error) => {
                console.log("error" , error)
            })
    },[])

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.myPageTitle}>
                    안녕하세요, <span>이름</span> 님 <br/>
                    고객님과는 <span>처음보는 사이</span>입니다.
                </div>
                <div className={styles.tab}>
                    <div className={styles.active}>구독내역</div>
                    <div>정보수정</div>
                </div>
                <div className={styles.subscribeList}>
                    <div className={styles.titleBar}>
                        <div>구독상품</div>
                        <div>구독기간</div>
                        <div>월 구독료</div>
                    </div>
                    <div className={styles.listTable}>
                        <div>
                            <div>상품이미지</div>
                            <div>상품명</div>
                        </div>
                        <div>20xx~20xx</div>
                        <div>12,345 원</div>
                    </div>
                </div>
                <div className={styles.modify}>
                    정보수정
                </div>
            </div>
        </div>
    )
}

export default MyPage;