const map = L.map('map').setView([37.8, -96], 4);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

	// control that shows state info on hover
	//const info = L.control();

	//info.onAdd = function (map) {
		//this._div = L.DomUtil.create('div', 'info');
		//this.update();
		//return this._div;
	//};

	//info.update = function (props) {
		//const contents = props ? `<b>${props.name}</b><br />${props.density} people / mi<sup>2</sup>` : 'Hover over a state';
		//this._div.innerHTML = `<h4>US Population Density</h4>${contents}`;
	//};

	info.addTo(map);


	// get color depending on sightings value
	function getColorSight(d) {
		return d > 2000 ? '#005a32' :
			d > 1400  ? '#238b45' :
			d > 1150  ? '#41ab5d' :
			d > 1000  ? '#74c476' :
			d > 750  ? '#a1d99b' :
			d > 500   ? '#c7e9c0' :
			d > 250  ? '#e5f5e0' : '#f7fcf5';
	}

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColorSight(feature.properties.sightings)
		};
	}

	// get color depending on sighting/capita value
	function getColorPerCap(d) {
		return d > 40 ? '#005a32' :
			d > 35  ? '#238b45' :
			d > 30  ? '#41ab5d' :
			d > 25  ? '#74c476' :
			d > 20  ? '#a1d99b' :
			d > 15   ? '#c7e9c0' :
			d > 10  ? '#e5f5e0' : '#f7fcf5';
	}


	function highlightFeature(e) {
		const layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		layer.bringToFront();

		info.update(layer.feature.properties);
	}

	/* global statesData */
	const geojson = L.geoJson("/api/v1.0/map_info", {
		style,
		onEachFeature
	}).addTo(map);

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

	map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


	const legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		const div = L.DomUtil.create('div', 'info legend');
		const grades = [0, 250, 500, 750, 1000, 1250, 1500, 2000];
		const labels = [];
		let from, to;

		for (let i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(`<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(map);