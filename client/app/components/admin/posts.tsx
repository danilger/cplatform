'use client'
import formatDate from '@/app/helpers/formatDate';
import getAllPosts from '@/app/helpers/posts/getAllPosts';
import React from 'react';
import styles from '../../css/admin.module.css'
import DeletPost from '@/app/helpers/admin/delete';



const Posts = async () => {
    const allPosts = await getAllPosts()



    return (<>


        {allPosts.map((post: any) => {
            return (

                <div className={styles.post + ' shadow'} key={post.id}>
                    <div className={styles.postTitle}>{post.title}</div>
                    <div className={styles.postDate}>{formatDate(post.createdAt)}</div>
                    <div className={styles.postUserName}>{post.userId}</div>
                    <div className={styles.button} onClick={async () => { await DeletPost(post.id) }}>Удалить запись</div>
                </div>

            )
        })}

    </>
    );
};

export default Posts;
