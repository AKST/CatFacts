import sys; sys.path.append('lib')

from util.io_tools import contents
from google.appengine.api import taskqueue
from twilio.rest import TwilioRestClient 
from twilio import twiml

import webapp2
import logging
import json
import twilio


LOG_TEMP = """
number:   %s
location: %s
message:  %s"""

conf_details = json.loads(contents('conf.json'))
sid = conf_details['sid']
token = conf_details['token']
client = TwilioRestClient(sid, token)



class CheckIncoming(webapp2.RequestHandler):
    def post(self):
        taskqueue.add(url='/mailbox/handle', params=self.request.params)
        res = twiml.Response()        
        res.say("")
        self.response.headers['Content-Type'] = 'text/xml'
        self.response.write(str(res))



class HandleIncoming(webapp2.RequestHandler):
    def post(self):
        number = self.request.get('From')
        loc = self.request.get('FromCountry')  
        msg_id = self.request.get('MessageSid')
        msg = client.messages.get(msg_id).body

        logging.info(LOG_TEMP % (number, loc, msg))

        client.sms.messages.create(
            body  = "Meow",
            to    = number,
            from_ = conf_details['phone_no'])



app = webapp2.WSGIApplication([
    ('/mailbox/handle', HandleIncoming), 
    ('/mailbox',        CheckIncoming),
], debug=True)





