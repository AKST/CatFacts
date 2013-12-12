from google.appengine.ext import ndb


class Fact(ndb.Model):
    detail = ndb.StringProperty()

    @classmethod
    def query_facts(cls, key):
        return cls.query(ancestor=key).order(-cls.detail)
