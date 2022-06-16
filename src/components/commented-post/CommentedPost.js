import Services from "../../services/services";
import Post from "../post/Post";
import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalWindow from "../modal/Modal";

const CommentedPost = (props) => {
	const {id} = useParams();
	const {getResourse} = Services();
	const [posts, setPosts] = useState([]);

	const {onDelete, onClose, showModal, onModalShow} = props;

	useEffect(() => {
		getResourse(`https://simple-blog-api.crew.red/posts/${id}?_embed=comments`)
			.then(result => {
				setPosts(result);
			});
	}, []);

	const getComments = () => {
		if(posts.comments){
			const post = posts.comments.map(item => {
				return (<ListGroupItem key={item.id}>{item.body}</ListGroupItem>);
			});
			return post;
		}else {
			return null;
		};
	};
	
	return (
		<div className="post" >
			<Card >
				<Card.Body>
					<Card.Title as="h2">{posts.title}</Card.Title>
					<Card.Text as="h3">
						{posts.body}
					</Card.Text>
				</Card.Body>
				<ListGroup className="list-group-flush">
					<i>{getComments()}</i>
				</ListGroup>
				<Card.Body>
					<Link to={"/posts"} className="card-link">Back</Link>
					<Card.Link href="#">Change</Card.Link>
					<Card.Link href="#" onClick={onModalShow}>Delete</Card.Link>
				</Card.Body>
			</Card>
			<ModalWindow showModal={showModal} onClose={onClose} onDelete={onDelete} postId={id}/>
		</div>
	);

	
};

export default CommentedPost;