# Run app using Dockerfile
- Step 1: Create a network using command `docker network create chat_app_network`
- Step 2: Run mongodb connecting to this network `docker run --network chat_app_network --name mongodb -d -p 27017:27017 mongo`
- Step 3: Build your backend application using backend Dockerfile `docker build -t chat_app_backend -f docker/Dockerfile.backend .`
- Step 4: Run your backend app connecting to same network `docker run --network chat_app_network --name backend -p 8080:8080 -e MONGODB_URI="mongodb://mongodb:27017/chat_app_db" -e JWT_SECRET=your_JWT_SECRET_here chat_app_backend`
- Step 5: Build your frontend app using frontend docker file `docker build -t chat_app_frontend -f docker/Dockerfile.frontend .`
- Step 6: Run your frontend app connecting to same network `docker run --network chat_app_network --name frontend -p 3000:3000 chat_app_frontend`
