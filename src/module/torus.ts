import { TorusConnector } from "web3-react-torus";
import { initializeConnector } from "@web3-react/core";

export const [torus, hooks] = initializeConnector<TorusConnector>(
	(actions) => new TorusConnector({ actions })
);
