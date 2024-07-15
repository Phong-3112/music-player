FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db reach-engine --collection musicPlayerCollection --type json --file /init.json --jsonArray
