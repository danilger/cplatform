import React from 'react';
import Image from 'next/image'
import getAllPosts from '../../helpers/posts/getAllPosts';
import formatDate from '../../helpers/formatDate';


const Posts = async () => {
    const allPosts = await getAllPosts()

    return (<>


        {allPosts.map((post: any) => {
            return (

                <div className="post shadow" key={post.id}>
                    <div className="postTitle">{post.title}</div>
                    <div className="postDate">{formatDate(post.createdAt)}</div>
                    <div className="postContent">{post.content}</div>
                    <div className="postUserName">{post.userId}</div>
                    <Image src={'http://localhost:5000/' + post.file} width={500} height={250} alt='Picture' />
                </div>

            )
        })}

    </>
    );
};

export default Posts;
