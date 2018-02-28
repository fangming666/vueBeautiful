<?php
header("Access-Control-Allow-Origin:*");
// 响应类型
header('Access-Control-Allow-Methods:POST');
// 响应头设置
header('Access-Control-Allow-Headers:x-requested-with, content-type');

$newOneInfo = file_get_contents("https://way.jd.com/jisuapi/channel?&appkey=86d15a3db19f29dccae449f8426a8cb3");
echo $newOneInfo ;
