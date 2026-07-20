import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/posts/postsSlice";

export default function PostForm(){

const [text,setText]=useState("");

const dispatch=useDispatch();

const platform=useSelector(
(state)=>state.platforms.selectedPlatform
);

const handleSubmit=()=>{

if(text.trim()==="") return;

dispatch(addPost(`${platform}: ${text}`));

setText("");

};

return(

<div className="card">

<h3>Create a New Post</h3>

<input
value={text}
placeholder="What's on your mind?"
onChange={(e)=>setText(e.target.value)}
/>

<button onClick={handleSubmit}>
Add Post
</button>

</div>

);

}