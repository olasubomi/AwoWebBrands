/* Author: Olasubomi Awokoya*/

// converting python to javascript
//!/usr/bin/python
<script type="text/javascript" src="https://js.squareup.com/v2/paymentform"></script>
import httplib, urllib, json

// All requests to the Square Connect API require an access token in an
// Authorization header. Specify your application's personal access token here
// (available from https://connect.squareup.com/apps)
var access_token = 'q0atp-E3N5O82w9wLN3yn7HkRs4A';

// In addition to an Authorization header, requests to the Connect API should
// include the indicated Accept and Content-Type headers.
var request_headers = {'Authorization': 'Bearer ' + access_token,
               'Accept':        'application/json',
               'Content-Type':  'application/json'}

// Send a GET request to the ListLocations endpoint and obtain the response.
var connection = httplib.HTTPSConnection('connect.squareup.com');
var request_path = '/v2/locations';
var connection.request('GET', request_path, '', request_headers);
var response = connection.getresponse();

// Convert the returned JSON body into an array of locations you can work with.
var locations = json.loads(response.read());

// Pretty-print the locations array.
document.write(json.dumps(locations, indent=2, separators=(',',': ')));
