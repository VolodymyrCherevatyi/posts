import { Card, Button } from "react-bootstrap";
import "./Post.scss";

const Post = (props) => {
	const {id, title, post, onDelete, onOpen} = props;
	
	const deletePost = (e) => {
		onDelete(e.target.getAttribute(['data-post-id']));
	};

	const openPost = (e) => {
		onOpen(e.target.getAttribute(['data-post-id']));
	};

	return (
		<div className="post" >
			<Card>
				<Card.Header as="h2">{title}</Card.Header>
				<Card.Body>
					<Card.Text>
						{post}
					</Card.Text>
					<Button variant="primary">Open</Button>
					<Button variant="primary">Change</Button>
					<Button variant="primary" onClick={deletePost} data-post-id={id}>Delete</Button>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Post;
