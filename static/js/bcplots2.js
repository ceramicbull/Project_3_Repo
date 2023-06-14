const map2 = L.map('map2').setView([37.8, -96], 4);

	const tiles2 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map2);

	//control that shows state info on hover
	const info2 = L.control();

	info2.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info2.update = function (props) {
		const contents = props ? `<b>${props.proper_name}</b><br />${Math.round((props.per_capita + Number.EPSILON) * 100) / 100} sightings reported per 100,000 people` : 'Hover over a state';
		this._div.innerHTML = `<h4># of Sightings per capita</h4>${contents}`;
	};

	info2.addTo(map2);

	//let geoUrl ="/api/v1.0/map_info"

	// get color depending on sighting/capita value
	function getColorPerCap(d) {
		return d > 40 ? '#4a1486' :
			d > 35  ? '#6a51a3' :
			d > 30  ? '#807dba' :
			d > 25  ? '#9e9ac8' :
			d > 20  ? '#bcbddc' :
			d > 15   ? '#dadaeb' :
			d > 10  ? '#efedf5' : '#fcfbfd';
	}

	

	function style2(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColorPerCap(feature.properties.per_capita)
		};
	}

	


	function highlightFeature2(e) {
		const layer2 = e.target;

		layer2.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		layer2.bringToFront();

		info2.update(layer2.feature.properties);
	}

	

	

	function zoomToFeature2(e) {
		map2.fitBounds(e.target.getBounds());
	}

	

	d3.json(geoUrl).then(function(data){

		/* global statesData */
		const geojson2 = L.geoJson(data, {
			style:style2,
			onEachFeature:onEachFeature
		}).addTo(map2);
		
		function resetHighlight2(e) {
			geojson2.resetStyle(e.target);
			info2.update();
		}

		function onEachFeature(feature, layer) {
			layer.on({
				mouseover: highlightFeature2,
				mouseout: resetHighlight2,
				click: zoomToFeature2
			});
		}

		map2.attributionControl.addAttribution('Population data: &copy; <a href="http://census.gov/">US Census Bureau</a>');
		map2.attributionControl.addAttribution('UFO Reports: &copy; <a href="https://nuforc.org/">National UFO Reporting Center</a>');


		const legend2 = L.control({position: 'bottomright'});

		legend2.onAdd = function (map) {

			const div2 = L.DomUtil.create('div', 'info legend');
			const grades2 = [0, 10, 15, 20, 25, 30, 35, 40];
			const labels2 = [];
			let from, to;

			for (let i = 0; i < grades2.length; i++) {
				from = grades2[i];
				to = grades2[i + 1];

				labels2.push(`<i style="background:${getColorPerCap(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
			}

			div2.innerHTML = labels2.join('<br>');
			return div2;
		};

		legend2.addTo(map2);

	});