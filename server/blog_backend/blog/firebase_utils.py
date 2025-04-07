import uuid
from firebase_admin import storage

def upload_blog_image(file):
    bucket = storage.bucket()
    # Generate a unique file name
    blob = bucket.blob(f"blog_images/{uuid.uuid4()}_{file.name}")
    
    # Upload the file
    blob.upload_from_file(file, content_type=file.content_type)
    
    # Make the file publicly accessible
    blob.make_public()
   
    # Return the public URL
    return blob.public_url
