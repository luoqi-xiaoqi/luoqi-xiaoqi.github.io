#!/bin/bash
while true; do
    if ! pgrep -f "cloudflared tunnel" > /dev/null; then
        cloudflared tunnel --url http://127.0.0.1:8080 > /tmp/cf-tunnel.log 2>&1 &
        sleep 5
    fi
    sleep 30
done
