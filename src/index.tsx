import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import {
	useWeb3React,
	Web3ReactHooks,
	Web3ReactProvider,
} from "@web3-react/core";
import { getName } from "./module/utils";
import { TorusConnector } from "web3-react-torus";
import { hooks, torus } from "./module/torus";

const container = document.getElementById("root")!;
const root = createRoot(container);

const connectors: [TorusConnector, Web3ReactHooks][] = [[torus, hooks]];

function Child() {
	const { connector } = useWeb3React();
	console.log(`Priority Connector is: ${getName(connector)}`);
	return null;
}

root.render(
	<>
		<Web3ReactProvider connectors={connectors}>
			{/* <Child /> */}
			<App />
		</Web3ReactProvider>
	</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
