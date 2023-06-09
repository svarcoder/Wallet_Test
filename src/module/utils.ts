import type { Connector } from "@web3-react/types";
import { TorusConnector } from "web3-react-torus";

export function getName(connector: Connector) {
	if (connector instanceof TorusConnector) return "Torus";
	return "Unknown";
}
