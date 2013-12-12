from google.appengine.ext import ndb

ALL = ndb.Key('Country', "all")

class Subscriber(ndb.Model):
    phone_no = ndb.StringProperty()

    @classmethod 
    def query_subs(cls, key):
        return cls.query(ancestor=key).order(-cls.phone_no)


    
