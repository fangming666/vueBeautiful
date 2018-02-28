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

$menuInfo = file_get_contents("http://is.snssdk.com/neihan/stream/mix/v1/?mpic=1&webp=1&essence=1&content_type=-101&message_cursor=-1&longitude=116.4121485&latitude=39.9365054&am_longitude=116.41828&am_latitude=39.937848&am_city=%E5%8C%97%E4%BA%AC%E5%B8%82&am_loc_time=1483686438786&count=30&min_time=1483929653&screen_width=1080&iid=7164180604&device_id=34822199408&ac=wifi&channel=baidu&aid=7&app_name=joke_essay&version_code=590&version_name=5.9.0&device_platform=android&ssmix=a&device_type=Nexus%2B5&device_brand=google&os_api=25&os_version=7.1&uuid=359250050588035&openudid=12645e537a2f0f25&manifest_version_code=590&resolution=1080*1776&dpi=480&update_version_code=5903");

$menuInfoS = json_decode($menuInfo);
forEach ($menuInfoS->data->data as $key => $value) {
    $value->online_time = date('Y-m-d H:i:s', $value->online_time);
}
$resultArr = [];
forEach ($menuInfoS->data->data as $key => $value) {
    if ($value->type == 1) {
        array_push($resultArr, $value);
    }
}
$menuInfoS->data->data = $resultArr;
echo json_encode($menuInfoS);