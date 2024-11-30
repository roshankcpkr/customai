# CustomAI

## Overview

CustomAI. Built using Modus, Hypermode and Dgraph, helps you to create your own inference api with your own labeled data, serving multiple use cases.

## Features

- **Image Analysis**: Quickly analyzes images to find visually similar counterparts.
- **Fast Response Time**: Utilizes advanced algorithms for quick processing and retrieval.
- **Scalable Architecture**: Built on Dgraph, ensuring high performance and scalability.
- **Easy Integration**: Simple Graphql API endpoints for easy integration into applications.

## Getting Started
git clone https://github.com/roshankcpkr/customai
cd backend
cd customai
create .env.dev.local file with MODUS_DGRAPH_API_KEY=value
modus dev

open new terminal
cd backend
cd flask
pip install -r requirements.txt
python app.py

then open new terminal
cd frontend
npm install
create .env file 
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/project


NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_UPLOAD_PRESET=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_BACKEND_API=http://localhost:8686/graphql

### Prerequisites

- Node.js
- Dgraph cloud
- Modus Hypermode framework
- hypermode signup
- clerk
- cloudinary
