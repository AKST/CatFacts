import webapp2
import logging



class TheEnlightenment(webapp2.RequestHandler):
    def get(self):
        logging.info('test')



app = webapp2.WSGIApplication([
    ('/broadcast/enlightenment', TheEnlightenment),
], debug=True)
