<?php
/**
 * Created by PhpStorm.
 * User: DELL
 * Date: 2018/1/11
 * Time: 13:38
 */
header('Content-Type:video/mp4');
@readfile($_GET['link']);