const Services = () => {
	const getResourse = (url, method="GET", data=null) => {
		return fetch(url, {
			method: method,
			headers: { "Content-type": "application/json" },
			body: data
		}).then(response => response.json());
	};

	return {getResourse};
};

export default Services;