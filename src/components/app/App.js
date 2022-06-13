import { BrowserRouter } from "react-router-dom";
import Header from "../header/Header";
import Posts from "../posts/Posts";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Header/>
				<Posts />
			</div>
		</BrowserRouter>
	);
}

export default App;
