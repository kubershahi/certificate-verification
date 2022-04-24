'''
Script to generate SHA3-256 hashes of certificates(pdf format) in a folder

Note: Make sure there aren't any other files in the directory other than the certificates and
the file names of the certificates are the email addresses of the certificate holder. The hash
of the certificate will be paired with the email as the identity of the certifcate.

'''

import os
import hashlib
import json

certificate = []

source_dir = './certificates'

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
          certificate.append({'email': str(email), 'hash': str(hash), 'proof': [] })
    else:
      print('Error: make sure you only have certificates in the directory.')

with open('data.json', 'w', encoding='utf-8') as fout:
    json.dump(certificate, fout, ensure_ascii=False)

fout.close()