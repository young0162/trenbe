import React, {useEffect} from "react";
import styles from "../assets/css/Header.module.css";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {Link} from "react-router-dom";


const Header = () => {


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
                            <Link to={"/login"}>
                                <PersonOutlineIcon fontSize={"inherit"} />
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;