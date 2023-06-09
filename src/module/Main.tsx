import React, { useEffect, useState } from "react";
import { Accounts } from "./Accounts";
import { Chain } from "./Chain";
import { Status } from "./Status";
import { torus, hooks } from "./torus";
import { getName } from "./utils";
import { getAddChainParameters } from "./chains";

const Main = () => {
	const {
		useChainId,
		useAccounts,
		useIsActivating,
		useIsActive,
		useProvider,
		useENSNames,
	} = hooks;

	const chainId = useChainId();
	const accounts = useAccounts();
	const isActivating = useIsActivating();

	const isActive = useIsActive();

	const provider = useProvider();
	const ENSNames = useENSNames(provider);

	const [error, setError] = useState(undefined);
	const [desiredChainId, setDesiredChainId] = useState<number>(-1);

	useEffect(() => {
		void torus.connectEagerly().catch(() => {
			console.debug("Failed to connect eagerly to torus");
		});
	}, []);

	return (
		<>
			<div
				style={{
					margin: "15px",
					padding: "15px",
					border: "2px solid",
					width: "20%",
				}}>
				<b>{getName(torus)}</b>
				<div style={{ marginBottom: "1rem" }}>
					<Status
						isActivating={isActivating}
						isActive={isActive}
						error={error}
					/>
				</div>
				<Chain chainId={chainId} />
				<div style={{ marginBottom: "1rem" }}>
					<Accounts
						accounts={accounts}
						provider={provider}
						ENSNames={ENSNames}
					/>
				</div>
				{isActive ? (
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div style={{ marginBottom: "1rem" }} />
						<button
							onClick={() => {
								if (torus?.deactivate) {
									void torus.deactivate();
								} else {
									void torus.resetState();
								}
							}}>
							Disconnect
						</button>
					</div>
				) : (
					<button
						onClick={
							isActivating
								? undefined
								: () =>
										torus
											.activate(
												desiredChainId === -1
													? undefined
													: getAddChainParameters(desiredChainId)
											)
											.then(() => setError(undefined))
											.catch(setError)
						}
						disabled={isActivating}>
						Connect
					</button>
				)}
			</div>
		</>
	);
};

export default Main;
