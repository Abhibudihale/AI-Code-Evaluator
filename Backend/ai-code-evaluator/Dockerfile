FROM eclipse-temurin:21-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and maven wrapper files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Ensure the maven wrapper has execution permissions
RUN chmod +x mvnw

# Download dependencies (this caches them for faster builds later)
RUN ./mvnw dependency:go-offline

# Copy the actual project source code
COPY src src

# Package the application (skip tests for faster deployment)
RUN ./mvnw clean package -DskipTests

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "target/ai-code-evaluator-0.0.1-SNAPSHOT.jar"]
