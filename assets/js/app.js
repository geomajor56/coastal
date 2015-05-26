var map, featureList, stationSearch = [];

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

$(document).on("mouseover", ".feature-row", function(e) {
  highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
});

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(boroughs.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  $('#sidebar').toggle();
  map.invalidateSize();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  $("#sidebar").toggle();
  map.invalidateSize();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  $('#sidebar').hide();
  map.invalidateSize();
});

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = stations.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

function syncSidebar() {
  /* Empty sidebar features */
  $("#feature-list tbody").empty();
  /* Loop through stations layer and add only features which are in the map bounds */
  stations.eachLayer(function (layer) {
    if (map.hasLayer(stations)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"></td><td class="feature-name">' + layer.feature.properties.station_name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Loop through museums layer and add only features which are in the map bounds */
  //museums.eachLayer(function (layer) {
  //  if (map.hasLayer(museumLayer)) {
  //    if (map.getBounds().contains(layer.getLatLng())) {
  //      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.station_name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
  //    }
  //  }
  //});
  /* Update list.js featureList */
  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });
}

/* Basemap Layers */
var Esri_OceanBasemap = L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
    maxZoom: 14
});

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "yellow",
  fillOpacity: 0.7,
  radius: 14
};

//var boroughs = L.geoJson(null, {
//  style: function (feature) {
//    return {
//      color: "black",
//      fill: false,
//      opacity: 1,
//      clickable: false
//    };
//  },
//  onEachFeature: function (feature, layer) {
//    boroughSearch.push({
//      name: layer.feature.properties.BoroName,
//      source: "Boroughs",
//      id: L.stamp(layer),
//      bounds: layer.getBounds()
//    });
//  }
//});
//$.getJSON("data/boroughs.geojson", function (data) {
//  boroughs.addData(data);
//});

//var subwayLines = L.geoJson(null, {
//  style: function (feature) {
//    if (feature.properties.route_id === "1" || feature.properties.route_id === "2" || feature.properties.route_id === "3") {
//      return {
//        color: "#ff3135",
//        weight: 3,
//        opacity: 1
//      };
//    }
//    if (feature.properties.route_id === "4" || feature.properties.route_id === "5" || feature.properties.route_id === "6") {
//      return {
//        color: "#009b2e",
//        weight: 3,
//        opacity: 1
//      };
//    }
//    if (feature.properties.route_id === "7") {
//      return {
//        color: "#ce06cb",
//        weight: 3,
//        opacity: 1
//      };
//    }
//    if (feature.properties.route_id === "A" || feature.properties.route_id === "C" || feature.properties.route_id === "E" || feature.properties.route_id === "SI" || feature.properties.route_id === "H") {
//      return {
//        color: "#fd9a00",
//        weight: 3,
//        opacity: 1
//      };
//    }
//    if (feature.properties.route_id === "Air") {
//      return {
//        color: "#ffff00",
//        weight: 3,
//        opacity: 1
//      };
//    }
//    if (feature.properties.route_id === "B" || feature.properties.route_id === "D" || feature.properties.route_id === "F" || feature.properties.route_id === "M") {
//      return {
//        color: "#ffff00",
//        weight: 3,
//        opacity: 1
//      };
//    }
//    if (feature.properties.route_id === "G") {
//      return {
//        color: "#9ace00",
//        weight: 3,
//        opacity: 1
//      };
//    }
//    if (feature.properties.route_id === "FS" || feature.properties.route_id === "GS") {
//      return {
//        color: "#6e6e6e",
//        weight: 3,
//        opacity: 1
//      };
//    }
//    if (feature.properties.route_id === "J" || feature.properties.route_id === "Z") {
//      return {
//        color: "#976900",
//        weight: 3,
//        opacity: 1
//      };
//    }
//    if (feature.properties.route_id === "L") {
//      return {
//        color: "#969696",
//        weight: 3,
//        opacity: 1
//      };
//    }
//    if (feature.properties.route_id === "N" || feature.properties.route_id === "Q" || feature.properties.route_id === "R") {
//      return {
//        color: "#ffff00",
//        weight: 3,
//        opacity: 1
//      };
//    }
//  },
//  onEachFeature: function (feature, layer) {
//    if (feature.properties) {
//      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Division</th><td>" + feature.properties.Division + "</td></tr>" + "<tr><th>Line</th><td>" + feature.properties.Line + "</td></tr>" + "<table>";
//      layer.on({
//        click: function (e) {
//          $("#feature-title").html(feature.properties.Line);
//          $("#feature-info").html(content);
//          $("#featureModal").modal("show");
//
//        }
//      });
//    }
//    layer.on({
//      mouseover: function (e) {
//        var layer = e.target;
//        layer.setStyle({
//          weight: 3,
//          color: "#00FFFF",
//          opacity: 1
//        });
//        if (!L.Browser.ie && !L.Browser.opera) {
//          layer.bringToFront();
//        }
//      },
//      mouseout: function (e) {
//        subwayLines.resetStyle(e.target);
//      }
//    });
//  }
//});
//$.getJSON("data/subways.geojson", function (data) {
//  subwayLines.addData(data);
//});

/* Single marker cluster layer to hold all clusters */
//var markerClusters = new L.MarkerClusterGroup({
//  spiderfyOnMaxZoom: true,
//  showCoverageOnHover: false,
//  zoomToBoundsOnClick: true,
//  disableClusteringAtZoom: 16
//});

/* Empty layer placeholder to add to layer control for listening when to add/remove stations to markerClusters layer */
var stationLayer = L.geoJson(null);

