# **CustomAI**

CustomAI enables you to create your own inference API with your custom-labeled data, serving multiple use cases such as image analysis. Built with **Modus**, **Hypermode**, and **Dgraph**, it is designed for scalability, performance, and ease of integration.

---

## **Features**
- **Image Analysis**: Quickly analyze images to find visually similar counterparts.
- **Fast Response Time**: Advanced algorithms ensure quick processing and retrieval.
- **Scalable Architecture**: Built on Dgraph, providing high performance and scalability.
- **Easy Integration**: GraphQL API endpoints for seamless integration into your applications.

---

## **Getting Started**

Follow these steps to set up the project locally:

### **1. Clone the Repository**
```
git clone https://github.com/roshankcpkr/customai
cd customai
2. Backend Setup

Step 2.1: Setup Modus
Navigate to the backend folder and create a .env.dev.local file:

cd backend/customai
Add the following to .env.dev.local:
MODUS_DGRAPH_API_KEY=<YOUR_MODUS_DGRAPH_API_KEY>
Start Modus:
modus dev
Step 2.2: Setup Flask API
Open a new terminal and navigate to the Flask backend folder:

cd backend/flask
Install the required Python dependencies:

pip install -r requirements.txt
Run the Flask API:

python app.py
3. Frontend Setup
Open a new terminal and navigate to the frontend folder:

cd frontend
Install dependencies:

npm install
Create a .env file with the following environment variables:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<YOUR_CLERK_SECRET_KEY>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/project

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
NEXT_PUBLIC_UPLOAD_PRESET=<YOUR_UPLOAD_PRESET>
CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>
NEXT_PUBLIC_BACKEND_API=http://localhost:8686/graphql
Run the frontend:
npm install
npm run dev
```
Prerequisites
Before starting, ensure you have the following things:

Node.js
Dgraph Cloud
Modus Hypermode Framework
Clerk for authentication
Cloudinary for image storage

## **License**
This project is licensed under the MIT License.
