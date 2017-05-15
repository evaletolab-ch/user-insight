//
// https://www.npmjs.com/package/camo
// http://stackabuse.com/nedb-a-lightweight-javascript-database/
var Datastore = require('nedb');  
var db = new Datastore({ filename: 'db/fb.db', autoload: true });
var {Facebook, FacebookApiException} = require('fb');

//
// 
var defaultOptions={
  access_token:'EAACh7aUabgoBACYrXDdkD9u1dxk4n0WZCkg7ZAyFYv0zzXkSV2acG7xD9rpyhqlFdXYsoxzHHVeDHpBZArAvzkh0MZCoSzrDlVZABZAowPOjVP5XTRAWD6zVssSrsE7ZCOmK1OW5labDySodf1tz3pvOboUJ5ngFZAWeBphDW0FbDqsUmZBTWUrdYESHvvBj7JS8ZD',
  appId:'karibou.ch',
  version:'2.9',
  timeout:3000
}    

export class FBInsight{

  //
  // more details on 
  // - https://developers.facebook.com/docs/graph-api/reference/insights/#availmetrics
  // - https://developers.facebook.com/docs/marketing-api/insights/fields/v2.9
  // - https://developers.facebook.com/docs/marketing-api/insights/v2.9
  constructor(){
    this.fb= new Facebook(defaultOptions);
  }

  getAdsInsight(){
    // https://www.npmjs.com/package/fb
    // https://graph.facebook.com/<API_VERSION>/<AD_OBJECT_ID>/insights
    // https://developers.facebook.com/tools/explorer/178042049293834?method=GET&path=insight%3Ffields%3Did%2Cname%2Cad_campaign&version=v2.9
    this.fb.api('me', { fields: ['id', 'name'] }, function (res) {
      if(res.error){
        // throw Error(res.error)
      }

      console.log(res);
    });    
  }

}