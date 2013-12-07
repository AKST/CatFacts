import sys; sys.path.append('lib') 

from util.view_tools import get_view

import webapp2
import logging


class MainHandler(webapp2.RequestHandler):
    def get(self):
        page = get_view('views/index.html')
        self.response.write(page)
        

class SubscribeNumbers(webapp2.RequestHandler):
    def post(self):
        ph_no = self.request.params['ph']
        logging.info(ph_no)


app = webapp2.WSGIApplication([
    ('/subscribe', SubscribeNumbers), 
    ('/',          MainHandler)
], debug=True)
