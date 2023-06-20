#FROM maven:3.8.4-openjdk-8 AS buildstage
#
#WORKDIR /app
#
#COPY . .
#
#RUN mvn package
#
#FROM openjdk:8 AS runstage
#
#COPY --from=buildstage /target/em-app-0.0.1-SNAPSHOT.jar .
#
#EXPOSE 8080
#
#RUN adduser --system --group spring
#
#USER spring
#
#ENTRYPOINT ["java", "-jar", "em-app-0.0.1-SNAPSHOT.jar"]

FROM eclipse-temurin:17-jdk-alpine
EXPOSE 8080
VOLUME /tmp
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
