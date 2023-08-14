'use client'
import formatDate from '@/app/helpers/formatDate';
import React, { useEffect, useState } from 'react';
import styles from '../../css/admin.module.css'
import DeletPost from '@/app/helpers/admin/delete';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllPosts, selectShowPost } from '../store/slices/showPostsSlice';
import Loader from '@/app/helpers/loader';


const Posts = () => {
    const [isLoading, setIsLoading] = useState(true)
    const allPosts = useAppSelector(selectShowPost)
    const dispatch = useAppDispatch()


    useEffect(() => {
        (async () => {
            await dispatch(fetchAllPosts());
            setIsLoading(false);
        })();
    }, []);


    return (<>
        {
            isLoading ?
                (<div className='container'><Loader /></div>)
                : (
                    allPosts.map((post: any) => {
                        return (

                            <div className={styles.post + ' shadow'} key={post.id}>
                                <div className={styles.postTitle}>{post.title}</div>
                                <div className={styles.postDate}>{formatDate(post.createdAt)}</div>
                                <div className={styles.postUserName}>{post.userId}</div>
                                <div className={styles.button} onClick={async () => { await DeletPost(post.id); dispatch(fetchAllPosts()) }}>Удалить запись</div>
                            </div>

                        )
                    })
                )

        }
    </>
    );
};

export default Posts;
