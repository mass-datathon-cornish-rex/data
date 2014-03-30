# scripts

## createGeoJson.js
Quick and dirty Node.js script to convert postgresql json rows to FeatureCollection-type geojson format

### Files
- createGeoJson.js : Node.js script
- data_grid_250m_shape_10rows.json : Example postgresql query result in json format
- data_grid_250m_shape_10rows.geojson : Example output of createGeoJson.js

### Usage
- Export rows from postgresql as json, e.g. execute the following query and save as "data_grid_250m_shape_10rows.json":  
```sql
SELECT row_to_json(row) FROM 
(SELECT pass_geo, comm_geo, co2eqv_day, veh_lo, veh_hi, veh_vhi, mipdaycomm, mpg_eff, glpdaypass, st_asgeojson(st_astext(st_transform(geom,4326))) 
FROM grid_250m_shape JOIN grid_quarters_public  
ON grid_250m_shape.g250m_id = grid_quarters_public.g250m_id 
WHERE grid_quarters_public.co2eqv_day > 0 
ORDER BY grid_quarters_public.co2eqv_day DESC limit 10) 
AS row;
```

- Run script with the file name as input parameter, e.g.:
  ```node createGeoJson.js data_grid_250m_shape_10rows```

- The script will generate the data_grid_250m_shape_10rows.geojson file.
