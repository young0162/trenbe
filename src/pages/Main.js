import React from "react";
import styles from "../assets/css/Main.module.css";

const Main = () => {
    return (
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.product_title}>#NEW</div>
                    <div className={styles.product}>
                        <div className={styles.product_item}>
                            item
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;