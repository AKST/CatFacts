import sys; sys.path.append('lib')

_cache = {}

def get_view(view_name):
    if view_name in _cache:
        return _cache[view_name]
    f = open(view_name, 'r')
    _cache[view_name] = f.read() 
    f.close()
    return _cache[view_name] 
