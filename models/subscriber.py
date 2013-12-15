from google.appengine.ext import ndb
from random import randint

ALL = ndb.Key('Country', "all")

class Subscriber(ndb.Model):
    phone_no = ndb.StringProperty()

    @classmethod 
    def query_subs(cls, key):
        return cls.query(ancestor=key).order(-cls.phone_no)
    @classmethod
    def random(cls, key):
        i   = randint(0, 99)
        all = cls.query_subs(key).fetch(100)  
        return all(0, 99) 
