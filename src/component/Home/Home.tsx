import React, { useEffect, FC, useState } from 'react';
import Box from '@mui/material/Box';
import './Home.css';
import { Link, useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
type PostInfo = {
    id: number;
    title: string;
};
const Home: FC = () => {

    
    const [posts, setPosts] = useState<PostInfo[]>([])
    const [errWrong,setErrWrong]=useState<string>();
    const history = useHistory();


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(date => {
                
                setPosts(date)
            }).catch((err)=>setErrWrong("something is wrong"))
    }, []);



    return (
        <div className="main-container">
 <Button onClick={()=> history.push("/create")} variant="contained" color="primary">Create New Post</Button>
            {

                posts.map(post => {
                    return <Box component="span" display="block" p={2} m={3} bgcolor="background.paper" key={post.id}>
                        <span>Topic: {post.id}</span>
                        <h2>{post.title}</h2>
                        {<Link to={`/post/${post.id}`}><button>Read more..</button></Link>}
                    </Box>
                })
            }
            <div>{errWrong}</div>
        </div>
    )

};

export default Home;