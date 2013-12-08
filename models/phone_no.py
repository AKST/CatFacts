from google.appengine.ext import ndb


class PhoneNo(ndb.Model):
    phone_no = ndb.StringProperty()
    confirmed = ndb.BooleanProperty(default=False)
