import sys; sys.path.append('lib') 

from util.view_tools import get_view

import webapp2


class MainHandler(webapp2.RequestHandler):
    def get(self):
        page = get_view('views/index.html')
        self.response.write(page)


app = webapp2.WSGIApplication([
    ('/',          MainHandler),
], debug=True)
