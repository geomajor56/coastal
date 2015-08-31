/**
 * Created by michael on 6/13/15.
 */

var map, featureList, stationSearch = [], this_station, this_station_name, chart2, thisMin, thisMax;

$(window).resize(function () {
    sizeLayerControl();
});

$(document).on("click", ".feature-row", function (e) {
    $(document).off("mouseout", ".feature-row", clearHighlight);
    sidebarClick(parseInt($(this).attr("id"), 10));
});

$(document).on("mouseover", ".feature-row", function (e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
});

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function () {
    $("#aboutModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
});

$("#list-btn").click(function () {
    $('#sidebar').toggle();
    map.invalidateSize();
    return false;
});

$("#nav-btn").click(function () {
    $(".navbar-collapse").collapse("toggle");
    return false;
});

$("#sidebar-toggle-btn").click(function () {
    $("#sidebar").toggle();
    map.invalidateSize();
    return false;
});

$("#sidebar-hide-btn").click(function () {
    $('#sidebar').hide();
    map.invalidateSize();
});

$("#graphs-button").click(function () {
    $('#table-container').hide();
    $('.charts').show();
});

$("#table-button").click(function () {
    $('.charts').hide();
    $('#data-table').show();
});

$("back-to-map").click(function () {
    $('#table-container').hide();
    $('.charts').hide();
    $('#data-table').bootstrapTable('destroy');

});


