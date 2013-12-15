from google.appengine.ext import ndb
from random import randint


MASTER_KEY = ndb.Key('Topic', 'Cats') 

class Fact(ndb.Model):
    detail = ndb.StringProperty()

    @classmethod
    def query_facts(cls, key):
        return cls.query(ancestor=key).order(-cls.detail)
    @classmethod
    def random(cls, key):
        all = cls.query_facts(key)  
        i   = randint(0, all.count()-1)
        return all.fetch(all.count())[i]
