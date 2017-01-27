// Start up commands //

npm i && bower i

gulp serve

PORT: 3000 / 3010

http://localhost:3000/api/jobs

using authO for authentication

# CURL Create task
curl -i -X POST -H 'Content-Type: application/json' -d '{"service_category":"labour","title":"Sample Title 3","service_name":"Labour removal","service_description":"Help lift couch out of the house","owner":"facebook|10157959402630212","__v":0,"created_at":"2017-01-22T22:00:19.697Z","applicants":[],"image":[{"image_name":"franklinGood.png","image_path":"http://localhost:3010/upload","_id":"58852b73841371cdbd010ecb"}],"cost":{"arrange":"fixed","hours":2,"total_amount":60},"location":{"address":"1400 Bloor Street West, Toronto, ON, Canada","lat":43.6575908,"long":-79.44712149999998},"request":{"time_range":"morning","date_required":"2017-01-23T05:00:00.000Z","expire_post":true,"date_fulfillment_by":"2017-01-27T05:00:00.000Z"}}' http://localhost:3000/api/jobs

# List tasks
curl -XGET http://localhost:3000/api/jobs

curl -X "DELETE" http://localhost:3000/api/jobs/588502ed9eb000c879843a7f


temp

<form method="post" enctype="multipart/form-data" action="/upload">
    <input type="file" name="file">
    <input type="submit" value="Submit">
</form>