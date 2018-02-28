<?php
header("Access-Control-Allow-Origin:*");
// 响应类型
header('Access-Control-Allow-Methods:POST');
// 响应头设置
header('Access-Control-Allow-Headers:x-requested-with, content-type');

function getKey($key, $default = "")
{
    return trim(isset($_REQUEST[$key]) ? $_REQUEST[$key] : $default);
}

//$phone= getKey("phone");
$phone= 123456;
if (!empty($phone)) {
    $menuInfo = file_get_contents("https://way.jd.com/jisuapi/driverexamQuery?type=c1&subject=1&pagesize=20&pagenum=1&sort=normal&appkey=86d15a3db19f29dccae449f8426a8cb3");
    echo $menuInfo;
}