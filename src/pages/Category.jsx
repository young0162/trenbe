import React, {useEffect, useState} from 'react';
import styles from '../assets/css/Category.module.css';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {RePrice} from "../util/RePrice";

const Category = () => {

    const { category } = useParams();
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [nowBrand, setNowBrand] = useState('all');

    const getAllBrands = () => {
        axios.get('http://3.39.198.214:8080/brands')
            .then((res) => {
                setBrands(res.data.brands);
            })
            .catch((error) => { console.log('error', error) })
    }

    const getProducts = () => {
        axios.get('http://3.39.198.214:8080/products')
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((error) => { console.log('error', error) })
    }

    const changeBrand = (brand) => {
        setNowBrand(brand);
    }


    useEffect(() => {
        getAllBrands();
        getProducts();
    }, [])

    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.title}>
                    {category}
                </div>
                <div className={styles.content_wrap}>
                    <div className={styles.menuBar}>
                        <div className={styles.menuTitle}>브랜드</div>
                        <div className={styles.menu}>
                            <Link to={`/category/${category}/all`} className={`${nowBrand === 'all' ? styles.active : ''}`} onClick={() => changeBrand('all')}>
                                - &nbsp;전체
                            </Link>
                            { brands && brands.map((data, index) => {
                                return (
                                    <Link key={index} className={`${nowBrand === data.name ? styles.active : ''}`} to={`/category/${category}/${data.name}`} onClick={() => changeBrand(data.name)}>
                                        - &nbsp;{data.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.content_box}>
                        { products && products.map((data, index) => {
                            if(nowBrand === 'all') {
                                return (
                                    <div className={styles.product_item} key={data.id}>
                                        { data.category.name === category
                                            ? <Link to={`/product/${data.id}`} >
                                                <div className={styles.imgBox}>
                                                    {
                                                        data.image_urls && data.image_urls.map((imgUrls, index) => {
                                                            return (
                                                                <img src={imgUrls} alt={imgUrls} key={imgUrls} />
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className={styles.itemInfo}>
                                                    <div className={styles.brandName}>{data.brand.name} {data.category.name}</div>
                                                    <div className={styles.fullName}>{data.name}</div>
                                                    <div className={styles.price}>
                                                        월 {RePrice(data.price / 60)}원
                                                        <span className={styles.mPrice}>(60개월 기준)</span>
                                                    </div>
                                                </div>
                                            </Link>
                                            : ''
                                        }
                                    </div>
                                )
                            } else {
                                return (
                                    <div className={styles.product_item} key={index}>
                                        {
                                            data.brand.name === nowBrand && data.category.name === category
                                                ? <Link to={`/product/${data.id}`} >
                                                    <div className={styles.imgBox}>
                                                        {
                                                            data.image_urls && data.image_urls.map((imgUrls, index) => {
                                                                return (
                                                                    <img src={imgUrls} alt={imgUrls} key={imgUrls} />
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className={styles.itemInfo}>
                                                        <div className={styles.brandName}>{data.brand.name} {data.category.name}</div>
                                                        <div className={styles.fullName}>{data.name}</div>
                                                        <div className={styles.price}>
                                                            월 {RePrice(data.price / 60)}원
                                                            <span className={styles.mPrice}>(60개월 기준)</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                                : ''
                                        }
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Category;