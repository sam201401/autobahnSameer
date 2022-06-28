import React, { useEffect, useState } from 'react';

import './BlogDetail.css';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { set, useForm } from "react-hook-form";
import { useAppDispatch } from '../../Redux/hooks'
import { actions } from '../../Redux/slice';
import PositionedSnackbar from '../SnackBar';

type PostInfo = {
  body: string,
  title: string
};
type PostInfoFormData = {
  blogData: string,
  newBlogTitle: string
};
interface AppProps {
  blogBodyData: PostInfo
  postID: string
}

interface IFormInputs {
  blogBodyData: PostInfoFormData
}


export const EditPost = ({ blogBodyData, postID }: AppProps) => {

  const [errWrong,setErrWrong]=useState<string>();
  const { register, handleSubmit } = useForm<IFormInputs>();
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  

  useEffect(() => {
    dispatch(actions.editPost(true));
    return () => {
      dispatch(actions.editPost(false));
    }
  }, [])

  



  const hitBackend = (data: IFormInputs) => {
    console.log("sasasa");

    fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: data.blogBodyData.newBlogTitle,
        body: data.blogBodyData.blogData

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setOpen(true);
        

        console.log(json)
      }).catch((err)=>setErrWrong("something is wrong"));
  }
  const handleRegistration = (data: IFormInputs) => hitBackend(data);

  return (
    <>
    
    <div className="post-container">

      <form style={{ margin: "20px" }} onSubmit={handleSubmit(handleRegistration)}>
        <TextField
          type="text"
          {...register('blogBodyData.newBlogTitle')}
          defaultValue={blogBodyData.title}
          fullWidth
          placeholder="Title"
          label="Title"
          size={"medium"}
          required

          name="newBlogTitle"

        ></TextField>
        <div style={{ margin: "20px" }}>
          <TextField
            label="Post"
            variant={'outlined'}
            size={"medium"}
            {...register('blogBodyData.blogData')}
            fullWidth
            defaultValue={blogBodyData.body}

            multiline={true}
            required
            name="blogData"


          />
        </div>
        <Button style={{ margin: "20px" }} onClick={()=>dispatch(actions.editPost(false))} variant="contained" color="primary">Back</Button>
        <Button style={{ margin: "20px" }} type="submit" variant="contained" color="primary">UPDATE POST</Button>
      </form>
<div>{errWrong}</div>

<PositionedSnackbar open={open} message={"Post Edited Successfully"} setOpen={setOpen}/>
     
    </div>
    </>
  );
};


