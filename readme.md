// Start up commands //

npm i && bower i

gulp serve

PORT: 3000 / 3010

http://localhost:3000/api/jobs

using authO for authentication

# CURL Create task
curl -i -X POST -H 'Content-Type: application/json' -d '{"title": "Test Name","service_name": "Test service name","service_description": "Test service description", "service_category": "Labour","owner":"a0001","status":"open","request":{"active":"true","state":"inprogress","date_required":"01/01/17","date_fulfillment":"01/01/25"},"location":{"address":"1 Ruttan St. Toronto, ON", "lat": 43.6569832,"long": -79.44636469999999,"intersection":"Dundas / Bloor"},"cost": { "type":"Fixed","amount":"90","total_amount":"90"},"hours":{"exact_hours":"12","min_hours":"8","max_hours":"14"}, "applicants":{"status":"open","id":"0001"}}' http://localhost:3000/api/jobs

# List tasks
curl -XGET http://localhost:3000/api/jobs

curl -X "DELETE" http://localhost:3000/api/jobs/587a91f81dd688068f60c5ee


temp

<form method="post" enctype="multipart/form-data" action="/upload">
    <input type="file" name="file">
    <input type="submit" value="Submit">
</form>