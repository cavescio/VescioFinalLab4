
<?php
//require ("fpdf181/fpdf.php");
require ("usuario.php");
//header("Content-type: application/vnd.ms-excel");
//header("Content-Disposition: attachment; filename=export_excel.xls");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Excel de Usuarios</title>
</head>
<body>
<table id="tabla1" width="100%" border="1" cellspacing="0" cellpadding="0">
	<tr><td colspan="6" bgcolor="skyblue" align="center"> USUARIOS</td>
	</tr>
	<tr bgcolor="lime">
	<td><strong>Correo</strong></td>
	<td><strong>Nombre</strong></td>
	<td><strong>Tipo<strong></td>	
	<tr>
<?php

$data=usuario::TraerTodosLosUsuarios();

try {
	foreach ($data as $row) 
	{
		$correo=$row->correo;
		$nombre=$row->nombre;
		$tipo=$row->tipo;
		
?>
		<td><?php echo $correo; ?></td>
		<td><?php echo $nombre; ?></td>
		<td><?php echo $tipo; ?></td>		
	</tr>
<?php } } catch (Exception $e) {} ?>
</table>
<form id="form1" name="form1" method="post"action="exportaror_excel.php" >
		<input type="submit" value="Exportar a Excel"/>
	</form>
</body>
</html>



