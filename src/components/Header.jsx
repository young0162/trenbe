import React, {useEffect, useState} from "react";
import styles from "../assets/css/Header.module.css";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {Link} from "react-router-dom";
import axios from "axios";
import {useCookies} from "react-cookie";


const Header = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [isLogin, setIsLogin] = useState(false);

    const logOut = () => {
        removeCookie('token');
        window.location.reload();
    }

    useEffect(() => {
        console.log('cookie' , cookies.token !== undefined)

        if(cookies.token !== undefined) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }

        const config = {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            },
        }

        axios.get('http://3.39.198.214:8080/users/me', config)
            .then((res) => {
                if(res && res.status === 200) {

                } else {

                }
            })
            .catch((error) => {
                console.log('header-error', error)
            })
    }, []);



    return (
        <div className={styles.header_wrap}>
            <div className={styles.header_inner}>
                <div className={styles.header_flex}>
                    <div className={styles.logo}>
                        <Link to={"/"}>
                            trenㆍbe
                        </Link>
                    </div>
                    <div className={styles.mypage_menu}>
                        <div className={styles.login}>
                            { isLogin === true
                                ? <button onClick={logOut}>
                                    로그아웃
                                </button>
                                : <Link to={"/login"}>
                                    로그인
                                </Link>
                            }
                            <Link to={"/myPage"}>
                                마이페이지
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;