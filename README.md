<img src="https://travis-ci.com/images/logos/Tessa-pride-4.png" width=32 height=32 />  &nbsp;  [![Build Status](https://travis-ci.org/chaim1221/blog-api.svg?branch=master)](https://travis-ci.org/chaim1221/blog-api)  &nbsp;  &nbsp;  <img src="https://assets-cdn.github.com/images/modules/logos_page/Octocat.png" width=32 height=32 />  &nbsp;  [![GitHub version](https://badge.fury.io/gh/chaim1221%2Fblog-api.svg)](https://badge.fury.io/gh/chaim1221%2Fblog-api)  

<img src="https://i1.wp.com/buildazure.com/wp-content/uploads/2017/09/Azure.png?w=519&ssl=1" width=32 height=32 />  &nbsp;  [![Deploy to Azure](http://azuredeploy.net/deploybutton.png)](https://github.com/chaim1221/blog-api#azure)

### Blog API

#### who
[Chaim Eliyah](https://github.com/chaim1221)

#### what
This is a blog API in NodeJS deployed to AWS using Travis CI. It is being written as part of a coding challenge handed off by a recruiter.  

#### when
April-May 2018, late at night.

#### why
Because we like you.

#### how
`npm start` will get you started.  
`npm test` will get you tested.  
If you fire up Postman, `blog-api.postman_collection.json` will keep you posted.  
If you're into Docker, try  
```
docker build -t blogapi.azurecr.io/blog-api .
docker run -d -p 8080:80 blog-api # works with Postman; 80:80 in prod
```

#### azure
Documentation on deploying containers to Azure can be found [here](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-azure-cli#create-a-resource-group).

You won't have a great time deploying if you haven't configured the Azure Container Registry, but this should have already been done:
```
brew update && brew install azure-cli
# refer to the Azure CLI documentation for information on how to get properly authenticated.
az group create --name nwea --location westus
az acr create --resource-group nwea --name blogapi --sku Basic
az acr login --name blogapi
```

#### deploying
```
# if not run during "how":
docker build -t blogapi.azurecr.io/blog-api .
# be careful not to overwrite existing versions:
docker push blogapi.azurecr.io/blog-api:{version}
# see the tag you pushed:
az acr repository show-tags --name blogapi --repository blog-api --output table
```
--this should resuld in seeing the tag equal to `{version}` (e.g., `v1`).

Why stop there?
```
# enable root access
az acr update --name blogapi --admin-enabled true
# get the deploy key ("password")
az acr credential show --name blogapi --query "passwords[0].value"
az container create --resource-group nwea --name acr-quickstart --image blogapi.azurecr.io/blog-api:v1 --cpu 1 --memory 1 --registry-username blogapi --registry-password "{deploy key}" --dns-name-label nwea-blog-api --ports 80
# and, here's a handy URL for you to point Postman at:
az container show --resource-group nwea --name acr-quickstart --query ipAddress.fqdn
```
That's it, you're deployed to Azure in production.

Just to take the guesswork out of it, it's deployed to:   `nwea-blog-api.westus.azurecontainer.io`

I'd love to get this working with Travis CI, but there seems to be no support for that. Even if I could get the image pushed to the container registry, those last five steps have no automation support from Azure that I can see. But I'll keep trying! :pray:
