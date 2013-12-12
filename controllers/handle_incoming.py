import sys; sys.path.append('lib')

from util.io_tools import contents
from google.appengine.api import taskqueue
from twilio.rest import TwilioRestClient 
from twilio import twiml

import webapp2
import logging
import json
import twilio

from models.subscriber import ALL, Subscriber



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
        msg    = client.messages.get(msg_id).body.lower()

        if msg == 'y' or msg == 'n':
            destination = 'confirm'
        elif msg == 'q':
            destination = 'unsubscribe'
        else:
            destination = 'help'

        taskqueue.add(url="/mailbox/"+destination, params=locals())



class LogIncoming(webapp2.RequestHandler):
    def post(self):       
        number = self.request.get('From')
        loc    = self.request.get('FromCountry')  
        logging.info('\nnumber:   %s\nlocation: %s' % (number, loc))



CONFIRM_SUB = "Purrfect! To unsubscribe at any time text Q."
FALSE_FLAG= 'Opps sorry.'

class ConfirmSubscription(webapp2.RequestHandler):
    def post(self):
        sender   = self.request.get('sender')
        response = CONFIRM_SUB if self.request.get('msg') == 'y' else FALSE_FLAG

        if self.request.get('msg') == 'y':
            Subscriber(parent=ALL, phone_no=sender).put()
          
        client.sms.messages.create(
            body  = response,
            to    = sender,
            from_ = conf_details['phone_no'])



UNSUB_MSG = 'So long.'

class Unsubscribe(webapp2.RequestHandler):
    def post(self):
        sender = self.request.get('sender')
        query = Subscriber.query_subs(ALL)\
            .filter(Subscriber.phone_no == sender)\
            .fetch(1)

        if query:
            query[0].key.delete()

        client.sms.messages.create(
            body  = UNSUB_MSG,
            to    = sender,
            from_ = conf_details['phone_no']) 



HELP_MSG = "Sorry, me no comprehende. " +\
           "To subscribe text Y, to " +\
           "unsubscribe text Q."

class HelpMessage(webapp2.RequestHandler):
    def post(self):
        sender = self.request.get('sender')
        client.sms.messages.create(
            body  = HELP_MSG,
            to    = sender,
            from_ = conf_details['phone_no'])



app = webapp2.WSGIApplication([
    ('/mailbox/help',        HelpMessage),
    ('/mailbox/unsubscribe', Unsubscribe),
    ('/mailbox/confirm',     ConfirmSubscription),
    ('/mailbox/log',         LogIncoming),
    ('/mailbox/route',       RouteIncoming), 
    ('/mailbox',             CheckIncoming),
], debug=True)



