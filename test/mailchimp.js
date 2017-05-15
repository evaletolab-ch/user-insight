/**
 * unit tests for the main wallet module
 * psp error: http://docs.openstream.ch/payment-provider/wallet-error-messages/
 */

var assert = require('assert');
var should = require('should');
var moment = require('moment');

describe("mailchimp", function(){
  var API='b6470f12d40a41f8ad8ca7fcac2c766f-us9';
  var MailchimpInsight = require('../lib/mailchimp');
    this.timeout(20000);



  before(function(done){
    done()
  });



  it("mailchimp.create", function(done){
  	var mailchimp=new MailchimpInsight('test@insight.ch',API);
    mailchimp.init().then((m)=>{
      m.getConfig().api.should.equal(API);
      done()      
    });
  });


  it("mailchimp.list.read", function(done){
  	var mailchimp=new MailchimpInsight('test@insight.ch',API);
    mailchimp.init().then((m)=>{
      m.getLists().then(lists=>{
        lists.should.be.an.Array();
        // lists.forEach((list)=> {
        //   console.log('-------------- ',list)
        // });
        done()
      });
    });
  });

  it("mailchimp.segment.read (catch ERROR without id)", function(done){
  	var mailchimp=new MailchimpInsight('test@insight.ch',API);
    mailchimp.init().then((m)=>{
      mailchimp.getSegments().catch(err=>{done()});
    });
  });

  it("mailchimp.segment.read", function(done){
  	var mailchimp=new MailchimpInsight('test@insight.ch',API);
    mailchimp.init().then((m)=>{
      mailchimp.getSegments(m.getConfig().list).then(segments=>{
        segments.should.be.an.Array();
        // segments.forEach((segment)=> {
        //   console.log('-------------- ',segment.name,segment.member_count)
        // });
        done()
      });
    });
  });

  it("mailchimp.segment.members", function(done){
  	var mailchimp=new MailchimpInsight('test@insight.ch',API);
    mailchimp.init()
      .then((m)=>m.getSegments(m.getConfig().list))
      .then(segments=>mailchimp.getSegmentMembers(segments[3],10))
      .then(members=>{
        members.should.be.an.Array();
        members.forEach((member)=> {
          console.log('-------------- ',member.email_address + ' rating: '+member.member_rating +' avg:open: '+member.stats.avg_open_rate+' avg:click: '+member.stats.avg_click_rate)
        });
        done();
      }).catch(e=>console.log(e));
  });

  it("mailchimp.campaign.list", function(done){
    var previous = moment().subtract(1, 'months').startOf('month').toDate();
    var now = moment().subtract(1, 'months').endOf('month').toDate();

  	var mailchimp=new MailchimpInsight('test@insight.ch',API);
    mailchimp.init()
      .then(m=>mailchimp.getCampaigns(previous,now))
      .then(campaigns=>{
        campaigns.should.be.an.Array();
        campaigns.forEach((campaign)=> {
          console.log('-------------- ',campaign.id,campaign.settings.title,'stats (opens,clicks,click-rate):',campaign.report_summary.opens,campaign.report_summary.clicks,campaign.report_summary.click_rate)
        });
        done();
      }).catch(e=>console.log(e));
  });


  it("mailchimp.campaign.details", function(done){
    var previous = moment().subtract(1, 'months').startOf('month').toDate();
    var now = moment().subtract(1, 'months').endOf('month').toDate();
    

  	var mailchimp=new MailchimpInsight('test@insight.ch',API);
    mailchimp.init()
      .then(m=>mailchimp.getCampaigns(previous,now))
      .then(campaigns=>mailchimp.getCampaignsInsight(campaigns))
      .then(report=>{
        //
        // sort results
        var order_url_by_clicks=(a,b)=>{
          return report[b].clicks-report[a].clicks;
        }
        
        Object.keys(report).sort(order_url_by_clicks).forEach(url=>{
          console.log('-- ** clicks ',report[url].clicks,' avg: ',report[url].avg_clicks.toFixed(2),' url: ',url)
          // console.log('  campaigns      ',report[url].campaigns)
          // console.log(' ** clicks **    ',report[url].clicks,' avg: ',report[url].avg_clicks.toFixed(2))
        })
        // report.campaign_id.should.be.a.String();
        // report.urls_clicked.should.be.an.Array();
        // report.urls_clicked.forEach((url)=> {
        //   console.log('-------------- ',url.id,url.url,'stats (opens,clicks,click-rate):',url.report_summary.opens,campaign.report_summary.clicks,campaign.report_summary.click_rate)
        // });
        done();
      }).catch(e=>console.log(e));
  });


});
