<?php

function validateX($xValue) {
    return isset($xValue) && is_numeric($xValue) && $xValue >= -3 && $xValue <= 5;
}

function validateY($yValue) {
    $Y_MIN = -5;
    $Y_MAX = 3;
    return isset($yValue) && is_numeric($yValue) && ( $yValue > $Y_MIN ) && $yValue < $Y_MAX;
}

function validateR($rValue) {
    return isset($rValue) && is_numeric($rValue) && $rValue >= 1 && $rValue <= 3;
}

function validateForm($xValue, $yValue, $rValue) {
    return validateR($rValue) && validateX($xValue) && validateY($yValue);
}

function checkFirstQ($xValue, $yValue, $rValue) {
    return $xValue >= 0 && $xValue <= ($rValue-$yValue)/2 && $yValue <= $rValue;
}

function checkThirdQ($xValue, $yValue, $rValue) {
    return $xValue <= 0 && abs($xValue) <= $rValue && abs($yValue) <= $rValue && $yValue <=0;
}

function checkFourthQ($xValue, $yValue, $rValue) {
    return $yValue <= 0 && $xValue >= 0 && $xValue <= $rValue && sqrt($xValue*$xValue + $yValue*$yValue) <= $rValue;
}

function checkHit($xValue, $yValue, $rValue) {
    return checkFirstQ($xValue, $yValue, $rValue) || checkThirdQ($xValue, $yValue, $rValue) || checkFourthQ($xValue, $yValue, $rValue);
}

session_start();
$start = microtime(true);
date_default_timezone_set('Europe/Moscow');
$currentTime = date('m/d/Y h:i:s a', time());

$xValue = floatval(htmlspecialchars($_GET['xvalue']));
$yValue = floatval(htmlspecialchars($_GET['yvalue']));
$rValue = floatval(htmlspecialchars($_GET['rvalue']));

$validation = validateForm($xValue, $yValue, $rValue);
$hit = checkHit($xValue, $yValue, $rValue);
$responseHit = $hit ? 'true' : 'false';
$responseValidation = $validation ? 'true' : 'false';

$executionTime = number_format((float)microtime(true) - $start, 8, '.', '');

$data = "{" .
    "\"valid\":\"$responseValidation\"," .
    "\"xvalue\":\"$xValue\"," .
    "\"yvalue\":\"$yValue\"," .
    "\"rvalue\":\"$rValue\"," .
    "\"currenttime\":\"$currentTime\"," .
    "\"executiontime\":\"$executionTime\"," .
    "\"hit\":\"$responseHit\"" .
    "}";

$result = array($xValue, $yValue, $rValue, $currentTime, $executionTime, $responseHit);
if (!isset($_SESSION['results'])) {
    $_SESSION['results'] = array();
}
array_push($_SESSION['results'], $result);
//$jsonData = "{" . "\"Work\":\"worked\"" . "}";
//$data = $xValue;

echo $data;