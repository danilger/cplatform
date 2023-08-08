'use client'
import React, { useContext } from 'react';
import CreatePost from './createPost';
import styles from '../../css/admin.module.css'
import Posts from './posts';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllPosts } from '../store/slices/showPostsSlice';
import { onDisplayCreatePost, selectPanelSlice } from '../store/slices/panelSlice';

const Panel: React.FC = () => {

    const dispatch = useAppDispatch()

    return (

        <div className="container">
            <h1>Панель администратора</h1>
            <div className={styles.panelWrapper}>
                <div className={styles.menu + " shadow"}>
                    <div className={styles.button} onClick={() => { dispatch(fetchAllPosts()) }}>Записи</div>
                    <div className={styles.button} onClick={() => { dispatch(onDisplayCreatePost()) }}>Создать запись</div>
                </div>
                <div className={styles.panel + " shadow"}>
                    <CreatePost />
                    <Posts />
                </div>
            </div>

        </div>

    )
};

export default Panel
