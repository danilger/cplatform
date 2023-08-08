'use client'
import SavePost from '@/app/helpers/admin/savePost';
import React, { useRef } from 'react';
import { useAppDispatch } from '../store/hooks';

const CreatePost: React.FC<any> = ({ show: [display, SetDisplay] }) => {
    const form = useRef(null)
    const dispatch = useAppDispatch()

    const createPost = (e: any) => {
        const formData = new FormData(e.parentNode)
        SavePost(formData, dispatch, SetDisplay)
    }

    return (
        <div className='popupBack' style={display}>
            <div className='form shadow'>
                <div className="close" onClick={() => SetDisplay({ display: 'none' })}>×</div>
                <form ref={form} name='createPost' className='formWrapper'>
                    <h3>Создать запись</h3>
                    <input type="text" className='inputField' name='title' placeholder='Заголовок' />
                    <textarea className='inputField' name='content' placeholder='Контент' ></textarea>
                    <input type="file" className='inputField' name='image' />
                    <input className="btn btnprimary" type="button" name="enter" value="Сохранить" onClick={(e) => { createPost(e.target) }}></input>
                </form>
            </div>
        </div >
    );
};

export default CreatePost;