## Description

This is a response to the challenge, proposing a solution to the shift allocation. At
the end of this document there is the original README content, which you can read for
more information.


## Installation

```bash
$ npm install
```


```bash
$ cd seed
```

```bash
$ npm install
```

Get the database running and seed it (only needs to run once and keep it alive)
```bash
$ docker compose up --build
```

```bash
$ cd ..
```

```bash
$ npm run migrations:run
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Docs

You can open this service by running in `development mode`, for example. The default port
configured is `3000`, hence you can access it via `http://localhost:3000/`.

All the provided endpoints are documented using Swagger and can be found at `http://localhost:3000/api`.

## Stack used

This challenge was done using NestJs. Nest provides a mature architecture, provides very
interesting features from scratch, with no need to reinvent the wheel, which by no means
is the intent.

It uses Swagger for documentation, which is a well known tool in the field and has a library
to ease the integration with Nest.

For unit testing Jest was used.

## Performance

For this challenge, when the data grows, the performance of the shift endpoint decreases proportionally.
 Considering that, there is a need to optimize the requests, so it can scale. The first attempt to achieve
this is creating indexes in the most expensive table, which is the Shift one.

Also, poorly written SQL queries could impair the performance of the application, which needs 
special attention. To make the server responses faster, it provided a paginated response,
which reduces considerably the time necessary for the endpoint to get the shifts of a given worker.

There are also other ways to improve the performance. For example, by using queues, you can 
replicate the service and scale it, reduce errors that happen when different parts of the system
go down, and much more. A server-sided cache can be considered to achieve a performant service as well. 

## Performance measurements

In `test/performance` you'll find two tests written using `autocannon`. It fires requests
automatically and check how many requests the server can handle per second.

In the `txt` files you can see the results of them. The `worker` files refers to the list
of worker endpoints, and the `worker-shifts` the one responsible for pointing out the shifts
a worker is able to claim.


# Challenge original docs

## Challenge

The context for this challenge is the following: You work at a company that powers a marketplace app for healthcare facilities to hire healthcare professionals (a.k.a. workers).

Your role is that of a senior software engineer that is in charge of the backend service and responsible for the shift eligibility feature.

Shift eligibility is a feature that allows you to know what shifts are eligible for a specific Worker in specific facilities.

The entities that come into play are the following, `Shift`, `Facility`, `Worker`, `Document`, `FacilityRequirement`, and `DocumentWorker`.

Your task is to complete the following User Story:

Story: As a worker, I want to get all available shifts that I'm eligible to work for.

### Acceptance Criteria:

- In order for a Worker to be eligible for a shift, the rules are:
    - A Facility must be active.
    - The Shift must be active and not claimed by someone else.
    - The Worker must be active.
    - The Worker must not have claimed a shift that collides with the shift they are eligible for.
    - The professions between the Shift and Worker must match.
    - The Worker must have all the documents required by the facilities.
- Given an active facility, when I request all available shifts within a start and end date, then it will return a list of shifts from that facility in the specified date range.
- Given an inactive facility, when I request all available shifts within a start and end date, then it will not return a list of shifts from that facility.
- Given a shift is claimed and is within the requested start and end date, when I request all available shifts within a start and end date, it will not return the claimed shift.
- The shifts must be grouped by date.


We provide a PostgreSQL database and a seed file for the sake of the exercise. It is random such that:

- Some shifts are claimed.
- Some workers are inactive.
- Some facilities are inactive
- Some workers don’t meet all the documents a facility requires.


## Challenge expectations:

We expect the following to be part of your submission:

- Risk mitigation through proper testing.
- Proper documentation for your endpoint
- Proper error handling and logging.
- A brief writeup on how you would guarantee a performant endpoint and how you measure its performance
- (Bonus) Measure the performance of your endpoint and provide a brief report


## Included in the challenge:

Seeding your database

We provide a folder called `seed` and this folder contains a docker-compose.yaml file that helps you set up a database. It is a PostgreSQL database and it is seeded with about 2 million records.

To set it up go into the `seed` folder and execute the command `docker compose up --build`. Once it's done, do not stop the docker compose.  This way the database keeps running and you can have your framework of choice to connect it to the database using the following database URL `postgres://postgres:postgres@localhost:5432/postgres`.

The seed script inserts a lot of workers, between those workers, there are 3 that fulfill all documents, they all have on of the professions, at the end of the seed script the ids + the profession will be printed, with that you can test your query and see results.

## Submission:

Please submit your solution in form of a PR. You are free in the choice of language and framework for this challenge.

After you have submitted your PR, please tag **cbhrecruiters** as a reviewer to notify us about your submission.
