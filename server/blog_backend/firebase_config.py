import firebase_admin
from firebase_admin import credentials, storage

# Path to your service account key
cred = credentials.Certificate("server/blog_backend/secrets/rentretreat-2fba4-firebase-adminsdk-at7q8-b424411f45.json")

firebase_admin.initialize_app(cred, {
    'storageBucket': 'rentretreat-2fba4.appspot.com'
})

bucket = storage.bucket()
