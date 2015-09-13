$(function () {
    var chart1;
    var chart2;
    var chart3;
    var chart4;
    var chart5;
    var controllingChart;

    var defaultTickInterval = 5;
    var currentTickInterval = defaultTickInterval;

    $(document).ready(function () {
        function unzoom() {
            chart1.options.chart.isZoomed = false;
            chart2.options.chart.isZoomed = false;
            chart3.options.chart.isZoomed = false;
            chart4.options.chart.isZoomed = false;
            chart4.options.chart.isZoomed = false;

            chart1.xAxis[0].setExtremes(null, null);
            chart2.xAxis[0].setExtremes(null, null);
            chart3.xAxis[0].setExtremes(null, null);
            chart4.xAxis[0].setExtremes(null, null);
            chart5.xAxis[0].setExtremes(null, null);
        }

        //catch mousemove event and have all 3 charts' crosshairs move along indicated values on x axis

        function syncronizeCrossHairs(chart) {
            var container = $(chart.container),
                offset = container.offset(),
                x, y, isInside, report;

            container.mousemove(function (evt) {

                x = evt.clientX - chart.plotLeft - offset.left;
                y = evt.clientY - chart.plotTop - offset.top;
                var xAxis = chart.xAxis[0];
                //remove old plot line and draw new plot line (crosshair) for this chart
                var xAxis1 = chart1.xAxis[0];
                xAxis1.removePlotLine("myPlotLineId");
                xAxis1.addPlotLine({
                    value: chart.xAxis[0].translate(x, true),
                    width: 1,
                    color: 'red',
                    //dashStyle: 'dash',
                    id: "myPlotLineId"
                });
                //remove old crosshair and draw new crosshair on chart2
                var xAxis2 = chart2.xAxis[0];
                xAxis2.removePlotLine("myPlotLineId");
                xAxis2.addPlotLine({
                    value: chart.xAxis[0].translate(x, true),
                    width: 1,
                    color: 'red',
                    //dashStyle: 'dash',
                    id: "myPlotLineId"
                });

                var xAxis3 = chart3.xAxis[0];
                xAxis3.removePlotLine("myPlotLineId");
                xAxis3.addPlotLine({
                    value: chart.xAxis[0].translate(x, true),
                    width: 1,
                    color: 'red',
                    //dashStyle: 'dash',
                    id: "myPlotLineId"
                });

                var xAxis4 = chart4.xAxis[0];
                xAxis4.removePlotLine("myPlotLineId");
                xAxis4.addPlotLine({
                    value: chart.xAxis[0].translate(x, true),
                    width: 1,
                    color: 'red',
                    //dashStyle: 'dash',
                    id: "myPlotLineId"
                });

                var xAxis5 = chart5.xAxis[0];
                xAxis5.removePlotLine("myPlotLineId");
                xAxis5.addPlotLine({
                    value: chart.xAxis[0].translate(x, true),
                    width: 1,
                    color: 'red',
                    //dashStyle: 'dash',
                    id: "myPlotLineId"
                });

                //if you have other charts that need to be syncronized - update their crosshair (plot line) in the same way in this function.
            });
        }

        //compute a reasonable tick interval given the zoom range -
        //have to compute this since we set the tickIntervals in order
        //to get predictable synchronization between 3 charts with
        //different data.
        function computeTickInterval(xMin, xMax) {
            var zoomRange = xMax - xMin;

            if (zoomRange <= 2)
                currentTickInterval = 0.5;
            if (zoomRange < 20)
                currentTickInterval = 1;
            else if (zoomRange < 100)
                currentTickInterval = 5;
        }

        //explicitly set the tickInterval for the 3 charts - based on
        //selected range
        function setTickInterval(event) {
            var xMin = event.xAxis[0].min;
            var xMax = event.xAxis[0].max;
            computeTickInterval(xMin, xMax);

            chart1.xAxis[0].options.tickInterval = currentTickInterval;
            chart1.xAxis[0].isDirty = true;
            chart2.xAxis[0].options.tickInterval = currentTickInterval;
            chart2.xAxis[0].isDirty = true;
            chart3.xAxis[0].options.tickInterval = currentTickInterval;
            chart3.xAxis[0].isDirty = true;
            chart4.xAxis[0].options.tickInterval = currentTickInterval;
            chart4.xAxis[0].isDirty = true;
            chart5.xAxis[0].options.tickInterval = currentTickInterval;
            chart5.xAxis[0].isDirty = true;
        }

        //reset the extremes and the tickInterval to default values
        function unzoom() {
            chart1.xAxis[0].options.tickInterval = defaultTickInterval;
            chart1.xAxis[0].isDirty = true;
            chart2.xAxis[0].options.tickInterval = defaultTickInterval;
            chart2.xAxis[0].isDirty = true;
            chart3.xAxis[0].options.tickInterval = defaultTickInterval;
            chart3.xAxis[0].isDirty = true;
            chart4.xAxis[0].options.tickInterval = defaultTickInterval;
            chart4.xAxis[0].isDirty = true;
            chart5.xAxis[0].options.tickInterval = defaultTickInterval;
            chart5.xAxis[0].isDirty = true;

            chart1.xAxis[0].setExtremes(null, null);
            chart2.xAxis[0].setExtremes(null, null);
            chart3.xAxis[0].setExtremes(null, null);
            chart4.xAxis[0].setExtremes(null, null);
            chart5.xAxis[0].setExtremes(null, null);
        }

        $(document).ready(function () {


            $('#btn').click(function () {
                unzoom();
            });

            var myPlotLineId = "myPlotLine";
            chart1 = new Highcharts.Chart({
                chart: {
                    renderTo: 'container1',
                    type: 'line',
                    zoomType: 'x',
                    //x axis only
                    borderColor: '#003399',
                    //'#022455',
                    borderWidth: 1,
                    isZoomed: false
                },

                legend: {
                    enabled: false
                },

                title: {
                    text: 'Temperature, Salinity, Dissolved Oxygen for Station: '
                },

                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        year: '%Y'
                    },

                    title: {
                        enabled: true,
                        text: 'Height (cm)'
                    },
                    tickInterval: 5,
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true,
                    events: {

                        afterSetExtremes: function () {

                            if (!this.chart.options.chart.isZoomed) {
                                var xMin = this.chart.xAxis[0].min;
                                var xMax = this.chart.xAxis[0].max;

                                var zmRange = computeTickInterval(xMin, xMax);
                                chart1.xAxis[0].options.tickInterval = zmRange;
                                chart1.xAxis[0].isDirty = true;
                                chart2.xAxis[0].options.tickInterval = zmRange;
                                chart2.xAxis[0].isDirty = true;
                                chart3.xAxis[0].options.tickInterval = zmRange;
                                chart3.xAxis[0].isDirty = true;
                                chart4.xAxis[0].options.tickInterval = zmRange;
                                chart4.xAxis[0].isDirty = true;
                                chart5.xAxis[0].options.tickInterval = zmRange;
                                chart5.xAxis[0].isDirty = true;

                                chart2.options.chart.isZoomed = true;
                                chart3.options.chart.isZoomed = true;
                                chart4.options.chart.isZoomed = true;
                                chart5.options.chart.isZoomed = true;

                                chart2.xAxis[0].setExtremes(xMin, xMax, true);
                                chart3.xAxis[0].setExtremes(xMin, xMax, true);
                                chart4.xAxis[0].setExtremes(xMin, xMax, true);
                                chart5.xAxis[0].setExtremes(xMin, xMax, true);

                                chart2.options.chart.isZoomed = false;
                                chart3.options.chart.isZoomed = false;
                                chart4.options.chart.isZoomed = false;
                                chart5.options.chart.isZoomed = false;
                            }
                        }


                    }
                },
                yAxis: [
                    {// Primary yAxis
                        labels: {
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
                        opposite: true

                    },
                    {// Secondary yAxis
                        gridLineWidth: 0,
                        title: {
                            text: 'Dissolved Oxygen',
                            style: {
                                color: '#4572A7'
                            }
                        },
                        labels: {
                            formatter: function () {
                                return this.value + ' mg/L';
                            },
                            style: {
                                color: '#4572A7'
                            }
                        }

                    },
                    {// Tertiary yAxis
                        gridLineWidth: 0,
                        title: {
                            text: 'Salinity',
                            style: {
                                color: '#AA4643'
                            }
                        },
                        labels: {
                            formatter: function () {
                                return this.value + ' ppt';
                            },
                            style: {
                                color: '#AA4643'
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
                        name: 'Temperature',
                        color: '#89A54E',
                        type: 'area',
                        data: temperature,
                        tooltip: {
                            valueSuffix: ' °C'
                        },
                        marker: {
                            enabled: false
                        }

                    },
                    {

                        name: 'Dissolved Oxygen',
                        color: '#4572A7',
                        type: 'spline',
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
                        name: 'Salinity',
                        type: 'spline',
                        color: '#AA4643',
                        yAxis: 2,
                        data: salinity,
                        tooltip: {
                            valueSuffix: ' ppt'
                        },

                        marker: {
                            enabled: true
                        }

                    }
                ]

            }, function (chart) { //add this function to the chart definition to get synchronized crosshairs
                syncronizeCrossHairs(chart);
            });

            chart2 = new Highcharts.Chart({
                chart: {
                    renderTo: 'container2',
                    type: 'line',
                    zoomType: 'x',
                    //x axis only
                    borderColor: '#003399',
                    //'#022455',
                    borderWidth: 1,
                    isZoomed: false
                    /*events: {
                     selection: function(event) { //this function should zoom chart1, chart2, chart3 according to selected range
                     controllingChart = "chart2";
                     setTickInterval(event);
                     }
                     }*/
                },
                title: {
                    text: 'Nitrates/Nitrites, Ammonium for Station: ' + this_station
                },

                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        year: '%Y'
                    },
                    //title: {
                    //    enabled: true,
                    //    text: 'Height (cm)'
                    //},
                    tickInterval: 5,
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true,
                    events: {
                        afterSetExtremes: function () {
                            if (!this.chart.options.chart.isZoomed) {
                                var xMin = this.chart.xAxis[0].min;
                                var xMax = this.chart.xAxis[0].max;
                                var zmRange = computeTickInterval(xMin, xMax);
                                chart1.xAxis[0].options.tickInterval = zmRange;
                                chart1.xAxis[0].isDirty = true;
                                chart2.xAxis[0].options.tickInterval = zmRange;
                                chart2.xAxis[0].isDirty = true;
                                chart3.xAxis[0].options.tickInterval = zmRange;
                                chart3.xAxis[0].isDirty = true;
                                chart4.xAxis[0].options.tickInterval = zmRange;
                                chart4.xAxis[0].isDirty = true;
                                chart5.xAxis[0].options.tickInterval = zmRange;
                                chart5.xAxis[0].isDirty = true;


                                chart1.options.chart.isZoomed = true;
                                chart3.options.chart.isZoomed = true;
                                chart4.options.chart.isZoomed = true;
                                chart5.options.chart.isZoomed = true;

                                chart1.xAxis[0].setExtremes(xMin, xMax, true);
                                chart3.xAxis[0].setExtremes(xMin, xMax, true);
                                chart4.xAxis[0].setExtremes(xMin, xMax, true);
                                chart5.xAxis[0].setExtremes(xMin, xMax, true);

                                chart1.options.chart.isZoomed = false;
                                chart3.options.chart.isZoomed = false;
                                chart4.options.chart.isZoomed = false;
                                chart5.options.chart.isZoomed = false;

                            }
                        }
                    }
                },
                yAxis: [
                    {// Primary yAxis
                        labels: {
                            format: '{value}um',
                            style: {
                                color: '#89A54E'
                            }
                        },
                        title: {
                            text: 'Nitrates/Nitrites',
                            style: {
                                color: '#89A54E'
                            }
                        }
                    },
                    {// Secondary yAxis
                        title: {
                            text: 'Ammonium',
                            style: {
                                color: '#4572A7'
                            }
                        },
                        labels: {
                            format: '{value} um',
                            style: {
                                color: '#4572A7'
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
                        name: 'Total Nitrogen',
                        color: '#4572A7',

                        yAxis: 1,
                        data: nitrogen,
                        tooltip: {
                            valueSuffix: ' um'
                        },
                        marker: {
                            enabled: true
                        }

                    },
                    {
                        name: 'Ammonium',
                        color: '#89A54E',

                        data: ammonium,
                        tooltip: {
                            valueSuffix: ' um'
                        },
                        marker: {
                            enabled: true
                        }
                    }
                ]
            }, function (chart) { //add this function to the chart definition to get synchronized crosshairs
                //this function needs to be added to each syncronized chart
                syncronizeCrossHairs(chart);

            });

            chart3 = new Highcharts.Chart({
                chart: {
                    renderTo: 'container3',
                    type: 'line',
                    zoomType: 'x',
                    //x axis only
                    borderColor: '#003399',
                    //'#022455',
                    borderWidth: 1,
                    isZoomed: false
                    /*events: {
                     selection: function(event) { //this function should zoom chart1, chart2, chart3
                     controllingChart = "chart3";
                     setTickInterval(event);
                     }
                     }*/
                },
                title: {
                    text: 'Total Nitrogen and Phosphorus for Station: ' + this_station
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        year: '%Y'
                    },

                    tickInterval: 5,
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true,
                    events: {
                        afterSetExtremes: function () {
                            if (!this.chart.options.chart.isZoomed) {
                                var xMin = this.chart.xAxis[0].min;
                                var xMax = this.chart.xAxis[0].max;
                                var zmRange = computeTickInterval(xMin, xMax);
                                chart1.xAxis[0].options.tickInterval = zmRange;
                                chart1.xAxis[0].isDirty = true;
                                chart2.xAxis[0].options.tickInterval = zmRange;
                                chart2.xAxis[0].isDirty = true;
                                chart3.xAxis[0].options.tickInterval = zmRange;
                                chart3.xAxis[0].isDirty = true;
                                chart4.xAxis[0].options.tickInterval = zmRange;
                                chart4.xAxis[0].isDirty = true;
                                chart5.xAxis[0].options.tickInterval = zmRange;
                                chart5.xAxis[0].isDirty = true;

                                chart1.options.chart.isZoomed = true;
                                chart2.options.chart.isZoomed = true;
                                chart4.options.chart.isZoomed = true;
                                chart5.options.chart.isZoomed = true;

                                chart1.xAxis[0].setExtremes(xMin, xMax, true);
                                chart2.xAxis[0].setExtremes(xMin, xMax, true);
                                chart4.xAxis[0].setExtremes(xMin, xMax, true);
                                chart5.xAxis[0].setExtremes(xMin, xMax, true);

                                chart1.options.chart.isZoomed = false;
                                chart2.options.chart.isZoomed = false;
                                chart4.options.chart.isZoomed = false;
                                chart5.options.chart.isZoomed = false;

                            }
                        }
                    }
                },
                yAxis: [
                    {// Primary yAxis
                        labels: {
                            format: '{value}um',
                            style: {
                                color: '#89A54E'
                            }
                        },
                        title: {
                            text: 'Total Nitrogen',
                            style: {
                                color: '#89A54E'
                            }
                        }
                    },
                    {// Secondary yAxis
                        title: {
                            text: 'Total Phosphorus',
                            style: {
                                color: '#4572A7'
                            }
                        },
                        labels: {
                            format: '{value} um',
                            style: {
                                color: '#4572A7'
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
                        name: 'Total Nitrogen',
                        color: '#4572A7',

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
                        name: 'Total Phosphorus',
                        color: '#89A54E',

                        data: total_phosphorus,
                        tooltip: {
                            valueSuffix: ' um'
                        },
                        marker: {
                            enabled: true
                        }
                    }
                ]
            }, function (chart) { //add this function to the chart definition to get synchronized crosshairs
                //this function needs to be added to each syncronized chart
                syncronizeCrossHairs(chart);

            });

            chart4 = new Highcharts.Chart({
                chart: {
                    renderTo: 'container4',
                    type: 'line',
                    zoomType: 'x',
                    //x axis only
                    borderColor: '#003399',
                    //'#022455',
                    borderWidth: 1,
                    isZoomed: false
                    /*events: {
                     selection: function(event) { //this function should zoom chart1, chart2, chart3
                     controllingChart = "chart3";
                     setTickInterval(event);
                     }
                     }*/
                },
                title: {
                    text: 'Chlorophyll, Pheophytin, and Turbidity for Station: ' + this_station
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        year: '%Y'
                    },
                    tickInterval: 5,
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true,
                    events: {
                        afterSetExtremes: function () {
                            if (!this.chart.options.chart.isZoomed) {
                                var xMin = this.chart.xAxis[0].min;
                                var xMax = this.chart.xAxis[0].max;
                                var zmRange = computeTickInterval(xMin, xMax);
                                chart1.xAxis[0].options.tickInterval = zmRange;
                                chart1.xAxis[0].isDirty = true;
                                chart2.xAxis[0].options.tickInterval = zmRange;
                                chart2.xAxis[0].isDirty = true;
                                chart3.xAxis[0].options.tickInterval = zmRange;
                                chart3.xAxis[0].isDirty = true;
                                chart4.xAxis[0].options.tickInterval = zmRange;
                                chart4.xAxis[0].isDirty = true;
                                chart5.xAxis[0].options.tickInterval = zmRange;
                                chart5.xAxis[0].isDirty = true;

                                chart1.options.chart.isZoomed = true;
                                chart2.options.chart.isZoomed = true;
                                chart3.options.chart.isZoomed = true;
                                chart5.options.chart.isZoomed = true;

                                chart1.xAxis[0].setExtremes(xMin, xMax, true);
                                chart2.xAxis[0].setExtremes(xMin, xMax, true);
                                chart3.xAxis[0].setExtremes(xMin, xMax, true);
                                chart5.xAxis[0].setExtremes(xMin, xMax, true);

                                chart1.options.chart.isZoomed = false;
                                chart2.options.chart.isZoomed = false;
                                chart3.options.chart.isZoomed = false;
                                chart5.options.chart.isZoomed = false;

                            }
                        }
                    }
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
                                color: '#556b2f'
                            }
                        },
                        labels: {
                            formatter: function () {
                                return this.value + ' ug/L';
                            },
                            style: {
                                color: '#556b2f'
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
                        name: 'Chlorophyll',
                        color: '#556b2f',
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
            }, function (chart) { //add this function to the chart definition to get synchronized crosshairs
                //this function needs to be added to each syncronized chart
                syncronizeCrossHairs(chart);

            });

            chart5 = new Highcharts.Chart({
                chart: {
                    renderTo: 'container5',
                    type: 'line',
                    zoomType: 'x',
                    //x axis only
                    borderColor: '#003399',
                    //'#022455',
                    borderWidth: 1,
                    isZoomed: false
                    /*events: {
                     selection: function(event) { //this function should zoom chart1, chart2, chart3
                     controllingChart = "chart3";
                     setTickInterval(event);
                     }
                     }*/
                },
                title: {
                    text: 'Ortho-Phosphates and Silicates for : ' + this_station
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'Height (cm)'
                    },
                    tickInterval: 5,
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true,
                    events: {
                        afterSetExtremes: function () {
                            if (!this.chart.options.chart.isZoomed) {
                                var xMin = this.chart.xAxis[0].min;
                                var xMax = this.chart.xAxis[0].max;
                                var zmRange = computeTickInterval(xMin, xMax);
                                chart1.xAxis[0].options.tickInterval = zmRange;
                                chart1.xAxis[0].isDirty = true;
                                chart2.xAxis[0].options.tickInterval = zmRange;
                                chart2.xAxis[0].isDirty = true;
                                chart3.xAxis[0].options.tickInterval = zmRange;
                                chart3.xAxis[0].isDirty = true;
                                chart4.xAxis[0].options.tickInterval = zmRange;
                                chart4.xAxis[0].isDirty = true;
                                chart5.xAxis[0].options.tickInterval = zmRange;
                                chart5.xAxis[0].isDirty = true;

                                chart1.options.chart.isZoomed = true;
                                chart2.options.chart.isZoomed = true;
                                chart3.options.chart.isZoomed = true;
                                chart4.options.chart.isZoomed = true;

                                chart1.xAxis[0].setExtremes(xMin, xMax, true);
                                chart2.xAxis[0].setExtremes(xMin, xMax, true);
                                chart3.xAxis[0].setExtremes(xMin, xMax, true);
                                chart4.xAxis[0].setExtremes(xMin, xMax, true);

                                chart1.options.chart.isZoomed = false;
                                chart2.options.chart.isZoomed = false;
                                chart3.options.chart.isZoomed = false;
                                chart4.options.chart.isZoomed = false;

                            }
                        }
                    }
                },
                yAxis: [
                    {// Primary yAxis
                        labels: {
                            format: '{value}um',
                            style: {
                                color: '#89A54E'
                            }
                        },
                        title: {
                            text: 'Ortho-Phosphates',
                            style: {
                                color: '#89A54E'
                            }
                        }
                    },
                    {// Secondary yAxis
                        title: {
                            text: 'Silicates',
                            style: {
                                color: '#4572A7'
                            }
                        },
                        labels: {
                            format: '{value} um',
                            style: {
                                color: '#4572A7'
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
                        name: 'Ortho-Phosphates',
                        color: '#4572A7',

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
                        name: 'Total Phosphorus',
                        color: '#89A54E',

                        data: silicates,
                        tooltip: {
                            valueSuffix: ' um'
                        },
                        marker: {
                            enabled: true
                        }
                    }
                ]
            }, function (chart) { //add this function to the chart definition to get synchronized crosshairs
                //this function needs to be added to each syncronized chart
                syncronizeCrossHairs(chart);

            });


        });

    });

});