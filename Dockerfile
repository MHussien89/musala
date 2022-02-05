FROM node:lts-alpine
RUN apk add --no-cache --virtual .gyp python3-dev make g++
RUN mkdir -p /usr/src/app
# ARG BUILD_ENV
ARG BUILD_ENV
ENV BUILD_ENV_VALUE=$BUILD_ENV
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN yarn install --production && \
    apk del .gyp
COPY ./src /usr/src/app/src
COPY ./.env /usr/src/app/.env
COPY ./.env.staging /usr/src/app/.env.staging
EXPOSE 8082
RUN echo $BUILD_ENV_VALUE
CMD ["sh", "-c", "yarn start:${BUILD_ENV_VALUE}"]