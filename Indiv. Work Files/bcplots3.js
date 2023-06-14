let geoUrl ="/api/v1.0/map_info"

let geoData = d3.json(geoUrl)

let sightings= L.choropleth(geoData, {
	valueProperty: "sightings",
	scale: ['#f7fcf5','#005a32'],
	steps: 8,
	mode: "q",
	style: {
		color: "#fff",
		weight: 1,
		fillOpacity: 0.8
	  },
	onEachFeature: function(feature, layer) {
	layer.bindPopup("<strong>" + feature.properties.proper_name + "</strong><br /><br />Total UFO Sightings: " +
		feature.properties.sightings);
	}
});

let perCap= L.choropleth(geoData, {
	valueProperty: "sightings",
	scale: ['#f7fbff','#084594'],
	steps: 8,
	mode: "q",
	style: {
		color: "#fff",
		weight: 1,
		fillOpacity: 0.8
	  },
	onEachFeature: function(feature, layer) {
	layer.bindPopup("<strong>" + feature.properties.proper_name + "</strong><br /><br />UFO Sightings per 100000 people: " +
		feature.properties.per_capita);
	}
});

let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

//Basemaps object
let baseMaps = {
	Sightings: sightings,
	PerCapita: perCap
  };

let myMap = L.map("map", {
	center: [37.8, -96],
	zoom: 4,
	layers: [street, sightings, perCap]
	});

L.control.layers(baseMaps).addTo(myMap);