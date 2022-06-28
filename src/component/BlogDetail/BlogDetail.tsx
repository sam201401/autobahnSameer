import React, { useEffect, useState ,FC } from 'react';

import Box from '@mui/material/Box';
import './BlogDetail.css';
import Button from '@mui/material/Button';
import {EditPost} from './EditPost';
import { useHistory,useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { actions } from '../../Redux/slice';
import PositionedSnackbar from '../SnackBar';

  type idParams = {
    postID: string;
  };
  interface AppProps {
    saveEditPost:Function
    editPost: Boolean;
}
const defaultProps: AppProps = {
    saveEditPost: ()=>{},
    editPost: false
}

type PostInfo = {
    body: string
    title: string
};


export  const BlogDetail: FC  = () => {
    let { postID } = useParams<idParams>();
    const [open, setOpen] = React.useState(false);
    const history = useHistory()
    const [post, setPost] = useState<PostInfo>({body:'',title:''})
    let editPost = useAppSelector((state) => state.editPost.value);

    
    const dispatch = useAppDispatch();
    
    
    const postDetailUrl = `https://jsonplaceholder.typicode.com/posts/${postID}`;

    let timer:Function;
    let timerId :number;
    timer = ()=>setTimeout(()=>history.goBack(),1000)
    // adding post details using post id.
    useEffect(() => {
       
        fetch(postDetailUrl)
            .then(res => res.json())
            .then(data => {
                setPost(data)
               
            }).catch((err)=>{})

            return () => {
                clearTimeout(timerId);
              };
    }, []);
   
    const editClick = () => {

       
        
        dispatch(actions.editPost(true))
    
    }
       
    
    
    
    const deleteClick = () => {
    
        
        fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`, {
         method: 'DELETE',
        }).then(res => res.json())
        .then(data => {
           
           setOpen(true);
            timerId = timer();
         // history.goBack();
           
        });
        
    }

    return (

        <div className="post-container">
          
        {!editPost && (
            <>
                <Box p={4} boxShadow={2}>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </Box>

                <Button  style={{margin:"20px"}} onClick={editClick} variant="contained" color="primary">Edit</Button>
                <Button onClick={deleteClick} variant="contained" color="primary">Delete</Button>
            </>
        )}



        {editPost && <EditPost  postID={postID}  blogBodyData={post}  />}
        <PositionedSnackbar open={open} message={"Post Deleted Successfully"} setOpen={setOpen}/>

    </div>
    );
    }
            
