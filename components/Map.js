import { useEffect, useRef, useState } from 'react'
import { createMap, drawPoints } from 'maplibre-gl-js-amplify'
import 'maplibre-gl/dist/maplibre-gl.css'
import 'maplibre-gl-js-amplify/dist/public/amplify-map.css'

const storeLocation = {
	title: "Michael's Coffee Shop",
	address: 'Some place in Iowa',
	coordinates: [-90.57512998580933, 41.54403124368509], // [Longitude, Latitude]
}
function Map({ customerLocation }) {
	console.log(customerLocation)
	const mapRef = useRef(null)
	const [map, setMap] = useState()
	const [markers, setMarkers] = useState()

	useEffect(() => {
		async function initializeMap() {
			if (mapRef.current != null) {
				const map = await createMap({
					container: mapRef.current,
					center: [-90.5782219, 41.5484125],
					zoom: 15,
				})

				setMap(map)
			}
		}
		initializeMap()

		return function cleanup() {
			if (map != null) map.remove()
		}
	}, [mapRef])

	useEffect(() => {
		if (map != null) {
			map.on('load', function () {
				const markerStuff = drawPoints(
					'coffeelocations',
					[storeLocation],
					map,
					{
						unclusteredOptions: {
							showMarkerPopup: true,
						},
						clusterOptions: {
							showCount: true,
						},
						showCluster: false,
					}
				)
				setMarkers(markerStuff)
			})
		}
	}, [map])

	useEffect(() => {
		if (map != null && map.loaded()) {
			markers.setData([customerLocation, storeLocation])
		}
	}, [customerLocation])

	return <div ref={mapRef} id="map" className="fixed-500px-height-map" />
}

export default Map
