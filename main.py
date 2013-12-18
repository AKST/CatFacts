import sys; sys.path.append('lib') 

from util.view_tools import get_view

import webapp2


class MainHandler(webapp2.RequestHandler):
    def get(self):
        page = get_view('views/index.html')
        self.response.write(page)


class RequireMainHandler(webapp2.RequestHandler):
    def get(self):
        page = get_view('views/require_index.html')
        self.response.write(page)


app = webapp2.WSGIApplication([
    ('/test',      RequireMainHandler),
    ('/',          MainHandler),
], debug=True)
