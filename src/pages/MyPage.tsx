import React, { useEffect, useState } from 'react';
import styles from '../assets/css/MyPage.module.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import { RePrice } from '../util/RePrice';
import { IModifyInfo, ISubscribeInfos, IUserInfo } from '../util/db';

const MyPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [subscribeInfo, setSubscribeInfo] = useState<ISubscribeInfos>();
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [tabShow, setTabShow] = useState('subscription');
  const [modifyInfo, setModifyInfo] = useState<IModifyInfo>({});
  const [passwordLength, setPasswordLength] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  };

  const getMySubscriptions = () => {
    axios
      .get('http://3.39.198.214:8080/users/me/subscriptions', config)
      .then(res => {
        setSubscribeInfo(res.data.subscriptions);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const getMyUserInfo = () => {
    axios
      .get('http://3.39.198.214:8080/users/me', config)
      .then(res => {
        if (res && res.status === 200) {
          setUserInfo(res.data);
          setModifyInfo(res.data);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const getInputValue = (
    type: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setModifyInfo({ ...modifyInfo, [type]: value });

    if (type === 'password') {
      if (value.length < 8) {
        setPasswordLength(true);
      } else {
        setPasswordLength(false);
      }

      if (
        modifyInfo.passwordCheck &&
        modifyInfo.passwordCheck?.length > 0 &&
        value !== modifyInfo?.passwordCheck
      ) {
        setPasswordCheck(true);
      } else {
        setPasswordCheck(false);
      }
    }

    if (type === 'passwordCheck' && value !== modifyInfo.password) {
      setPasswordCheck(true);
    } else if (type === 'passwordCheck' && value === modifyInfo.password) {
      setPasswordCheck(false);
    }
  };

  const modifyUserInfo = () => {
    const data = {
      nick_name: modifyInfo.nick_name,
      password: modifyInfo.password,
      phone: modifyInfo.phone,
    };

    if (passwordCheck || passwordLength) {
      alert('??????????????? ??????????????????.');
      return;
    }

    axios
      .put('http://3.39.198.214:8080/users/me', data, config)
      .then(res => {
        if (res && res.status === 200) {
          alert('??????????????? ?????? ???????????????.');
          window.location.reload();
        }
      })
      .catch(error => {
        console.log('update-error', error);
      });
  };

  const reDate = (value: string): string => {
    return moment(value).format('YYYY.MM.DD');
  };

  const calcSubscribe = (value: string, period: string): string => {
    const date = new Date(value);

    date.setMonth(date.getMonth() + Number(period));

    return moment(date).format('YYYY.MM.DD');
  };

  useEffect(() => {
    if (cookies.token === undefined) {
      alert('???????????? ???????????? ????????????.');
      window.location.href = '/login';
    }

    getMyUserInfo();
    getMySubscriptions();
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.myPageTitle}>
          ???????????????, <span>{userInfo?.nick_name}</span> ??? <br />
          ??????????????? <span>???????????? ??????</span>?????????.
        </div>
        <div className={styles.tab}>
          <div
            className={`${tabShow === 'subscription' && styles.active}`}
            onClick={() => setTabShow('subscription')}
          >
            ????????????
          </div>
          <div
            className={`${tabShow === 'userInfo' && styles.active}`}
            onClick={() => setTabShow('userInfo')}
          >
            ????????????
          </div>
        </div>
        {tabShow === 'subscription' ? (
          <div className={styles.subscribeList}>
            <div className={styles.titleBar}>
              <div>?????????(?????? ?????? ???)</div>
              <div>????????????</div>
              <div>??? ?????????</div>
            </div>
            {subscribeInfo &&
              subscribeInfo.map((data, index) => {
                return (
                  <div className={styles.listTable} key={index}>
                    <div className={styles.imgWrap}>
                      <div className={styles.imgBox}>
                        {data.product.image_urls &&
                          data.product.image_urls.map((imgUrls, idx) => {
                            return (
                              <img
                                src={`${imgUrls}`}
                                alt={`${imgUrls}`}
                                key={idx}
                              />
                            );
                          })}
                      </div>
                      <div>
                        {data.product.name} / ({data.period}??????)
                      </div>
                    </div>
                    <div>
                      {reDate(data.updated_at)} ~{' '}
                      {calcSubscribe(data.updated_at, data.period)}
                    </div>
                    <div>{RePrice(data.mothly_price)} ???</div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className={styles.modify}>
            <div className={styles.inputWrap}>
              <div className={styles.title}>?????????</div>
              <div className={styles.inputDiv}>
                <input type={'text'} value={userInfo?.email} disabled={true} />
              </div>
            </div>
            <div className={styles.inputWrap}>
              <div className={styles.title}>????????????</div>
              <div className={styles.inputDiv}>
                <input
                  type={'password'}
                  onChange={e => getInputValue('password', e)}
                  placeholder={'???????????? 8??? ??????'}
                />
                {passwordLength && (
                  <div className={styles.passwordTip}>
                    ??????????????? 8??? ?????? ??????????????????.
                  </div>
                )}
              </div>
            </div>
            <div className={styles.inputWrap}>
              <div className={styles.title} />
              <div className={styles.inputDiv}>
                <input
                  type={'password'}
                  onChange={e => getInputValue('passwordCheck', e)}
                  placeholder={'???????????? ??????'}
                />
                {passwordCheck && (
                  <div className={styles.passwordTip}>
                    ??????????????? ???????????? ????????????.
                  </div>
                )}
              </div>
            </div>
            <div className={styles.inputWrap}>
              <div className={styles.title}>?????????</div>
              <div className={styles.inputDiv}>
                <input
                  type={'text'}
                  onChange={e => getInputValue('nick_name', e)}
                  value={modifyInfo.nick_name}
                  placeholder={'?????????'}
                />
              </div>
            </div>
            <div className={styles.inputWrap}>
              <div className={styles.title}>????????????</div>
              <div className={`${styles.inputDiv}`}>
                <input
                  type={'text'}
                  value={modifyInfo.phone}
                  onChange={e => getInputValue('phone', e)}
                />
              </div>
            </div>
            <div className={styles.btnBox}>
              <button onClick={modifyUserInfo}>????????????</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
