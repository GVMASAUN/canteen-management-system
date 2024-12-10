# Stage 1: Build the Angular app
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2: Serve the app using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/canteen-management-system /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
