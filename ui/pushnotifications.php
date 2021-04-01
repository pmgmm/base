<?php

require_once '../core/config/autoload.php';
require_once '../core/config/base.php';
require_once '../framework/3rdparty/push_notifications/vendor/autoload.php';

use \Minishlink\WebPush\WebPush;
use \Minishlink\WebPush\Subscription;

// https://vapidkeys.com/


$auth = [
    'VAPID' => [
        'subject' => 'mailto:pmgmm@hotmail.com', // can be a mailto: or your website address
        'publicKey' => 'BG1mJkqeMML088rWcvpDkjl_GFEYdy0PCsfSZzDUPHbPaxiGGB_YYWbUq2Skp5kl8e3gSCy4uwgxbQQQM5Y1V4c', // (recommended) uncompressed public key P-256 encoded in Base64-URL
        'privateKey' => 'VFFKVqa90LxOv0vXcvP2g4gGoJIG1KM-jrefwNMarIQ' // (recommended) in fact the secret multiplier of the private key encoded in Base64-URL
        //'pemFile' => 'path/to/pem', // if you have a PEM file and can link to it on your filesystem
        //'pem' => 'pemFileContent', // if you have a PEM file and want to hardcode its content
    ],
];

    $subscription = Subscription::create([
        'endpoint' => "https://fcm.googleapis.com/fcm/send/cMO7jj1Ko5g:APA91bEVF8RbvTJi6PfpDMc3r9kuXC48g5oG3J50ScvaYnM0nEEmoa0C7C55rZZqaYl8hCNn_3rWA4GjAGAtNtrcJliiERZrVUkSt2bapzkoqo-nh_GgC1AYTqeTMbKwufnl5PQ4yjF4",
        'keys' => ["p256dh" => "BEo2VSh49ODc0bC8XYLT8PeRXqVRm2RAKWXUhRjVBBUesNQcIitOVGzEBvn8K_c_xKfngHdW7o8CAOk8JrAuGMs",
        "auth" => "3LIdGXUrl2ie5DOcEvyHfQ"]]);    
   
$defaultOptions = [
    'TTL' => 300, // defaults to 4 weeks
    'urgency' => 'normal', // protocol defaults to "normal"
    'topic' => 'new_event', // not defined by default,
    'batchSize' => 200, // defaults to 1000
];

// for every notifications
$webPush = new WebPush();

$payload = '{"body":"BODY", "title":"TITLE"}';

// or for one notification
$webPush->sendOneNotification($subscription, $payload, $defaultOptions, $auth);

//($subscription, $payload, ['TTL' => 5000]);