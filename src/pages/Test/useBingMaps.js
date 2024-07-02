import { useEffect, useState } from "react";

const useBingMaps = (apiKey) => {
	const [isValidKey, setIsValidKey] = useState(false);
	const [verificationMessage, setVerificationMessage] = useState("");
	const [isScriptLoaded, setIsScriptLoaded] = useState(false);
	const [currentLocation, setCurrentLocation] = useState(null);

	useEffect(() => {
		const verifyApiKey = async () => {
			const testUrl = `https://dev.virtualearth.net/REST/v1/Locations?query=New%20York&key=${apiKey}`;
			try {
				const response = await fetch(testUrl);
				const data = await response.json();

				if (response.ok && data.resourceSets.length > 0) {
					setIsValidKey(true);
					setVerificationMessage("API key is valid.");
					await loadBingMapsScript();
				} else {
					setIsValidKey(false);
					setVerificationMessage("API key is invalid.");
				}
			} catch (error) {
				setIsValidKey(false);
				setVerificationMessage("Error verifying API key.");
				console.error("Error verifying API key:", error);
			}
		};

		verifyApiKey();
	}, [apiKey]);

	const loadBingMapsScript = async () => {
		if (!window.Microsoft) {
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.async = true;
			script.defer = true;
			script.src = `https://www.bing.com/api/maps/mapcontrol?callback=bingMapsCallback&key=${apiKey}`;
			script.onload = () => {
				setIsScriptLoaded(true);
			};
			script.onerror = (error) => {
				setVerificationMessage("Error loading Bing Maps script.");
				console.error("Error loading Bing Maps script:", error);
				setIsScriptLoaded(false); // Reset script loaded state on error
			};
			document.body.appendChild(script);

			window.bingMapsCallback = () => {
				setIsScriptLoaded(true);
			};
		} else {
			setIsScriptLoaded(true); // Bing Maps script already loaded
		}
	};

	useEffect(() => {
		const fetchLocation = async () => {
			try {
				if (isValidKey && isScriptLoaded && navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(
						(position) => {
							setCurrentLocation({
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
							});
						},
						(error) => {
							setVerificationMessage("Error fetching current location.");
							console.error("Error fetching current location:", error);
						},
					);
				} else {
					setVerificationMessage(
						"Geolocation is not supported or script is not loaded.",
					);
				}
			} catch (error) {
				setVerificationMessage("Error fetching current location.");
				console.error("Error fetching current location:", error);
			}
		};

		fetchLocation();
	}, [isValidKey, isScriptLoaded]);

	return {
		isValidKey,
		verificationMessage,
		isScriptLoaded,
		currentLocation,
	};
};

export default useBingMaps;
