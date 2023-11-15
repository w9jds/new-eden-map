import psycopg2
import json

connection = psycopg2.connect(
  user="w9jds",
  host="localhost",
  database="sde",
  password="password",
)

cursor = connection.cursor()

def generateSystemData():
  cursor.execute('''
    SELECT
      systems."solarSystemName",
      systems."solarSystemID",
      systems."luminosity",
      systems."radius",
      systems."security",
      systems."x"::numeric,
      systems."y"::numeric,
      systems."z"::numeric,
      constellations."constellationName",
      systems."constellationID",
      regions."regionName",
      systems."regionID",
      coalesce(
        systemClass."wormholeClassID",
        regionClass."wormholeClassID"
      ) as wormholeClassID,
      anomoly."typeID",
      "invTypes"."typeName",
      array_agg(jumps."toSolarSystemID") as neighbors
    FROM
      "mapSolarSystems" systems
      JOIN "mapRegions" regions ON regions."regionID" = systems."regionID"
      JOIN "mapConstellations" constellations ON constellations."constellationID" = systems."constellationID"
      LEFT JOIN "mapLocationWormholeClasses" regionClass ON regionClass."locationID" = systems."regionID"
      LEFT JOIN "mapLocationWormholeClasses" systemClass ON systemClass."locationID" = systems."solarSystemID"
      JOIN "mapDenormalize" ON "mapDenormalize"."itemID" = systems."solarSystemID"
      LEFT JOIN (SELECT * FROM "mapDenormalize" WHERE "mapDenormalize"."groupID" = 995) anomoly ON anomoly."solarSystemID" = systems."solarSystemID"
      LEFT JOIN "invTypes" ON "invTypes"."typeID" = anomoly."typeID"
      LEFT JOIN "mapSolarSystemJumps" jumps ON jumps."fromSolarSystemID" = systems."solarSystemID"
    GROUP BY
      systems."solarSystemName",
      systems."solarSystemID",
      constellations."constellationName",
      systems."constellationID",
      regions."regionName",
      systems."regionID",
      systems."security",
      wormholeClassID,
      anomoly."typeID",
      "invTypes"."typeName"
    ORDER BY
      systems."solarSystemName"
  ''')

  systems = cursor.fetchall()

  data = []

  for system in systems:
    data.append({
      "name": system[0],
      "solarSystemID": system[1],
      "luminosity": system[2],
      "radius": system[3],
      "security": system[4],
      "position": [
        '{:f}'.format(system[5]),
        '{:f}'.format(system[6]),
        '{:f}'.format(system[7]),
      ],
      "constellationName": system[8],
      "constellationID": system[9],
      "regionName": system[10],
      "regionID": system[11],
      "wormholeClassID": system[12],
      "typeID": system[13],
      "typeName": system[14],
      "neighbors": system[15] if system[15][0] != None else [],
    })

  with open("../src/constants/systems.json", "w") as outfile:
    json.dump(data, outfile)

generateSystemData()