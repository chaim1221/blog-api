[![Build Status](https://travis-ci.org/chaim1221/blog-api.svg?branch=master)](https://travis-ci.org/chaim1221/blog-api)

[![GitHub version](https://badge.fury.io/gh/chaim1221%2Fblog-api.svg)](https://badge.fury.io/gh/chaim1221%2Fblog-api)

TODO: Deployed URL

#### Blog API

##### who
[Chaim Eliyah](https://github.com/chaim1221)

##### what
This is a blog API in NodeJS deployed to AWS using Travis CI. It is being written as part of a coding challenge handed off by a recruiter.  

##### when
April-May 2018, late at night.

##### why
Because we like you.

##### how
`npm start` will get you started.
`npm test` will get you tested.
If you fire up Postman, `blog-api.postman_collection.json` will keep you posted.

##### deploying
Manually delete the container if it exists. Then:  
```
brew update && brew install azure-cli
docker build -t blog-api .
docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 8080:8080 --rm blog-api
az acr login --name={username}
docker push ndlon.azurecr.io/blog-api:v1
az container create --resource-group blog-api --name blog-api --image ndlon.azurecr.io/blog-api
az container show --resource-group ndlon --name blog-api --query instanceView.state
```

TODO: Get the Azure CLI working in Travis....
