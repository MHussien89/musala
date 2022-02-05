# Run Server locally

## Run mode

    docker-compose up --build

`--build`
should be used first time, and whenever there are changes applied.

#### Initial installation and run:

    docker pull mongo

    docker run -it -p 27017:27017 -v ~/mongo/data:/data/db --name mongo -d mongo

#### logs

    docker logs mongoDB

    docker logs musala-server

#### stop database server

    docker stop mongoDB

#### stop musala server

    docker stop musala-server


#### build docker image

    docker build -t musala-dev --build-arg BUILD_ENV=staging .

`Build_ENV` accepted args are `development`, `staging`