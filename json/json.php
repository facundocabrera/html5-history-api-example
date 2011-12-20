<?php

$obj = new stdclass();

$obj->content = 'Just Bob.';
$obj->photo = 'http://placekitten.com/320/270';

echo json_encode($obj);
