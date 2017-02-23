<?php 
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
            type: 'column'
        },
        title: {
            text: 'Gráfico de barras'
        },
        subtitle: {
            text: 'Locales con mejor puntaje'
        },
        xAxis: {
            categories: [ <?php echo ($dataNames); ?>
                // 'Jan',
                // 'Feb',
                // 'Mar',
                // 'Apr',
                // 'May',
                // 'Jun',
                // 'Jul',
                // 'Aug',
                // 'Sep',
                // 'Oct',
                // 'Nov',
                // 'Dec'
                
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Porcentaje (%)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Nombre',
            data: [ <?php echo($data); ?> ]

        // }, {
        //     name: 'New York',
        //     data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        // }, {
        //     name: 'London',
        //     data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        // }, {
        //     name: 'Berlin',
        //     data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

        }]
    });
});
		</script>
	</head>
	<body>
<script src="../../js/highcharts.js"></script>
<script src="../../js/modules/exporting.js"></script>

<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>

<br/><center><a href="../line-basic/index.php">Gráfico lineal</center>
<br/><center><a href="../bar-basic/index.php">Gráfico de barras</center>

	</body>
</html>
