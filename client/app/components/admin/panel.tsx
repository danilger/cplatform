'use client'
import React, { useContext } from 'react';
import CreatePost from './createPost';
import styles from '../../css/admin.module.css'
import { useState } from "react"
import Posts from './posts';
import { useAppDispatch } from '../store/hooks';
import { fetchAllPosts } from '../store/slices/showPostsSlice';

const Panel: React.FC = () => {
    const [display, SetDisplay] = useState({ display: 'none' })
    const dispatch = useAppDispatch()

    return (

        <div className="container">
            <h1>Панель администратора</h1>
            <div className={styles.panelWrapper}>
                <div className={styles.menu + " shadow"}>
                    <div className={styles.button} onClick={() => { dispatch(fetchAllPosts()) }}>Записи</div>
                    <div className={styles.button} onClick={() => SetDisplay({ display: 'flex' })}>Создать запись</div>
                </div>
                <div className={styles.panel + " shadow"}>
                    <CreatePost show={[display, SetDisplay]} />
                    <Posts />
                </div>
            </div>

        </div>

    )
};

export default Panel
