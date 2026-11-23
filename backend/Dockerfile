FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /src
COPY job-tracker-backend-source.zip /tmp/backend-source.zip
RUN jar xf /tmp/backend-source.zip
RUN mvn -B -DskipTests package
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /src/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
