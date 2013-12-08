import sys; sys.path.append('lib')

from util.io_tools import contents
from google.appengine.api import taskqueue
from twilio.rest import TwilioRestClient 
from twilio import twiml

import webapp2
import logging
import json
import twilio


conf_details = json.loads(contents('conf.json'))
sid = conf_details['sid']
token = conf_details['token']
client = TwilioRestClient(sid, token)



class CheckIncoming(webapp2.RequestHandler):
    def post(self):
        taskqueue.add(url='/mailbox/route', params=self.request.params)
        taskqueue.add(url='/mailbox/log', params=self.request.params)
        res = twiml.Response()        
        res.say("")
        self.response.headers['Content-Type'] = 'text/xml'
        self.response.write(str(res))



class RouteIncoming(webapp2.RequestHandler):
    def post(self):
        sender = self.request.get('From')
        msg_id = self.request.get('MessageSid')
        msg    = client.messages.get(msg_id).body

        if msg.lower() == 'y' or msg.lower() == 'n':
            destination = 'confirm'
        else:
            destination = 'help'

        taskqueue.add(url="/mailbox/"+destination, params=locals())



class LogIncoming(webapp2.RequestHandler):
    def post(self):       
        number = self.request.get('From')
        loc    = self.request.get('FromCountry')  
        logging.info('\nnumber:   %s\nlocation: %s' % (number, loc))
  


class ConfirmSubscription(webapp2.RequestHandler):
    def post(self):
        sender = self.request.get('sender')
        response = "Mee-wow" if self.request.get('msg').lower() == 'y' else ':('
        client.sms.messages.create(
            body  = response,
            to    = self.request.get('sender'),
            from_ = conf_details['phone_no'])



class HelpMessage(webapp2.RequestHandler):
    def post(self):
        sender = self.request.get('sender')
        client.sms.messages.create(
            body  = "Sorry, me no comprehende",
            to    = sender,
            from_ = conf_details['phone_no'])



app = webapp2.WSGIApplication([
    ('/mailbox/help',    HelpMessage),
    ('/mailbox/confirm', ConfirmSubscription),
    ('/mailbox/log',     LogIncoming),
    ('/mailbox/route',   RouteIncoming), 
    ('/mailbox',         CheckIncoming),
], debug=True)





