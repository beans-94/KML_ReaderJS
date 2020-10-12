
		function renderKML(map) {
  // Create a reader object passing in the URL of our KML file
  reader = new H.data.kml.Reader('https://github.com/beans-94/KML_ReaderJS/blob/main/capture-poses-initial.kml');
  
  icon = new H.map.Icon('http://maps.google.com/mapfiles/kml/paddle/grn-blank.png', {size: {h:28, w:32}
  });
  group = new H.map.Group();
  reader.addEventListener("statechange", function(evt){
    if (evt.state === H.data.AbstractReader.State.READY) {
      // Get KML layer from the reader object and add it to the map
      //map.addLayer(reader.getLayer());
	  reader.getParsedObjects().forEach(function (obj){
	  obj.setIcon(icon);
	  });
	  group.addObjects(reader.getParsedObjects());
	  map.addObject(group);
      /*reader.getLayer().getProvider().addEventListener("tap", (evt) => {
        logEvent(evt.target.getData().name)
      });*/
    }
    if (evt.state === H.data.AbstractReader.State.ERROR) {
      logEvent('KML parsing error')
    }
  });

  // Parse the document
  reader.parse();
}	

      // Initialize the platform object:
      var platform = new H.service.Platform({
        'apikey': 'Nnzp6ejIUzcwPBZmujs3jFvW_9A--x2q91jQREz7aQs'
      });

		// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(document.getElementById('mapContainer'), defaultLayers.vector.normal.map,
	{
      zoom: 15, 
      center: { lat: 52.5, lng: 13.4 },
      engineType: H.map.render.RenderEngine.EngineType.P2D
    });
	window.addEventListener('resize', () => map.getViewPort().resize());

	var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
	
	var ui = H.ui.UI.createDefault(map, defaultLayers);
	
	var logContainer = document.createElement('ul');
	logContainer.className ='log';
	logContainer.innerHTML = '<li class="log-entry">Try clicking on the map</li>';
	map.getElement().appendChild(logContainer);
	
	// Helper for logging events
	function logEvent(str) {
	var entry = document.createElement('li');
	entry.className = 'log-entry';
	entry.textContent = str;
	logContainer.insertBefore(entry, logContainer.firstChild);
	}

	// Step 6: main logic goes here
	renderKML(map);