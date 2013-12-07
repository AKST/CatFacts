import sys; sys.path.append('lib') 

from util.view_tools import get_view
from util.io_tools import contents
from twilio.rest import TwilioRestClient  

import webapp2
import logging
import json
import twilio

conf_details = json.loads(contents('conf.json'))

sid = conf_details['sid']
token = conf_details['token']
client = TwilioRestClient(sid, token)

class MainHandler(webapp2.RequestHandler):
    def get(self):
        page = get_view('views/index.html')
        self.response.write(page)
        

class SubscribeNumbers(webapp2.RequestHandler):
    def post(self):
        # subscriber= self.request.params['ph']
        subscriber = conf_details['test_no']
        try:
            msg = client.sms.messages.create(
                body="Would you like to subscribe to cat facts? [y/n]",
                to=subscriber,
                from_=conf_details['phone_no'])
            logging.info('%s was asked to subscribe' % subscriber)
        except twilio.TwilioRestException as e:
            self.response.status = 500
            logging.error(e)
        


app = webapp2.WSGIApplication([
    ('/subscribe', SubscribeNumbers), 
    ('/',          MainHandler)
], debug=True)
