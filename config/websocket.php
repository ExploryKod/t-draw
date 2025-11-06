<?php

return [
    /*
    |--------------------------------------------------------------------------
    | WebSocket Port
    |--------------------------------------------------------------------------
    |
    | The port on which the WebSocket server will listen.
    |
    */

    'port' => env('WS_PORT', 8001),

    /*
    |--------------------------------------------------------------------------
    | WebSocket URL
    |--------------------------------------------------------------------------
    |
    | The full URL where the WebSocket server is accessible.
    | In production with Nginx proxy, this should be the same as APP_URL.
    |
    */

    'url' => env('WEBSOCKET_URL', env('APP_URL', 'http://localhost')),

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins
    |--------------------------------------------------------------------------
    |
    | Comma-separated list of allowed origins for CORS.
    |
    */

    'allowed_origins' => env('ALLOWED_ORIGINS', env('APP_URL', 'http://localhost')),
];