var stations = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.MakiMarkers.icon({
        icon: "chemist",
        color: "#09962F",
                size: "s"
               }),
      title: feature.properties.station_name,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>"
          + "<tr><th>Station Name</th><td>" + feature.properties.station_name + "</td></tr>"
          + "<tr><th>Station Id</th><td>" + feature.properties.station_id + "</td></tr>"
          + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.station_name);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"></td><td class="feature-name">' + layer.feature.properties.station_name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      stationSearch.push({
        name: layer.feature.properties.station_name,
        address: layer.feature.properties.ADDRESS1,
        source: "Theaters",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});

$.getJSON('assets/php/get_stations.php', function (data) {
    stations.addData(data);
    map.addLayer(stations);
});

//$.getJSON("data/DOITT_THEATER_01_13SEPT2010.geojson", function (data) {
//  stations.addData(data);
//  map.addLayer(stationLayer);
//});

/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var museumLayer = L.geoJson(null);
var museums = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/museum.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.station_name,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.station_name + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.station_name);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.station_name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      museumSearch.push({
        name: layer.feature.properties.station_name,
        address: layer.feature.properties.ADRESS1,
        source: "Museums",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
//$.getJSON("data/DOITT_MUSEUM_01_13SEPT2010.geojson", function (data) {
//  museums.addData(data);
//});

map = L.map("map", {
  zoom: 10,
    center: [41.7672146942102, -70.3509521484375],
    layers: [Esri_OceanBasemap, highlight],
    zoomControl: true,
    attributionControl: false
});
L.control.navbar().addTo(map);

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  if (e.layer === stationLayer) {
    markerClusters.addLayer(stations);
    syncSidebar();
  }
  if (e.layer === museumLayer) {
    markerClusters.addLayer(museums);
    syncSidebar();
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === stationLayer) {
    markerClusters.removeLayer(stations);
    syncSidebar();
  }
  if (e.layer === museumLayer) {
    markerClusters.removeLayer(museums);
    syncSidebar();
  }
});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by <a href='http://bryanmcbride.com'>bryanmcbride.com</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

//var zoomControl = L.control.zoom({
//  position: "bottomright"
//}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
//var locateControl = L.control.locate({
//  position: "bottomright",
//  drawCircle: true,
//  follow: true,
//  setView: true,
//  keepCurrentZoomLevel: true,
//  markerStyle: {
//    weight: 1,
//    opacity: 0.8,
//    fillOpacity: 0.8
//  },
//  circleStyle: {
//    weight: 1,
//    clickable: false
//  },
//  icon: "icon-direction",
//  metric: false,
//  strings: {
//    title: "My location",
//    popup: "You are within {distance} {unit} from this point",
//    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
//  },
//  locateOptions: {
//    maxZoom: 18,
//    watch: true,
//    enableHighAccuracy: true,
//    maximumAge: 10000,
//    timeout: 10000
//  }
//}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

//var baseLayers = {
//  "Street Map": mapquestOSM,
//  "Aerial Imagery": mapquestOAM,
//  "Imagery with Streets": mapquestHYB
//};

//var groupedOverlays = {
//  "Points of Interest": {
//    "<img src='assets/img/station.png' width='24' height='28'>&nbsp;Theaters": stationLayer,
//    "<img src='assets/img/museum.png' width='24' height='28'>&nbsp;Museums": museumLayer
//  },
//  "Reference": {
//    "Boroughs": boroughs,
//    "Subway Lines": subwayLines
//  }
//};

//var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
//  collapsed: isCollapsed
//}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  /* Fit map to boroughs bounds */
  //map.fitBounds(boroughs.getBounds());
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});

  //var boroughsBH = new Bloodhound({
  //  name: "Boroughs",
  //  datumTokenizer: function (d) {
  //    return Bloodhound.tokenizers.whitespace(d.name);
  //  },
  //  queryTokenizer: Bloodhound.tokenizers.whitespace,
  //  local: boroughSearch,
  //  limit: 10
  //});

  var stationsBH = new Bloodhound({
    name: "Theaters",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: stationSearch,
    limit: 10
  });

  //var museumsBH = new Bloodhound({
  //  name: "Museums",
  //  datumTokenizer: function (d) {
  //    return Bloodhound.tokenizers.whitespace(d.name);
  //  },
  //  queryTokenizer: Bloodhound.tokenizers.whitespace,
  //  local: museumSearch,
  //  limit: 10
  //});

  //var geonamesBH = new Bloodhound({
  //  name: "GeoNames",
  //  datumTokenizer: function (d) {
  //    return Bloodhound.tokenizers.whitespace(d.name);
  //  },
  //  queryTokenizer: Bloodhound.tokenizers.whitespace,
  //  remote: {
  //    url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
  //    filter: function (data) {
  //      return $.map(data.geonames, function (result) {
  //        return {
  //          name: result.name + ", " + result.adminCode1,
  //          lat: result.lat,
  //          lng: result.lng,
  //          source: "GeoNames"
  //        };
  //      });
  //    },
  //    ajax: {
  //      beforeSend: function (jqXhr, settings) {
  //        settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
  //        $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
  //      },
  //      complete: function (jqXHR, status) {
  //        $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
  //      }
  //    }
  //  },
  //  limit: 10
  //});
  //boroughsBH.initialize();
  stationsBH.initialize();
  //museumsBH.initialize();
  //geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "Stations",
    displayKey: "name",
    source: stationsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Boroughs</h4>"
      //suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }


  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "Boroughs") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "Theaters") {
      if (!map.hasLayer(stationLayer)) {
        map.addLayer(stationLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Museums") {
      if (!map.hasLayer(museumLayer)) {
        map.addLayer(museumLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
