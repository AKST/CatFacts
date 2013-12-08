import sys; sys.path.append('lib') 

from util.io_tools import contents
from twilio.rest import TwilioRestClient  
from google.appengine.api import taskqueue

import webapp2
import logging
import json
import twilio


conf_details = json.loads(contents('conf.json'))

sid = conf_details['sid']
token = conf_details['token']
client = TwilioRestClient(sid, token)



class SubscribeNumbers(webapp2.RequestHandler):
    def post(self):
        number = self.request.params['ph']
        taskqueue.add(url='/subscribe/notify', params={
            'ph': number
        })        



class NofifySubscriber(webapp2.RequestHandler):
    def post(self):
        try:
            subscriber = self.request.params['ph']
            client.sms.messages.create(
                body  = "Would you like to subscribe to cat facts? [Y/N]",
                to    = subscriber,
                from_ = conf_details['phone_no'])
            logging.info('%s was asked to subscribe' % subscriber)
        except twilio.TwilioRestException as e:
            self.response.status = 500
            logging.error(e)



app = webapp2.WSGIApplication([
    ('/subscribe/notify', NofifySubscriber), 
    ('/subscribe',        SubscribeNumbers), 
], debug=True)