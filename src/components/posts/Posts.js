import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Services from "../../services/services";

import Post from "../post/Post";
import AddPost from "../add-post/AddPost";
import CommentedPost from "../commented-post/CommentedPost";
import ModalWindow from "../modal/Modal";
import ChangePost from "../change-post/ChangePost";
import FirstPage from "../first-page/FirstPage";
import ErrorMessage from '../error/ErrorMessage';


const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [postId, setPostId] = useState(null);
	const [showModal, setShowModal] = useState("");
	const [error, setError] = useState(false);
	const {getResourse} = Services();

	useEffect(() => {
		onPostLoading();
		setError(false);
	}, []);

	const onPostLoading = () => {
		getResourse("https://simple-blog-api.crew.red/posts")
			.then(result => {
				setPosts(result);
			})
			.catch(e => {
				setError(true);
			});
	};

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
				// onDelete={deletePost} 
				onOpen={openPost}
				onModalShow={onOpenModal}
				getId={getId}
			/>
		));
	};

	const addNewPost = (newPost) => {
		const newPosts = posts;
		newPosts.push(newPost);
		setPosts(newPosts);
		onPostLoading();
	};

	const deletePost = (id) => {
		let allPosts = posts;
		allPosts = allPosts.filter(item=>{return item.id != id;});
		getResourse(`https://simple-blog-api.crew.red/posts/${id}`,"DELETE")
			.then(console.log('Ok'));
		setPosts(allPosts);
		setShowModal("");
	};

	const onOpenModal = () => {
		setShowModal("show");
	};

	const onCloseModal = () => {
		setShowModal("");
	};

	const openPost = (id) => {
		setPostId(id);
	};
	
	const getId = (id) => {
		setPostId(id);
	};

	const onChangePost = (changedPost) => {
		let newArray = [...posts];
		newArray = newArray.map(item=>{ 
			if(changedPost.id != item.id) {
				return item;
			} else {
				return changedPost;
			}
		});
		setPosts(newArray);
	};
	
	return (
		<div>
			<Routes>
				<Route path="/add-post" element={<AddPost onSuccess={addNewPost} />}/>
					
				<Route path="/posts" element={<div className="posts">{!error? displayPosts():<ErrorMessage/>}</div>}/>

				<Route 
					path="/posts/:id" 
					element={
						<CommentedPost 
							onDelete={deletePost} 
							showModal={showModal} 
							onClose={onCloseModal}
							onModalShow={onOpenModal}
						/>}
				/>

				<Route path="/posts/:id/change" element={<ChangePost posts={posts} onSuccess={onChangePost}/>}
				/>
				
				<Route path="/" element={<FirstPage/>}/>	
			</Routes>

			<ModalWindow showModal={showModal} onDelete={deletePost} onClose={onCloseModal} postId={postId}/>

		</div>
	);
};


export default Posts;


