import sys; sys.path.append('lib')

import webapp2
import logging
import json

from models.facts import Fact, MASTER_KEY
from models.subscriber import Subscriber, ALL
from twilio.rest import TwilioRestClient  
from util.io_tools import contents



conf_details = json.loads(contents('conf.json'))

sid = conf_details['sid']
token = conf_details['token']
the_messenger = TwilioRestClient(sid, token)

catfacts_no = conf_details['phone_no']


def chunkify(msg):
    """ splits msg up in chunks of 160 characters with numbers
    at the start of the chunk to ensure that the order can be 
    retained in the case of the messages not arriving at the 
    same time, which will most definitely happen. """
    return ["%s %s" % (i, msg[i*158 : (i+1)*158]) for i in range(len(msg)/158 + 1)]


class TheEnlightenment(webapp2.RequestHandler):
    def get(self):
        q = Subscriber.query_subs(ALL)
        the_chosen_few = q.fetch(q.count()) 
        the_good_news  = Fact.random(MASTER_KEY).detail

        for choosen_one in the_chosen_few:
            for chapter in chunkify(the_good_news):
                the_messenger.sms.messages.create(
                    body  = chapter,
                    to    = choosen_one.phone_no,
                    from_ = catfacts_no)
            


app = webapp2.WSGIApplication([
    ('/broadcast/enlightenment', TheEnlightenment),
], debug=True)
