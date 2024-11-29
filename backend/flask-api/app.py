from flask import Flask, request, jsonify
import keras
from keras._tf_keras.keras.applications.mobilenet_v2 import MobileNetV2
from keras._tf_keras.keras.applications.mobilenet_v2 import preprocess_input
from keras._tf_keras.keras.preprocessing.image import img_to_array
import numpy as np
import requests
import tensorflow as tf

app = Flask(__name__)

# Load pre-trained model
model = MobileNetV2(weights="imagenet", include_top=False, pooling="avg")

@app.route('/extract-embedding', methods=['POST'])
def extract_embedding():
    data = request.json
    image_url = data.get('image_url')

    if not image_url:
        return jsonify({"error": "image_url is required"}), 400

    try:
        # Fetch image
        response = requests.get(image_url)
        image = tf.image.decode_jpeg(response.content, channels=3)
        image = tf.image.resize(image, (224, 224)) 
        image = img_to_array(image.numpy())  
        image = preprocess_input(np.expand_dims(image, axis=0)) 

        # Generate embedding
        embedding = model.predict(image).flatten().tolist()

        return jsonify({"embedding": embedding})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
