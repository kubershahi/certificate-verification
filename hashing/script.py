import os
import csv
import hashlib

source_dir = './certificates'

with open('certificate.csv', 'w', newline = '') as fout:
  writer = csv.writer(fout)
  writer.writerow(['email', 'hash'])

  for root, subdirs, files in os.walk(source_dir):
    if not subdirs:
      for file in files:
        extension = os.path.splitext(file)[1]
        if extension == '.pdf':
          file_path = os.path.join(root,file)
          email = os.path.splitext(file)[0]
          with open(file_path, 'rb') as f:
            hash = hashlib.sha3_256(f.read()).hexdigest()
          f.close()
          writer.writerow([email, hash])
    else:
      print('Error: make sure you only have certificates in the directory.')

fout.close()