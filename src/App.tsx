import React, { useEffect, useState } from "react";
import styles from './app.scss'
import Header from './components/Header/Header'
import Post from './components/POST/Post'
import Get from './components/GET/Get'
import MyContext from "./MyContext";



const App = () => {
    const [data, setData] = useState('');
    return (
        <div className={styles.wrapper}>
            <div className={styles.decor}></div>            
            <header className={styles.header}>
                <Header />
            </header>
            <main className={styles.page}>
                <section>
                    <MyContext.Provider value={{ data, setData }}>
                        <Get />
                    </MyContext.Provider>
                </section>
            </main>
            <footer className={styles.footer}>
            <MyContext.Provider value={{ data, setData }}>
                        <Post />
                    </MyContext.Provider>
            </footer>
        </div>
    );
}

export default App;
