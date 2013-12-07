from google.appengine.ext import ndb



class Fact(ndb.Model):
    detail = ndb.StringProperty()
