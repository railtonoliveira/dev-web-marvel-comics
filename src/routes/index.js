import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Details from "../pages/Details";

const AppRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Home />} />
			</Routes>
		</Router>
	);
};

export default AppRoutes;