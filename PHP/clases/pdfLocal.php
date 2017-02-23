<?php
require ("fpdf181/fpdf.php");
require ("Locales.php");
class Pdf extends FPDF
{
	//cabecera
	function Header()
	{
		//logo,
		$this->Image('../../imagenes/mistery.png',5,8,25);
		//Arial Bold 14
		$this->SetFont('Arial','B',14);
		//Espacio a la derecha 
		$this->Cell(80);
		//titulo
		$this->Cell(30,10,'Mistery Shopper',0,0,'C');
		// Salto de linea
		$this->Ln(20);
	}
	//pie de pagina
	function Footer()
	{
		$this->SetY(-15);
		$this->SetFont('Arial','I',12);
		$this->Cell(0,10,'Page'.$this->PageNo(),0,0,'C');
	}
}//fin clase pdf
$pdf= new Pdf();
//$pdf->AliasBbPages();
$pdf->AddPage();
$pdf->SetFillColor(100,100,100);
$pdf->SetFont('Times','B','12');
$pdf->SetX(5);
$pdf->Cell(200,6,'Locales',1,0,'C',1);
$pdf->Ln();

$pdf->SetFillColor(232,232,232);
$pdf->SetX(5);
$pdf->Cell(30,6,'Nombre',1,0,'C',1);
$pdf->SetX(35);
$pdf->Cell(35,6,'Dirección',1,0,'C',1);
$pdf->SetX(70);
$pdf->Cell(50,6,'Localidad',1,0,'C',1);
$pdf->SetX(120);
$pdf->Cell(35,6,'Gerente',1,0,'C',1);
//$pdf->SetX(160);
//$pdf->Cell(40,6,'fecha',1,0,'C',1);
$pdf->Ln();

$data=Locales::TraerTodosLosLocales();

try {
	foreach ($data as $row) 
	{
	$pdf->SetFillColor(250,250,250);
	$pdf->SetFont('Times','B','12');
	$pdf->SetX(5);
	$pdf->Cell(30,6,$row->nombre,1,0,'C',1);
	$pdf->SetX(35);
	$pdf->Cell(35,6,$row->direccion,1,0,'C',1);
	$pdf->SetX(70);
	$pdf->Cell(50,6,$row->localidad,1,0,'C',1);
	$pdf->SetX(120);
	$pdf->Cell(35,6,$row->gerente,1,0,'C',1);
	//$pdf->SetX(160);
	//$pdf->Cell(40,6,$row->fecha_insp,1,0,'C',1);
	$pdf->Ln();
	}	
} catch (Exception $e) {}	
$pdf->Output();






?>