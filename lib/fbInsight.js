//
// https://www.npmjs.com/package/camo
// http://stackabuse.com/nedb-a-lightweight-javascript-database/
var Datastore = require('nedb');  
var db = new Datastore({ filename: 'db/fb.db', autoload: true });

export class FBInsight{

  //
  // more details on https://developers.facebook.com/docs/graph-api/reference/insights/#availmetrics

}