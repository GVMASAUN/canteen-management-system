# Stage 1: Build the Angular app
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install --force

COPY ..

ARG ENVIRONMENT=development

RUN if[ "$ENVIRONMENT" = "production" ] ; then npm run build:production ; else npm run build:development ; fi

RUN npm run build:production

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

COPY --from=build /app/dist/canteen-management-system /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
