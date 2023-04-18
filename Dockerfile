FROM eclipse-temurin:17-jre-alpine
WORKDIR /work
RUN apk add nodejs npm 
COPY . /work
RUN cd /work && npm install 
EXPOSE 3000
