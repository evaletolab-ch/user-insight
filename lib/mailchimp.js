"use strict";
//
// https://googlechrome.github.io/samples/classes-es6/

//
// init project
var Mailchimp = require('mailchimp-api-v3');

//
// more details on https://github.com/louischatriot/nedb
var Datastore = require('nedb');  
var db = new Datastore({ filename: 'db/mailshimp.db', autoload: true });

//
// default data 
var  defaultConfig={
  settings:true,
  list:'50fe26a799',
  seglow:'1468937',
  segmed:'1475125',
  segtop:'1475313',
  month:0,
  year:0,
  report:{}
};


class MailchimpInsight{

  //
  // construct an mailchimp account
  constructor(owner,api){
    //
    // persistant data 
    this.config={};
    this.mailchimp={};

    Object.assign(this.config,defaultConfig);
    this.config.owner=owner;
    this.config.api=api;
  }

  init(){
    return new Promise((resolve,reject)=>{  
      let init={
        owner:this.config.owner,
        settings:true
      }
      if(this.config.api){
        init.api=this.config.api;
      }
      // db.find({},(err,docs)=>{
      //   docs.forEach(doc => console.log('DEBUG------',doc));
      // })
      //
      // create or inc session count
      db.update(init,{$inc:{session:1}}, {upsert: true,returnUpdatedDocs:true,multi:false},
      (err,count,doc)=>{
        if(err){return reject(err);}
        Object.assign(this.config,doc);
        this.mailchimp = new Mailchimp(this.config.api);
        resolve(this);
      });
    });
    
  }

  getConfig(){
    return this.config;
  }

  //
  // save config after getting list id and segments id
  saveConfig(list,seglow,segmed,segtop){
    return new Promise((resolve,reject)=>{  
      if(!list||!seglow||!segmed||!segtop){
        return reject(new Error("missing parameter(s)"))
      }
      db.update(
        { owner: this.config.owner, api:this.config.api,settings:true },{ 
          list: this.config.list,
          seglow: this.config.seglow,
          segmed: this.config.segmed,
          segtop: this.config.segtop
        }, {upsert: false,returnUpdatedDocs:true,multi:false},(err,count,doc)=>{
            if(err)return reject(err);
            Object.assign(this.config,doc);
            resolve(doc);
        });
    });
  }

  //
  // create or update report id is a concatenation of :
  //  - owner+api+month+year
  createOrUpdateReport(report,month,year){
    return new Promise((resolve,reject)=>{  
      if(!month||!year||!report){
        return reject(new Error("missing parameter(s)"))
      }
      db.update(
        { owner: this.config.owner, api:this.config.api,settings:false, month:month,year:year},
        { $set:{report:report}}, 
        { upsert: true,returnUpdatedDocs:true,multi:false},(err,count,doc)=>{
            if(err)return reject(err);
            Object.assign(this.config,doc);
            resolve(doc);
        });      
    });
  }

  //
  // report id is a concatenation of :
  //  - owner+api+month+year
  deleteReport(report,month,year){
    return new Promise((resolve,reject)=>{  
      if(!month||!year||!report){
        return reject(new Error("missing parameter(s)"))
      }
      db.remove(
        { owner: this.config.owner, api:this.config.api,settings:false, month:month,year:year}, 
        { multi: false }, (err, numRemoved) =>{
            if(err)return reject(err);
            resolve(numRemoved);
        });
    });
  }



  getLists(){
    return new Promise((resolve,reject)=>{  
      this.mailchimp.get({
        path : '/lists',
        query:{fields:'lists.id,lists.web_id,lists.name,lists.list_rating'}
      })
      .then(result=>{
        resolve(result.lists);
      })
      .catch(reject);
    });
  }

  getSegments(list){
    return new Promise((resolve,reject)=>{  
      if(!list){
        throw new Error("missing list id");
      }
      this.mailchimp.get({
        path : '/lists/'+list+'/segments',
        query:{fields:'segments.id,segments.member_count,segments.name,segments.type,segments.list_id'}
      })
      .then(function (result) {
        resolve(result.segments);
      })
      .catch(reject);
    });
  }


  getSegmentMembers(segment,limit){
    return new Promise((resolve,reject)=>{
      if(!segment||!segment.id){
        throw new Error("missing segment id");
      }
      let orderMembersByStats=(a,b)=>{
        var a1=a.stats.avg_open_rate+a.stats.avg_click_rate;
        var b1=b.stats.avg_open_rate+b.stats.avg_click_rate;
        return b1-a1;
      };
      this.mailchimp.get({
        method:'get',
        path : '/lists/'+segment.list_id+'/segments/'+segment.id+'/members',
        query:{count:(limit||1000000),offset:0,fields:'members.email_address,members.member_rating,stats,members.stats.avg_open_rate,members.stats.avg_click_rate'}
      })
      .then(function (result) {
        resolve(result.members.sort(orderMembersByStats).slice(0,(limit||50)));
      })
      .catch(reject);
    });
  }

  /**
   * 
   * @param {*} from get campaigns since Date('2017-04-1T00:00:00+00:00')
   */
  getCampaigns(from,to){
    to=to||new Date();
    return new Promise((resolve,reject)=>{    
      this.mailchimp.get({
        method:'get',
        path:'/campaigns',
        query:{sort_field:'create_time',sort_dir:'DEST',count:20, status:'sent',
          since_send_time:from,before_send_time:to,
          fields:'campaigns.id,campaigns.web_id,campaigns.emails_sent,campaigns.report_summary,campaigns.settings'}    
      })
      .then(function (result) {
        resolve(result.campaigns);
      }).catch(reject);                
    });
  }

  // var campaigns_lst=['bfe0b24ef1','8df0f36c3f','28abeb71cc','d0f52fde18','6257896ca0','dbc7d88873']
  getCampaignsInsight(campaigns){
    return new Promise((resolve,reject)=>{
      let clicks_details=[];
      try{
      (campaigns||[]).forEach((campaign)=>{
        if(!campaign.id){
          throw new Error("missing campaign id");
        }
        clicks_details.push(this.mailchimp.get({
          method:'get',
          path:'/reports/'+campaign.id+'/click-details',
          query:{fields:'urls_clicked,campaign_id'}
        }));
      });
      }catch(e){
        return reject(e);        
      }

      Promise.all(clicks_details).then(result =>{
        var urls={};
        result.forEach(report=>{
          report.urls_clicked.forEach(link=>{
            // remove umt info
            let url=link.url.split(/\??utm_source/)[0];
            if(!urls[url]){
              urls[url]={
                campaigns:[],
                ids:[],
                clicks:0,
                avg_clicks:link.click_percentage
              }
            }
            // urls[url].url=link.url;
            urls[url].clicks=link.total_clicks;
            urls[url].avg_clicks=(urls[url].avg_clicks+link.click_percentage)*.5;
            urls[url].campaigns.push(link.campaign_id);
            urls[url].ids.push(link.id);
          })
        });
        resolve(urls)
      }).catch(reject);

    });
  }




}

module.exports = MailchimpInsight;
