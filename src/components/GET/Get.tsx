import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from './get.scss'
import MyContext from '../../MyContext';

type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    position_id: string;
    registration_timestamp: number;
    photo: string;
  };
  
  type UserData = {
    success: boolean;
    page: number;
    total_pages: number;
    total_users: number;
    count: number;
    links: {
      next_url: string | null;
      prev_url: string | null;
    };
    users: User[];
  };
  
  const Get = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [prevUrl, setPrevUrl] = useState<string | null>(null);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { data, setData } = useContext(MyContext);
  
    useEffect(() => {
      setLoading(true);
      axios
        .get<UserData>("https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6")
        .then(({ data }) => {
            const sortedUsers = data.users.sort((a, b) => {
            return b.registration_timestamp - a.registration_timestamp;
            });
            setUsers(sortedUsers);
            setPrevUrl(null);
            setNextUrl(data.links.next_url);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [data]);
  
    const loadMore = () => {
        setLoading(true);
        axios
          .get<UserData>(nextUrl!)
          .then(({ data }) => {
            setUsers((prevUsers) => [...prevUsers, ...data.users].sort((a, b) => {
                return b.registration_timestamp - a.registration_timestamp;
                }));
            setPrevUrl(data.links.prev_url);
            setNextUrl(data.links.next_url);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      };

    return (
        <div>
            <div className={`${styles.get__container} container`}>
                <h1 className={styles.get__title}>Working with GET request</h1>

                <ul className={styles.user__items}>
                    {users.map((user) => (
                        <li className={styles.user__item} key={user.id}>
                            <div className={styles.user__item_ava}>
                                <img src={user.photo} alt="avatar" />
                            </div>
                            <div title={user.name} className={styles.user__item_name}>{user.name}</div>
                            <div className={styles.user__item_additional}>
                                <span title={user.position} className={styles.additional__info}>{user.position}</span>
                                <span title={user.email} className={styles.additional__info}>{user.email}</span>
                                <span title={user.phone} className={styles.additional__info}>{user.phone}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={styles.button__container}>
                    {nextUrl && <button className={`${styles.button} button`} onClick={loadMore}>Load more</button>}
                </div>
                
            </div>
        </div>
    );
};

export default Get;