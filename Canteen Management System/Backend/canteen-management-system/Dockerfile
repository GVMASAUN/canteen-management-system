# Use an official Java runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the jar file into the container
COPY target/canteen-management-system-0.0.1-SNAPSHOT.jar app.jar

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# Expose the application port (if your Spring Boot app runs on 8080)
EXPOSE 8080