$("#chart-btn").click(function () {
    var temperature = [], salinity = [], dissolved_oxygen = [], ph = [],
        nitrogen = [], phosphates = [], silicates = [], ammonium = [], total_nitrogen = [],
        total_phosphorus = [], chlorophyll = [], pheophytin = [], turbidity = [];
    $.ajax({
        type: "POST",
        url: "assets/php/get_station_data.php",
        data: {
            "station_num_id": this_station
        },
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        },
        success: function chartParser(data) {
           //console.log(data);

            var sampleDate, d, sampleYear;

            for (var i = 0; i < data.length; i++) {
                sampleDate = data[i][1];   // in milliseconds for Highcharts
                d = new Date(data[i][1]);
                //console.log(moment(sampleDate));
                //console.log(d);
                sampleYear = d.getFullYear();
                temperature.push([sampleDate, data[i][3]]);
                salinity.push([sampleDate, data[i][4]]);
                dissolved_oxygen.push([sampleDate, data[i][5]]);
                //ph.push([sampleDate, data[i][6]]);
                chlorophyll.push([sampleDate, data[i][13]]);
                pheophytin.push([sampleDate, data[i][14]]);
                turbidity.push([sampleDate, data[i][15]]);
                nitrogen.push([sampleDate, data[i][7]]);
                ammonium.push([sampleDate, data[i][9]]);
                phosphates.push([sampleDate, data[i][8]]);
                silicates.push([sampleDate, data[i][10]]);
                total_nitrogen.push([sampleDate, data[i][11]]);
                total_phosphorus.push([sampleDate, data[i][12]]);


            }

            var chart1, chart2, chart3, chart4, chart5;

            $('#container1').highcharts('StockChart', {

                navigator: {
            height: 20
        },

                scrollbar: {
                    liveRedraw: false
                },

                title: {
                    text: 'Temperature, Salinity, Dissolved Oxygen for Station: ' + this_station_name,
                    align: 'left',
                    style: {
                        fontSize: '14px'
                    }
                },
                legend: {
                    enabled: true,
                    align: 'right',
                    verticalAlign: 'top',
                    x: -20,
                    y: -5,
                    floating: true
                },

                chart: {
                    //width: 1200,
                    height: 250,

                },

                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        year: '%Y'
                    },

                    events: {
                        setExtremes: function (e) {
                            var thisMin = e.min,
                                thisMax = e.max,
                                chart2 = $('#container2').highcharts();
                            chart3 = $('#container3').highcharts();
                            chart4 = $('#container4').highcharts();
                            chart5 = $('#container5').highcharts();

                            chart2.xAxis[0].setExtremes(thisMin, thisMax);
                            chart3.xAxis[0].setExtremes(thisMin, thisMax);
                            chart4.xAxis[0].setExtremes(thisMin, thisMax);
                            chart5.xAxis[0].setExtremes(thisMin, thisMax);
                        }
                    }
                },
                yAxis: [


                    {// Primary yAxis
                        labels: {

                            enabled: true,

                            formatter: function () {
                                return this.value + '°C';
                            },
                            style: {
                                color: '#89A54E'
                            }
                        },
                        title: {
                            text: 'Temperature',
                            style: {
                                color: '#89A54E'
                            }
                        },
                        opposite: false

                    },
                    {// Secondary yAxis
                        gridLineWidth: 0,
                        title: {
                            text: 'Dissolved Oxygen',
                            align: 'middle',
                            style: {
                                color: '#529CF2'
                            }
                        },
                        labels: {

                            formatter: function () {
                                return this.value + ' mg/L';
                            },
                            style: {
                                color: '#529CF2'
                            }
                        }

                    },
                    {// Tertiary yAxis
                        gridLineWidth: 0,
                        title: {
                            text: null,
                            style: {
                                color: '#E83631'
                            }
                        },
                        labels: {
                            enabled: false,
                            formatter: function () {
                                return this.value + ' ppt';
                            },
                            style: {
                                color: '#E83631'
                            }
                        },
                        opposite: true
                    }
                ],
                tooltip: {
                    shared: true
                },

                series: [
                    {
                        connectNulls: false,
                        name: 'Temperature',
                        color: '#89A54E',
                        type: 'area',
                        //type: 'line',
                        data: temperature,
                        tooltip: {
                            valueSuffix: ' °C'
                        },
                        marker: {
                            enabled: false
                        }


                    },
                    {

                        connectNulls: false,
                        name: 'Dissolved Oxygen',
                        color: '#529CF2',
                        // type: 'area',
                        yAxis: 1,
                        data: dissolved_oxygen,
                        tooltip: {
                            valueSuffix: ' mg/L'
                        },
                        marker: {
                            enabled: true
                        }

                    },
                    {
                        connectNulls: false,
                        name: 'Salinity',
                        //  type: 'area',
                        color: '#E83631',
                        yAxis: 2,
                        data: salinity,
                        tooltip: {
                            valueSuffix: ' ppt'
                        },

                        marker: {
                            enabled: true
                        },

                    }
                ]
            });
            $('#container2').highcharts({
                chart: {
                    height: 150,
                    //width: 1200
                },
                title: {
                    text: 'Nitrate + Nitrite, Ammonium for Station: ' + this_station_name,
                    align: 'left',
                    style: {
                        fontSize: '14px'
                    }
                },
                //legend: {
                //    enabled: false
                //},
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    x: -20,
                    y: -5,
                    floating: true
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        year: '%Y'
                    },
                    events: {}
                },
                yAxis: [
                    {// Primary yAxis
                        labels: {
                            format: '{value}um',
                            style: {
                                color: '#a1d76a'
                            }
                        },
                        title: {
                            text: 'Nitrates/Nitrites',
                            style: {
                                color: '#a1d76a'
                            }
                        }
                    },
                    {// Secondary yAxis
                        title: {
                            text: 'Ammonium',
                            style: {
                                color: '#fc8d59'
                            }
                        },
                        labels: {
                            format: '{value} um',
                            style: {
                                color: '#fc8d59'
                            }
                        },
                        opposite: true
                    }
                ],
                tooltip: {
                    shared: true
                },


                series: [
                    {
                        connectNulls: false,
                        name: 'Nitrate+Nitrite',
                        color: '#a1d76a',
                        yAxis: 1,
                        data: nitrogen,
                        //type: 'spline',
                        tooltip: {
                            valueSuffix: ' um'
                        },
                        marker: {
                            enabled: true
                        }

                    },
                    {
                        connectNulls: false,
                        name: 'Ammonium',
                        color: '#fc8d59',
                        data: ammonium,
                        //type: 'spline',
                        tooltip: {
                            valueSuffix: ' um'
                        },
                        marker: {
                            enabled: true
                        }
                    }
                ]

            });
            $('#container3').highcharts({
                chart: {
                    height: 150,
                    //width: 1200
                },
                //legend: {
                //    enabled: false
                //},
                title: {
                    text: 'Ortho-Phosphates and Silicates for : ' + this_station_name,
                    align: 'left',
                    style: {
                        fontSize: '14px'
                    }
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    x: -20,
                    y: -5,
                    floating: true
                },

                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        year: '%Y'
                    },
                    events: {}
                },
                yAxis: [
                    {// Primary yAxis
                        labels: {
                            format: '{value}um',
                            style: {
                                color: '#f46d43'
                            }
                        },
                        title: {
                            text: 'Ortho-Phosphates',
                            style: {
                                color: '#f46d43'
                            }
                        }
                    },
                    {// Secondary yAxis
                        title: {
                            text: 'Silicates',
                            style: {
                                color: '#abd9e9'
                            }
                        },
                        labels: {
                            format: '{value} um',
                            style: {
                                color: '#abd9e9'
                            }
                        },
                        opposite: true
                    }
                ],
                tooltip: {
                    shared: true
                },


                series: [
                    {
                        connectNulls: false,
                        name: 'Ortho-Phosphates',
                        color: '#f46d43',

                        yAxis: 1,
                        data: phosphates,
                        tooltip: {
                            valueSuffix: ' um'
                        },
                        marker: {
                            enabled: true
                        }

                    },
                    {
                        connectNulls: false,
                        name: 'Silicates',
                        color: '#abd9e9',
                        data: silicates,
                        tooltip: {
                            valueSuffix: ' um'
                        },
                        marker: {
                            enabled: true
                        }
                    }
                ]
            });
            $('#container4').highcharts({
                chart: {
                    height: 150,
                    //width: 1200
                },
                //legend: {
                //    enabled: false
                //},
                title: {
                    text: 'Total Nitrogen and Total Phosphorus for Station: ' + this_station_name,
                    align: 'left',
                    style: {
                        fontSize: '14px'
                    }
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    x: -20,
                    y: -5,
                    floating: true
                },

                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        year: '%Y'
                    },
                    events: {}
                },
                yAxis: [
                    {// Primary yAxis
                        labels: {
                            format: '{value}um',
                            style: {
                                color: '#33a02c'
                            }
                        },
                        title: {
                            text: 'Total Nitrogen',
                            style: {
                                color: '#33a02c'
                            }
                        }
                    },
                    {// Secondary yAxis
                        title: {
                            text: 'Total Phosphorus',
                            style: {
                                color: '#ff7f00'
                            }
                        },
                        labels: {
                            format: '{value} um',
                            style: {
                                color: '#ff7f00'
                            }
                        },
                        opposite: true
                    }
                ],
                tooltip: {
                    shared: true
                },


                series: [
                    {
                        connectNulls: false,
                        name: 'Total Nitrogen',
                        color: '#33a02c',

                        yAxis: 1,
                        data: total_nitrogen,
                        tooltip: {
                            valueSuffix: ' um'
                        },
                        marker: {
                            enabled: true
                        }

                    },
                    {
                        connectNulls: false,
                        name: 'Total Phosphorus',
                        color: '#ff7f00',

                        data: total_phosphorus,
                        tooltip: {
                            valueSuffix: ' um'
                        },
                        marker: {
                            enabled: true
                        }
                    }
                ]
            });
            $('#container5').highcharts({
                chart: {
                    height: 150
                                    },
                //legend: {
                //    enabled: false
                //},
                title: {
                    text: 'Chlorophyll, Pheophytin, and Turbidity for Station: ' + this_station_name,
                    align: 'left',
                    style: {
                        fontSize: '14px'
                    }
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    x: -20,
                    y: -5,
                    floating: true
                },

                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        year: '%Y'
                    },
                    events: {}
                },
                yAxis: [
                    {// Primary yAxis
                        title: {
                            text: 'Turbidity',
                            style: {
                                color: '#ED7842'
                            }
                        },

                        labels: {
                            formatter: function () {
                                return this.value + ' NTU';
                            },
                            style: {
                                color: '#ED7842'
                            }
                        }

                    },
                    {// Secondary yAxis
                        title: {
                            text: 'Chlorophyll',
                            style: {
                                color: '#fed976'
                            }
                        },
                        labels: {
                            formatter: function () {
                                return this.value + ' ug/L';
                            },
                            style: {
                                color: '#fed976'
                            }
                        },
                        opposite: true
                    },
                    {// Tertiary yAxis
                        gridLineWidth: 0,
                        title: {
                            text: 'Pheophytin',
                            style: {
                                color: '#8fbc8f'
                            }
                        },
                        labels: {
                            formatter: function () {
                                return this.value + ' ug/L';
                            },
                            style: {
                                color: '#8fbc8f'
                            }
                        },
                        opposite: true

                    }
                ],
                tooltip: {
                    shared: true
                },


                series: [
                    {
                        connectNulls: false,
                        name: 'Turbidity',
                        color: '#A0522D ',
                        data: turbidity,
                        type: 'area',
                        yAxis: 1,
                        marker: {
                            enabled: false
                        },
                        tooltip: {
                            valueSuffix: ' NTU'
                        }
                    },
                    {
                        connectNulls: false,
                        name: 'Pheophytin',
                        color: '#8fbc8f',
                        yAxis: 2,
                        data: pheophytin,
                        marker: {
                            enabled: true
                        },
                        tooltip: {
                            valueSuffix: ' ug/L'
                        }

                    },
                    {
                        connectNulls: false,
                        name: 'Chlorophyll',
                        color: '#fed976',
                        yaxis: 2,
                        data: chlorophyll,
                        marker: {
                            enabled: true
                        },
                        tooltip: {
                            valueSuffix: ' ug/L'
                        }
                    }
                ]
            });
        }
    });

    $('#charts-container').modal("show");
});

