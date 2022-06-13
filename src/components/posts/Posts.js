import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Services from "../../services/services";

import Post from "../post/Post";
import AddPost from "../add-post/AddPost";
import CommentedPost from "../commented-post/CommentedPost";


const Posts = () => {
	const [posts, setPosts] = useState([]);
	
	const {getResourse} = Services();

	useEffect(() => {
		getResourse("https://simple-blog-api.crew.red/posts")
			.then(result => {
				setPosts(result);
			});
	}, []);

	const displayPosts = () => {
		const postsCount = posts.length;
		const reversPosts = [];
		posts.map((item, i) => (reversPosts[postsCount - i - 1] = item));
		return reversPosts.map((item) => (
			<Post 
				post={item.body} 
				title={item.title} 
				id={item.id} 
				key={item.id} 
				onDelete={deletePost} 
			/>
		));
	};

	const addNewPost = (newPost) => {
		const newPosts = posts;
		newPosts.push(newPost);
		setPosts(newPosts);
	};
	
	const deletePost = (id) => {
		let allPosts = posts;
		allPosts = allPosts.filter(item=>{return item.id != id;});
		getResourse(`https://simple-blog-api.crew.red/posts/${id}`,"DELETE")
			.then(console.log('Ok'));
		setPosts(allPosts);
	};

	return (
		<div>
			<Routes>
				<Route path="/add-post" element={<AddPost onSuccess={addNewPost} />}/>
					
				<Route path="/posts" element={<div className="posts">{displayPosts()}</div>}/>

				{/* <Route path="/posts/:id" element={}/> */}
				
				<Route path="/" element={null}/>	
			</Routes>
			{console.log('render')}
			{/* <CommentedPost/> */}
			{/* <AddPost onSuccess={addNewPost} />
			<div className="posts">{displayPosts()}</div> */}
		</div>
	);
};


export default Posts;


