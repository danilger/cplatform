'use client'
import formatDate from '@/app/helpers/formatDate';
import React, { useContext, useEffect, useState } from 'react';
import styles from '../../css/admin.module.css'
import DeletPost from '@/app/helpers/admin/delete';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllPosts, selectShowPost } from '../store/slices/showPostsSlice';

const Posts = () => {

    const allPosts = useAppSelector(selectShowPost)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAllPosts())
    }, [])


    return (<>


        {allPosts.map((post: any) => {
            return (

                <div className={styles.post + ' shadow'} key={post.id}>
                    <div className={styles.postTitle}>{post.title}</div>
                    <div className={styles.postDate}>{formatDate(post.createdAt)}</div>
                    <div className={styles.postUserName}>{post.userId}</div>
                    <div className={styles.button} onClick={async () => { await DeletPost(post.id); dispatch(fetchAllPosts()) }}>Удалить запись</div>
                </div>

            )
        })}

    </>
    );
};

export default Posts;