function sizeLayerControl() {
    $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
    highlight.clearLayers();
}

function sidebarClick(id) {
    var layer = stations.getLayer(id);
    this_station = layer.feature.properties.station_id;
    this_station_name = layer.feature.properties.station_name;

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
                $("#feature-list tbody").append('<tr class="feature-row" id="'
                    + L.stamp(layer)
                    + '" lat="'
                    + layer.getLatLng().lat
                    + '" lng="' + layer.getLatLng().lng
                    + '"><td style="vertical-align: middle;"></td><td class="feature-name">'
                    + layer.feature.properties.station_name
                    + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
            }

        }
    });

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
                    this_station = feature.properties.station_id;
                    this_station_name = layer.feature.properties.station_name;
                    //console.log("from onEachFeature:", this_station);
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


map = L.map("map", {
    zoom: 10,
    center: [41.7672146942102, -70.3509521484375],
    layers: [Esri_OceanBasemap, highlight],
    zoomControl: true,
    attributionControl: false
});
L.control.navbar().addTo(map);

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function (e) {
    if (e.layer === stationLayer) {
        markerClusters.addLayer(stations);
        syncSidebar();
    }
    if (e.layer === museumLayer) {
        markerClusters.addLayer(museums);
        syncSidebar();
    }
});

map.on("overlayremove", function (e) {
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
map.on("click", function (e) {
    highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
    $.each(map._layers, function (index, layer) {
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


/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
    var isCollapsed = true;
} else {
    var isCollapsed = false;
}


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
    featureList.sort("feature-name", {order: "asc"});


    var stationsBH = new Bloodhound({
        name: "Theaters",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: stationSearch,
        limit: 10
    });


    stationsBH.initialize();

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
//var container = $(".leaflet-control-layers")[0];
//if (!L.Browser.touch) {
//    L.DomEvent
//        .disableClickPropagation(container)
//        .disableScrollPropagation(container);
//} else {
//    L.DomEvent.disableClickPropagation(container);
//}


