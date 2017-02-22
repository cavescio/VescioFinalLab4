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
        title: {
            text: 'Gráfico lineal',
            x: -20 //center
        },
        subtitle: {
            text: 'Locales con mejor puntaje',
            x: -20
        },
        xAxis: {
            categories: [ <?php echo ($dataNames); ?> ]
        },
        yAxis: {
            title: {
                text: 'Porcentaje (%)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
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

<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>

<br/><center><a href="../column-basic/index.php">Gráfico de barras</center>


	</body>
</html>
