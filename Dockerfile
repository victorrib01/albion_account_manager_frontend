FROM node:13-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

ENV NODE_ENV=production

# Copying source files

COPY ./package*.json ./
COPY ./yarn.lock ./

# Installing dependencies
RUN yarn install
RUN yarn global add serve

COPY ./ ./

# Building app
RUN yarn build

EXPOSE 5000

CMD [ "yarn", "-s", "serve"]
