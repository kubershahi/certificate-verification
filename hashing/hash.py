import hashlib
path = './certificates/user4@alumni.ashoka.edu.in.pdf''

h = hashlib.sha3_256()
with open(path, 'rb') as f:
  data = f.read()
  h.update(data)
  a = h.hexdigest()
  print(a)

f.close()