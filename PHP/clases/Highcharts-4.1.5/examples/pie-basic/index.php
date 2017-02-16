<?php 
require "informe.php"; 
$row = informe::TraerTodosLosInformes(); 
var_dump($row); 
$totalinforme = count($row); 
//var_dump($totalinforme);  
?>

<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Highcharts Example</title>

		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<style type="text/css">
${demo.css}
		</style>
		<script type="text/javascript">
$(function () {
    $('#container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Browser market shares at a specific website, 2014'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                // ['Firefox',   45.0],
                // ['IE',       26.8],
                // {
                //     name: 'Chrome',
                //     y: 12.8,
                //     sliced: true,
                //     selected: true
                // },
                // ['Safari',    8.5],
                // ['Opera',     6.2],
                // ['Others',   0.7]
                <?php
                    //$sql=mysql_query("select * from informe order by porcentaje desc");
                    while($res=mysql_fetch_array($sql)){ 
                        //var_dump($res);
                ?>

                    ['<?php echo $res['nombre'] ?>', <?php echo $res['porcentaje'] ?>],

                <?php
                }
                ?>
            ]
        }]
    });
});


		</script>
	</head>
	<body>
<script src="../../js/highcharts.js"></script>
<script src="../../js/modules/exporting.js"></script>

<div id="container" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>

	</body>
</html>
