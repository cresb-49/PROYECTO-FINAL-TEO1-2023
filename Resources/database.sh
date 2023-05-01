#!/bin/bash

# Configuración de la conexión a MongoDB
HOST="localhost"
PORT="27017"
DATABASE="gamificacion"

#Drop de las colecciones de la base de datos
#mongos --host $HOST --port $PORT --eval "db.juegos.drop();"
#Importacion de la base de datos
mongoimport --host $HOST --port $PORT --db $DATABASE --collection juegos --file ./juegos.json --jsonArray

echo "Base de datos y colecciones eliminadas y recreadas exitosamente."

