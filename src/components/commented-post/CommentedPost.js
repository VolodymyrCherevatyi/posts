import Services from "../../services/services";
import Post from "../post/Post";
import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";


const CommentedPost = () => {
	//const {id} = useParams();
	//const {getResourse} = Services();
	//const [posts, setPosts] = useState([]);

	// useEffect(() => {
	// 	getResourse("https://simple-blog-api.crew.red/posts")
	// 		.then(result => {
	// 			setPosts(result);
	// 		});
	// }, []);

	//const post = posts.filter(item=>{return item.id == id;});
	//console.log('test');
	// return (
	// 	<Post post={props.data.body} title={props.data.title} id={props.data.id} key={props.data.id} />
	// );
};

export default CommentedPost;