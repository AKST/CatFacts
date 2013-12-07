
def contents(fname):
    f = open(fname, 'r')
    content = f.read()
    f.close()
    return content
