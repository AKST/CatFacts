from models.facts import Fact, MASTER_KEY
from util.io_tools import contents

import webapp2



class Init(webapp2.RequestHandler):
    def get(self):
        for line in contents('catfacts.txt').split('\n'):
            Fact(parent=MASTER_KEY, detail=line).put()



app = webapp2.WSGIApplication([
    ('/init', Init),
], debug=True)
