import sys; sys.path.append('lib')
from util.io_tools import contents

_cache = {}

def get_view(view_name):
    if view_name in _cache:
        return _cache[view_name]
    _cache[view_name] = contents(view_name)
    return _cache[view_name] 
