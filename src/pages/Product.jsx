import React, {useEffect, useState} from 'react';
import styles from '../assets/css/Product.module.css';
import axios from "axios";
import { useParams } from "react-router-dom";
import { RePrice } from '../util/RePrice';
import {useCookies} from "react-cookie";

const Product = () => {

    const { productId } = useParams();
    const [productInfo, setProductInfo] = useState([]);
    const [selectMonth, setSelectMonth] = useState(60);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [isLogin, setIsLogin] = useState(false);


    const addSubscribe = () => {
        const data = {
            "monthly_price": productInfo.price / selectMonth,
            "period": selectMonth,
        }

        console.log('data', data)

        // axios.post('http://3.39.198.214:8080/users/me', data)
        //     .then((res) => {
        //         console.log('res' , res)
        //     })
        //     .catch((error) => {
        //         console.log('error-addSubscribe', error)
        //     })
    }


    useEffect(() => {

        if(cookies.token !== undefined) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }

        axios.get(`http://3.39.198.214:8080/products/${productId}`)
            .then((res) => {
                console.log('product' , res.data);

                setProductInfo(res.data);
            })
            .catch((error) => { console.log('error', error) });
    }, [])

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.productBox}>
                    <div className={styles.productImage}>
                        {
                            productInfo && productInfo?.image_urls?.map((dataUrl, index) => {
                                return (
                                    <img src={dataUrl} alt={dataUrl} key={index} />
                                )
                            })
                        }
                    </div>
                    <div className={styles.productPrice}>
                        <div>{productInfo?.brand?.name} {productInfo?.category?.name}</div>
                        <div>{productInfo?.name}</div>
                        <div className={styles.flex}>
                            <div className={styles.title}>
                                구독 개월 수
                            </div>
                            <select value={selectMonth} onChange={(e) => setSelectMonth(e.target.value)}>
                                {
                                    productInfo && productInfo.subscription_periods?.map((month, index) => {
                                        return (
                                            <option key={month} value={month}>{month} 개월</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className={styles.flex}>
                            <div className={styles.title}>월 구독료</div>
                            <div>{RePrice(Math.floor(productInfo?.price / selectMonth))} 원</div>
                        </div>
                        <div className={styles.flex}>
                            { isLogin && <button className={styles.confirm} onClick={addSubscribe} >구독 신청하기</button> }
                            {/*<button className={styles.cart}>장바구니</button>*/}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.border} />
            <div className={styles.container}>
                <div className={`${styles.tab} ${styles.tab1}`}>
                    <div className={styles.active}>상품정보</div>
                    <div className={styles.right}>유의사항</div>
                    <div className={styles.right}>상품후기(0)</div>
                    <div>상품문의(0)</div>
                </div>
                <div className={styles.detailInfo}>
                    {
                        productInfo && productInfo?.image_urls?.map((dataUrl, index) => {
                            return (
                                <img src={dataUrl} alt={dataUrl} key={index} />
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.border} />
            <div className={styles.container}>
                <div className={`${styles.tab} ${styles.tab2}`}>
                    <div className={styles.right}>상품정보</div>
                    <div className={`${styles.active} ${styles.right}`}>유의사항</div>
                    <div className={styles.right}>상품후기(0)</div>
                    <div>상품문의(0)</div>
                </div>

                <div className={styles.notice}>
                    { productInfo && productInfo.description }
                </div>

            </div>
            <div className={styles.border} />
            <div className={styles.container}>
                <div className={`${styles.tab} ${styles.tab3}`}>
                    <div className={styles.right}>상품정보</div>
                    <div className={styles.right}>유의사항</div>
                    <div className={`${styles.active} ${styles.right}`}>상품후기(0)</div>
                    <div>상품문의(0)</div>
                </div>
                <div className={styles.review}>
                    <div>
                        <div></div>
                        <div className={styles.title}>
                            REVIEW
                        </div>
                        <div className={styles.btnBox}>
                            <button>WRITE</button>
                            <button>LIST</button>
                        </div>
                    </div>
                    <div className={styles.board}>게시물이 없습니다.</div>
                </div>
            </div>
            <div className={styles.border} />
            <div className={styles.container}>
                <div className={`${styles.tab} ${styles.tab4}`}>
                    <div className={styles.right}>상품정보</div>
                    <div className={styles.right}>유의사항</div>
                    <div className={styles.right}>상품후기(0)</div>
                    <div className={styles.active}>상품문의(0)</div>
                </div>

                <div className={styles.qna}>
                    <div>
                        <div></div>
                        <div className={styles.title}>
                            Q & A
                        </div>
                        <div className={styles.btnBox}>
                            <button>WRITE</button>
                            <button>LIST</button>
                        </div>
                    </div>
                    <div className={styles.board}>게시물이 없습니다.</div>
                </div>
            </div>
        </div>
    )
}

export default Product;