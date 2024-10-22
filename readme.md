## How to test this code challenge?

This solution has an exposed endpoint hosted in back4app platform which can be consumed with this curl:

The endpoint without params lists all smile centers stored in back4app class


Request:

```
curl --location --request POST 'https://parseapi.back4app.com/functions/listSmileCenters' \
--header 'X-Parse-Application-Id: api-key' \
--header 'X-Parse-REST-API-Key: api-key' \
--header 'Content-Type: application/json'
```

Example response:

```
{
    "result": {
        "smileCenters": [
            {
                "_id": "aEC6CreIlJ",
                "calendarId": "DrMoons2",
                "zone": "Lomas de Hidalgo",
                "promo": "¡Hasta $5,000 de descuento!",
                "street": "Calle del Héroe",
                "neighborhood": "Lomas de Hidalgo, Morelia, Michoacán.",
                "centerType": "Doctores Moons",
                "timetable": {
                    "sunday": [
                        "10:00-19:00"
                    ],
                    "saturday": [
                        "10:00-19:00"
                    ],
                    "weekdays": [
                        "10:00-19:00"
                    ]
                },
                "services": {}
            }
    }
}
```

This endpoint accepts three query params:

* center_type: Name of the **center type** to query "Doctores Moons" by example
* zone: Name of the **zone** type to query "Lomas de Hidalgo" by example
* service_type: Name of the **service** type to query "fullprimera" by example

```
curl --location --request POST 'https://parseapi.back4app.com/functions/listSmileCenters?center_type=Centro%20Moons&zone=Polanco&service_type=fullprimera' \
--header 'X-Parse-Application-Id: api-key' \
--header 'X-Parse-REST-API-Key: api-key' \
--header 'Content-Type: application/json'
```
