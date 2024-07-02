import BingMapsReact from "bingmaps-react";
import React, { useState } from "react";
import useBingMaps from "./useBingMaps";

const Test = () => {
	const apiKey = process.env.REACT_APP_BING_MAPS_API_KEY;
	const { isValidKey, verificationMessage, isScriptLoaded, currentLocation } =
		useBingMaps(apiKey);

	const [showMap, setShowMap] = useState(false);

	const center = currentLocation || { latitude: 40.7128, longitude: -74.006 };
	const zoom = 12;

	const pushPins = currentLocation
		? [
				{
					center: currentLocation,
					options: { title: "Your Location" },
				},
			]
		: [];

	const handleShowMap = () => {
		if (isValidKey && isScriptLoaded) {
			setShowMap(true);
		} else {
			alert("Bing Maps script is not loaded or API key is invalid.");
		}
	};

	return (
		<div>
			<button onClick={handleShowMap}>Load Map</button>
			{showMap && isValidKey && isScriptLoaded ? (
				<div style={{ width: "100%", height: "500px" }}>
					<BingMapsReact
						bingMapsKey={apiKey}
						height="100%"
						mapOptions={{
							navigationBarMode: "square",
						}}
						width="100%"
						viewOptions={{
							center: center,
							zoom: zoom,
						}}
						pushPins={pushPins}
					/>
				</div>
			) : (
				<p>{verificationMessage}</p>
			)}
		</div>
	);
};

export default Test;
