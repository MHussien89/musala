# Run Server locally

## Run mode

    docker-compose up --build

`--build`
should be used first time, and whenever there are changes applied.

## Development mode

# Deployment Guide

## Server Installation

### Database Mongo Server

#### Initial installation and run:

    docker pull mongo

    docker run -it -p 27017:27017 -v ~/mongo/data:/data/db --name mongo -d mongo

#### logs

    docker logs mongo

F

#### Run in container

    docker exec -it mongo bash

#### stop database server

    docker stop mongo

### musala App Node Server

#### build docker image

    docker build -t musala-dev --build-arg BUILD_ENV=staging .

`Build_ENV` accepted args are `development`, `staging`, `production`

#### Test image

- Follow Database 'Mongo Server Guide' above

You might need to remove the existing mongo container first.

- `docker run -p 8082:8082 --link mongo --name musala-app property-manager-staging`
- open localhost:8082

# Staging/Production deployment

## Build image

    aws ecr get-login-password --region me-south-1 | docker login --username AWS --password-stdin 616094957383.dkr.ecr.me-south-1.amazonaws.com

    [Staging]

    docker build -t property-manager-staging --build-arg BUILD_ENV=staging .

    docker tag property-manager-staging:latest 264195887153.dkr.ecr.me-south-1.amazonaws.com/property-manager-staging

    docker push 264195887153.dkr.ecr.me-south-1.amazonaws.com/property-manager-production:latest

    [Production]

    docker build -t property-manager-production --build-arg BUILD_ENV=production .]

    docker tag property-manager-production:latest 264195887153.dkr.ecr.me-south-1.amazonaws.com/property-manager-production:latest

    docker push 264195887153.dkr.ecr.me-south-1.amazonaws.com/property-manager-staging

## Server Installation

[First Time only]

#### Docker installation

    sudo adduser docker

    sudo visudo

Add the the line “root ALL=(ALL:ALL) ALL ”:

`docker ALL=(ALL:ALL) ALL`

    su - docker

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add

    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

    sudo apt-get update

    apt-cache policy docker-ce

    sudo apt-get install -y docker-ce

    sudo systemctl status docker

We have to add the username to the docker group

    sudo usermod -aG docker ${USER}

To apply this change, either we have to logout & login again or make use of the following command.

    su - ${USER}

Test the Docker

    docker run hello-world

### aws cli installation

    sudo apt install unzip

    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

    unzip awscliv2.zip

    sudo ./aws/install

Enter registry-user credentials

    aws configure

## Deploy Image on server

    mkdir ~/logs

    mkdir ~/logs/property-manager/

    aws ecr get-login-password --region me-south-1 | docker login --username AWS --password-stdin 264195887153.dkr.ecr.me-south-1.amazonaws.com

    [Staging]

    docker rmi $(docker images --filter "dangling=true" -q --no-trunc)

    docker pull 264195887153.dkr.ecr.me-south-1.amazonaws.com/property-manager-staging:latest

    docker run -d -p 8082:8082 --link mongo --name property-manager-staging -v ~/logs/property-manager:/logs 264195887153.dkr.ecr.me-south-1.amazonaws.com/property-manager-staging

    [Production]

    docker pull 264195887153.dkr.ecr.me-south-1.amazonaws.com/property-manager-production:latest

    docker run -d -p 8082:8082 --link mongo --name property-manager-production -v ~/logs/property-manager:/logs 264195887153.dkr.ecr.me-south-1.amazonaws.com/property-manager-production

[Refresh existing image]

    su - docker
    [password] docker

    aws ecr get-login-password --region me-south-1 | docker login --username AWS --password-stdin 616094957383.dkr.ecr.me-south-1.amazonaws.com

    [Staging]

    docker rmi $(docker images --filter "dangling=true" -q --no-trunc)

    docker pull 264195887153.dkr.ecr.me-south-1.amazonaws.com/property-manager-staging

    docker stop property-manager-staging

    docker rm property-manager-staging

    docker run -d -p 8082:8082 --link mongo --name property-manager-staging -v ~/logs/property-manager:/usr/src/app/logs 616094957383.dkr.ecr.me-south-1.amazonaws.com/property-manager-staging

    [Production]

    docker rmi $(docker images --filter "dangling=true" -q --no-trunc)

    docker pull 264195887153.dkr.ecr.me-south-1.amazonaws.com/property-manager-production:latest

    docker stop property-manager-production

    docker rm property-manager-production

    docker run -d -p 8082:8082 --link mongo --name property-manager-production -v ~/logs/property-manager:/usr/src/app/logs 264195887153.dkr.ecr.me-south-1.amazonaws.com/property-manager-production

## Test staging

    http://staging.birdnestlife.com/property-manager/

## Test production

    http://birdnestlife.com/property-manager/

### Database backups

copy .github/scripts/database-bkup.sh to ~/scripts/database-bkup.sh

```
wget -O- -q http://s3tools.org/repo/deb-all/stable/s3tools.key | sudo apt-key add -
sudo wget -O/etc/apt/sources.list.d/s3tools.list http://s3tools.org/repo/deb-all/stable/s3tools.list
sudo apt-get install s3cmd
s3cmd --configure

sudo su
s3cmd --configure
crontab -e

0 5 * * 1 /home/docker/scripts/database-bkup.sh >> /var/log/database-bkup-cron.log

```
