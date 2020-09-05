import React, { useEffect } from 'react';
import SearchForm from "./components/search-form"
import Graph from "./components/graph"
import services from "./services";

const App = () => {

	useEffect(() => {
		// backend herokun ilmaiskokeilulla -> serveri nukkuu jos siihen ei tule liikennettä pitkään aikaan joten tehdään herättävä pyyntö
		services.wakeUpRequest()
	})

	return(
		<>
			<SearchForm />
			<Graph />
		</>
	)
}


export default App;
