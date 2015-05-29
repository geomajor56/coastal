/**
 * Created by michael on 5/29/15.
 */
$(function () {
    var chart1;
    var chart2;
    var chart3;
    var controllingChart;

    var defaultTickInterval = 5;
    var currentTickInterval = defaultTickInterval;

    $(document).ready(function () {
        function unzoom() {
            chart1.options.chart.isZoomed = false;
            chart2.options.chart.isZoomed = false;
            chart3.options.chart.isZoomed = false;

            chart1.xAxis[0].setExtremes(null, null);
            chart2.xAxis[0].setExtremes(null, null);
            chart3.xAxis[0].setExtremes(null, null);
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
        }

        //reset the extremes and the tickInterval to default values
        function unzoom() {
            chart1.xAxis[0].options.tickInterval = defaultTickInterval;
            chart1.xAxis[0].isDirty = true;
            chart2.xAxis[0].options.tickInterval = defaultTickInterval;
            chart2.xAxis[0].isDirty = true;
            chart3.xAxis[0].options.tickInterval = defaultTickInterval;
            chart3.xAxis[0].isDirty = true;
            chart3.xAxis[0].options.tickInterval = defaultTickInterval;
            chart3.xAxis[0].isDirty = true;

            chart1.xAxis[0].setExtremes(null, null);
            chart2.xAxis[0].setExtremes(null, null);
            chart3.xAxis[0].setExtremes(null, null);
            chart4.xAxis[0].setExtremes(null, null);
        }

        $(document).ready(function () {


            $('#btn').click(function () {
                unzoom();
            });

            var myPlotLineId = "myPlotLine";
            chart1 = new Highcharts.Chart({
                chart: {
                    renderTo: 'container',
                    type: 'line',
                    zoomType: 'x',
                    //x axis only
                    borderColor: '#003399',
                    //'#022455',
                    borderWidth: 1,
                    isZoomed: false
                },
                title: {
                    text: 'Height Versus Weight'
                },
                subtitle: {
                    text: 'Source: Notional Test Data'
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

                                chart2.options.chart.isZoomed = true;
                                chart3.options.chart.isZoomed = true;
                                chart2.xAxis[0].setExtremes(xMin, xMax, true);

                                chart3.xAxis[0].setExtremes(xMin, xMax, true);
                                chart2.options.chart.isZoomed = false;
                                chart3.options.chart.isZoomed = false;
                            }
                        }


                    }
                },
                yAxis: {
                    title: {
                        text: 'Weight (kg)'
                    }
                },
                tooltip: {
                    formatter: function () {
                        return '' + this.x + ' km, ' + this.y + ' km';
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 100,
                    y: 70,
                    floating: true,
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'Group 1',
                    color: 'rgba(223, 83, 83, .5)',
                    data: [[146.2, 51.6], [147.5, 59.0], [148.5, 49.2], [151.0, 63.0], [155.8, 53.6],
                        [157.0, 59.0], [159.1, 47.6], [161.0, 69.8], [166.2, 66.8], [168.2, 75.2],
                        [172.5, 55.2], [174.9, 54.2], [176.9, 62.5], [180.4, 42.0], [190.0, 50.0]]

                },
                    {
                        name: 'dummy_data',
                        //put this in so that x axis is consistent between 3 charts to begin with
                        color: 'rgba(119, 152, 191, .5)',
                        showInLegend: false,
                        data: [[145.0, 0.0], [200.0, 0.0]]
                    }]

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
                    text: 'Height Versus Weight'
                },
                subtitle: {
                    text: 'Source: Notional Test Data'
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


                                chart1.options.chart.isZoomed = true;
                                chart3.options.chart.isZoomed = true;
                                chart1.xAxis[0].setExtremes(xMin, xMax, true);

                                chart3.xAxis[0].setExtremes(xMin, xMax, true);
                                chart1.options.chart.isZoomed = false;
                                chart3.options.chart.isZoomed = false;

                            }
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Weight (kg)'
                    }
                },
                tooltip: {
                    formatter: function () {
                        return '' + this.x + ' km, ' + this.y + ' km';
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 100,
                    y: 70,
                    floating: true,
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'dummy_data',
                    color: 'rgba(223, 83, 83, .5)',
                    showInLegend: false,
                    data: [[145.0, 0.0], [200.0, 0.0]]
                },
                    {
                        name: 'Group 2',
                        color: 'rgba(119, 152, 191, .5)',
                        data: [[151.0, 65.6], [166.3, 71.8], [167.5, 80.7], [168.5, 72.6], [172.2, 78.8],
                            [174.5, 74.8], [175.0, 86.4], [181.5, 78.4], [182.0, 62.0], [184.0, 81.6],
                            [185.0, 76.6], [186.8, 83.6], [186.0, 90.0], [188.0, 74.6], [190.0, 71.0],
                            [192.0, 79.6], [193.7, 93.8], [196.5, 70.0], [199.0, 72.4]]
                    }]
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
                    text: 'Height Versus Weight'
                },
                subtitle: {
                    text: 'Source: Notional Test Data'
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

                                chart1.options.chart.isZoomed = true;
                                chart2.options.chart.isZoomed = true;
                                chart1.xAxis[0].setExtremes(xMin, xMax, true);

                                chart2.xAxis[0].setExtremes(xMin, xMax, true);
                                chart1.options.chart.isZoomed = false;
                                chart2.options.chart.isZoomed = false;

                            }
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Weight (kg)'
                    }
                },
                tooltip: {
                    formatter: function () {
                        return '' + this.x + ' km, ' + this.y + ' km';
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 100,
                    y: 70,
                    floating: true,
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'dummy_data',
                    //I put this in to try to get the charts to have the same range on the x axis
                    color: 'rgba(223, 83, 83, .5)',
                    showInLegend: false,
                    data: [[145.0, 0.0], [200.0, 0.0]]
                },
                    {
                        name: 'Group 3',
                        color: 'rgba(119, 152, 191, .5)',
                        data: [[153.0, 65.6], [156.3, 71.8], [167.5, 80.7], [169.5, 72.6], [171.2, 78.8],
                            [172.5, 74.8], [177.0, 86.4], [181.5, 78.4], [183.0, 62.0], [184.0, 81.6],
                            [185.0, 76.6], [186.2, 83.6], [187.0, 90.0], [188.7, 74.6], [190.0, 71.0],
                            [192.0, 79.6], [195.7, 93.8], [196.5, 70.0], [199.4, 72.4]]
                    }]
            }, function (chart) { //add this function to the chart definition to get synchronized crosshairs
                //this function needs to be added to each syncronized chart
                syncronizeCrossHairs(chart);

            });


        });

    });

});