import React from "react";
import { useForm } from "react-hook-form";
import './Createnewpost.css'
import { useHistory } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import PositionedSnackbar from '../SnackBar';
interface DataBlog {
  newBlogTitle: string
  newBlogContent: string
}
export const CreateNewPost = () => {

  const { register, handleSubmit } = useForm<DataBlog>();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  let timer: Function;
  let timerId: number;
  timer = () => setTimeout(() => history.goBack(), 1000)
  const hitBackend = (data: DataBlog) => {

    fetch('https://jsonplaceholder.typicode.com/posts/', {
      method: 'POST',
      body: JSON.stringify({
        title: data.newBlogTitle,
        body: data.newBlogContent,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setOpen(true)
        timerId = timer()
      }
      ).catch((err) => alert("Something is Wrong"))
    return () => {
      clearTimeout(timerId);
    };
  }
  const handleRegistration = (data: DataBlog) => hitBackend(data);
  return (
    <>
      <section className="create-post">
        <form onSubmit={handleSubmit(handleRegistration)}>
          <h1>Create New Post</h1>


          <input
            type="text"
            {...register('newBlogTitle')}
            placeholder="Title"
            size={50}
            required

            name="newBlogTitle"

          ></input>
          <br />
          <br />

          <TextField

            variant={'outlined'}
            size={"medium"}
            {...register('newBlogContent')}
            fullWidth


            multiline={true}
            required
            name="blogData"


          />
          <br />
          <br />

          <Button type="submit" variant="contained" color="primary">Create POST</Button>
        </form>
      </section>
      <PositionedSnackbar open={open} message={"Post Created Successfully"} setOpen={setOpen}/>
    </>
  );
};
export default CreateNewPost;
