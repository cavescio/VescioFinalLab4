<?php 
//require "informe.php"; 
require "../../../informe.php";
$row = informe::TraerTodosLosInformes(); 
//var_dump($row); 
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

    <?php          
     $data='';         
     for ($i= 0; $i<$totalinforme; $i++)  {             
        $data.=$row[$i]->porcentaje . ",";             
        echo ($data);         
    }      
    ?>      

     <?php         
    $dataNames= '';         
    for ($i= 0; $i<$totalinforme; $i++)  {             
        $dataNames.="'" .$row[$i]->nombre . "',";         
    }      ?>



    $('#container').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Gráfico de barras'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [ <?php echo ($dataNames); ?> ],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Porcentaje (%)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Porcentaje',
            data: [ <?php echo($data); ?> ]
        }]
    });
});
		</script>
	</head>
	<body>
<script src="../../js/highcharts.js"></script>
<script src="../../js/modules/exporting.js"></script>

<div id="container" style="min-width: 310px; max-width: 800px; height: 400px; margin: 0 auto"></div>

<br/><center><a href="../line-basic/index.php">Gráfico lineal</center>
<br/><center><a href="../column-basic/index.php">Gráfico de columnas</center>

	</body>
</html>
