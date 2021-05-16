# Take home task for AS24

## How to Run Locally
* go the the server directory of this project `as24/server`
* run this command `yarn start`
* visit `http://localhost:3000` in a browser
* upload csv files to see data
  * must put correct csv files in correct input
* there are public api routes to retrieve these two aggregations here:
  * GET: `http://localhost:3000/statistics/average-price-per-seller-type`
  * GET: `http://localhost:3000/statistics/distribution-by-make`
* there is an api route to upload new csv files here:
  * POST: `http://localhost:3000/files/upload-csv`
* I added tests to the backend
  * run them with this command `yarn test`
### Notes
* I was able to implement the first 2 aggregations in the time alloted
* Also as the testing description noted, I did not apply many frontend styles at all
