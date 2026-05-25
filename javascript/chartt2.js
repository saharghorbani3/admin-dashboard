am5.ready(function () {

    var root = am5.Root.new("chartdiv2");

    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push(
        am5percent.PieChart.new(root, {
            layout: root.verticalLayout,
            innerRadius: am5.percent(60)
        })
    );

    var series = chart.series.push(
        am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            alignLabels: false
        })
    );

    series.labels.template.setAll({
        text: "{value}%",
        textType: "circular",
        radius: -15,
        fill: am5.color(0xffffff),
        fontWeight: "700",
        fontSize: 12
    });

    series.ticks.template.setAll({ forceHidden: true });

    series.slices.template.setAll({
        strokeWidth: 2,
        stroke: am5.color(0xffffff),
        cornerRadius: 4
    });

    // Set colors to match the design: blue (success) + light blue (failed)
    series.get("colors").set("colors", [
        am5.color(0x4f7df0),
        am5.color(0x9bb8f5)
    ]);

    series.data.setAll([
        { category: window.__t ? window.__t("donutSuccess") : "Successful Payments", value: 75.2 },
        { category: window.__t ? window.__t("donutFailed") : "Failed Payments", value: 24.8 }
    ]);

    // Legend below the chart
    var legend = chart.children.push(
        am5.Legend.new(root, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            marginTop: 12,
            marginBottom: 4,
            layout: root.verticalLayout
        })
    );

    legend.markers.template.setAll({
        width: 12,
        height: 12
    });

    legend.labels.template.setAll({
        fontSize: 13,
        fontWeight: "600"
    });

    legend.valueLabels.template.setAll({
        fontSize: 13,
        forceHidden: false
    });

    legend.data.setAll(series.dataItems);

    // Expose so language toggle can update labels without rebuild
    window.__donutChart = { root: root, series: series, legend: legend };

    series.appear(800, 100);
});
