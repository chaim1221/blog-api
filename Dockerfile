# base image
FROM node:9.8.0

# set working directory
RUN mkdir -p /usr/src/app
COPY ./ /usr/src/app/
WORKDIR /usr/src/app

# add node_modules/.bin to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV PORT 80

# install and cache app dependencies
RUN npm install

# start app
CMD ["npm", "start"]
