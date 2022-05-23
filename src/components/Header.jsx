import React, { useEffect, useState } from "react";
import styles from "../assets/css/Header.module.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isLogin, setIsLogin] = useState(false);
  const [brand, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  };

  const logOut = () => {
    removeCookie("token");
    window.location.href = "/";
  };

  const getAllBrands = () => {
    axios
      .get("http://3.39.198.214:8080/brands")
      .then((res) => {
        setBrands(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getAllCategories = () => {
    axios
      .get("http://3.39.198.214:8080/categories")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    if (cookies.token !== undefined) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    getAllBrands();
    getAllCategories();
  }, []);

  return (
    <div className={styles.header_wrap}>
      <div className={styles.header_inner}>
        <div className={styles.header_flex}>
          <div className={styles.logo}>
            <Link to={"/"}>trenㆍbe</Link>
          </div>
          <div className={styles.mypage_menu}>
            <div className={styles.login}>
              {isLogin === true ? (
                <>
                  <button onClick={logOut}>로그아웃</button>
                  <Link to={"/myPage"}>마이페이지</Link>
                </>
              ) : (
                <Link to={"/login"}>로그인</Link>
              )}
            </div>
          </div>
        </div>
        <div className={`${styles.header_flex} ${styles.category_flex}`}>
          <div className={styles.flex}>
            {categories &&
              categories?.map((data, index) => {
                return (
                  <div key={index}>
                    <Link to={`/category/${data.name}/all`}>{data.name}</Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
