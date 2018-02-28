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

//$card = getKey("city");
$card = "1393622322";
if (!empty($card)) {
    $cardInfo = file_get_contents("：tencent://QQMusic/?version==730&&cmd_count==1&&cmd_0==4002&&clienttype_0==0&&uin==".$card);
    var_dump(json_decode($cardInfo));
}