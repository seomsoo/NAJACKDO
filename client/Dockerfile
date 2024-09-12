FROM node AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Second stage: serve the application with nginx
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html