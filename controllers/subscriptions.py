import sys; sys.path.append('lib') 

from util.io_tools import contents
from twilio.rest import TwilioRestClient  
from google.appengine.api import taskqueue
from google.appengine.api import background_thread as thread

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
        taskqueue.add(url='/subscribe/notify', params={
            'ph': conf_details['test_no']
        })        


class NofifySubscriber(webapp2.RequestHandler):
    def post(self):
        try:
            client.sms.messages.create(
                body  = "Would you like to subscribe to cat facts? [y/n]",
                to    = self.request.params['ph'],
                from_ = conf_details['phone_no'])
            logging.info('%s was asked to subscribe' % subscriber)
        except twilio.TwilioRestException as e:
            self.response.status = 500
            logging.error(e)


class RespondToMessage(webapp2.RequestHandler):
    def post(self):
        pass


app = webapp2.WSGIApplication([
    ('/subscribe/notify', NofifySubscriber), 
    ('/subscribe',        SubscribeNumbers), 
], debug=True)
