# Demo Video: https://tinyurl.com/EduNxtVid


# EduNxt

EduNxt is a fully functional educational platform built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The platform allows users to create, consume, and rate educational content. It also integrates AI-powered features using OpenAI NLP models, including transcription of video lectures, generating concise notes in PDF format, and enabling interactive learning through a chatbot.

## Features

- **Educational Content Creation & Consumption:** Users can create educational content and share it with others. Consumers can access the content and engage with it.
- **AI-powered Note Generation:** The AI transcribes video lectures, generates summarized notes, and outputs them in a downloadable PDF format.
- **Interactive Chatbot:** A chatbot that enables users to interact with educational content for an enhanced learning experience.
- **Admin Panel:** Admins can manage users, content, and other aspects of the platform.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI & APIs:** OpenAI NLP, Assembly API, Cloudinary, Razorpay
- **Authentication:** JWT (JSON Web Tokens)
- **Payment Integration:** Razorpay
- **File Hosting:** Cloudinary

## Prerequisites

- Node.js
- MongoDB
- React.js
- Razorpay API Key (for payment gateway)
- Cloudinary API Key (for media storage)
- OpenAI API Key (for AI functionalities)

## Setup

### Clone the Repository

Run the following commands in your terminal:

``` git clone https://github.com/TanishqRinjay/EduNxt.git ```

``` cd eduNxt ```


### Install Dependencies

#### Client (Frontend):

1. Navigate to the `client` folder:
2. ``` cd client ```
3. Install the dependencies:
4. ``` npm install ```  
5. Create a `.env` file in the `client` folder and add the following configuration:
   ```
     REACT_APP_BASE_URL = http://localhost:4000/api/v1
   ```



#### Server (Backend):

1. Navigate to the `server` folder:
2. ``` cd server ```
3. Install the dependencies:
4. ``` npm install ```
3. Create a `.env` file in the `server` folder and add the following configuration:
```  
# Mail Setup
MAIL_USER = 
MAIL_HOST = 
MAIL_PASSWORD = 

# JWT Secret
JWT_SECRET = 

# Razorpay
RAZORPAY_KEY = 
RAZORPAY_SECRET = 

# Cloudinary
CLOUDINARY_CLOUD_NAME = 
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET = 
FOLDER_NAME = 

# Assembly API
ASSEMBLY_API_KEY =

# OpenAI API

OPENAI_API_KEY = 

# MongoDB
PORT = 4000
MONGO_URL = 
# MONGO_URL = 

```


