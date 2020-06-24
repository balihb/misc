#!/bin/sh

HDDTEMPRAW_FILE=/dev/null

if [ -n "$1" ]
then
    HDDTEMPRAW_FILE="$1"
fi

COUNTER=0
while [  $COUNTER -lt 5 ]
do

    HDDTEMPRAW=$(
        echo |
            nc localhost 7634 |
            tr -d "\n"
              )

    echo "$HDDTEMPRAW" > "$HDDTEMPRAW_FILE"

    HDDTEMPRES=$(
        echo "$HDDTEMPRAW" |
            sed 's/[[:space:]]//g' |
            sed 's/[^[:print:]]//g' |
            sed 's/|//m' |
            sed 's/||/ \n/g' |
            awk -F'|' '{print $4}'
              )

    if [ -n "$HDDTEMPRES" ]
    then
        echo "$HDDTEMPRES"
        exit 0
    fi

    sleep 1
    COUNTER=$(( COUNTER+1 ))

done
