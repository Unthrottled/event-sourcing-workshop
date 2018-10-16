# Event Sourced Workshop!

- [Prerequisites](#prerequisites)
- [Running the Application](#running-the-application)
- [Introduction](#introduction)
    * [Project Requirements!](#requirements)
- [Applications Current State](#current-application-state)
    * [REST Contract Details](#rest-contract-details)
        + [Pod Level REST Details](#pod-level)
            * [Pod Member Additions](#pod-member-additions)
            * [Pod Member Removal](#pod-member-removal)
            * [List Active Members](#list-pod-members)
        + [Pod Member Level REST Details](#pod-member-level)
            * [Pod Member Information](#pod-member-information)
            * [Pod Member Contact Information Addition](#pod-member-contact-information)
            * [Pod Member Interests](#pod-member-interests)
                + [Interest Creation](#creation)
                + [Interest Deletion](#deletion)
            * [Pod Member Avatar Access](#avatar-access)
- [Where the Workshop Begins!](#where-the-workshop-work-begins)
   1. [Create Minimal REST API](#1-create-minimal-rest-api)
   1. [Wire in Services into the REST API](#2-wire-in-services-into-the-rest-api)
   1. [Implement Service Methods!](#3-implement-service-methods)
- [Event Stream Samples](#event-stream-examples)
  * [Pod Level Event Stream](#pod-level-event-stream)
  * [Pod Member Level Event Stream](#pod-member-level-event-stream)
## Prerequisites
 - JRE 1.8
 - [Docker and Docker-Compose (should support version 3.0 compose files)](https://docs.docker.com/docker-for-mac/)
 - Alternatively MongoDB
    - Running on port number 27017
    
## Running the Application

1. Start up mongo!
    - If using docker just do `docker-compose up -d` at the root of this repository (also if you have mongo already running locally skip this)
    - If not using docker, be sure that your installed instance of MongoDB is up and running on port 27017!

2. Checkout the `workshop` branch on this repository.

3. Run the application!
  - For this workshop, we are going to need to run the application under a Spring active profile of `local`.
  - It is easiest to run in the command line using this command: 
```
./gradlew bootrun -Dspring.profiles.active=local
```
> Note: You do not have to use CLI, if using intellij, just make sure that the Spring Profile is set to `local`, 
 If using another IDE, just make sure you can run a gradle project and 
 be able to set the Spring Profile argument is set to local eg the parameters on the cli: (-Dspring.profiles.active=local)


## Introduction

We are tasked with developing an application that allows us to keep track of all of the members in **Pod Supreme**.

### Requirements!!

- Pod Supreme cares a lot about how the pod has grown overtime. 
    - Which means they like to look back overtime and see how things have changed. 

- In addition they also like not having to save their progress. 
  - Every action they take is deliberate, so be sure to capture information as it is put in!

- Pod Supreme asks that they be able to visualise all of the current members in there pod.

- Pod Supreme needs to be able to add new members and remove fellow friends that leave leave from the pod. 

- Pod Supreme members also want to be able to personalize their profile by being able to use an avatar of any image type (including animated gifs).

- Pod Supreme members want others to know how they can be contacted in an event of a question, whether it be by phone or email.

- Pod Supreme members want others to also know what they are currently interested in an the moment. 
The want the ability to add and remove interests as time progresses and they change.

## Current Application State

The frontend was built out to satisfy the functional portions of the requirements listed above.

All data that is added to the application is done through by using events in the form of a **Flux Standard Action** or **FSA**  for short
Which will be stored in as an event stream at the level of **Pod Supreme** and at the level of the **Pod Member**


A FSA maintains this type declaration. 

```typescript
{
  "type": string,
  "payload": any,
  "error": boolean,
  "meta": any
}
```

Basically, the list of pod members in Pod Supreme can be projected by a distinct 
event stream and the details of each Pod Member can be projected using unique event 
stream for each pod member created.

However, only the frontend has been built, all data persistence and projections have not been built yet.

Thankfully, they built all of it out to a REST Contract!  

### REST Contract details

#### Pod Level 

#### Pod Member Additions

All pod member additions are handled by `POST`ing and event to the backend route `/api/pod/event`

With a request body that looks like this:

```javascript 1.8
{
  "type": "POD_MEMBER_CREATED",
  "payload": {
    "identifier": "17d16ba0-b43f-11e8-a39e-ad0592b82c90"
  },
  "error": false,
  "meta": {}
}
```

> NOTE: The identifier is supplied by the UI

#### Pod Member Removal

All pod member removals are handled by `POST`ing and event to the backend route `/api/pod/event`

With a request body that looks like this:

```javascript 1.8
{
  "type": "POD_MEMBER_DELETED",
  "payload": {
    "identifier": "e9e462c0-a7b8-11e8-9852-dbb438e9e7e6"
  },
  "error": false,
  "meta": {}
}
```

### Note: All events are put in sequentially, ie A _DELETED_ event will not come before a _ADDED_

#### List Pod Members

Event streams are great and all, but that abstraction should not really matter to any other service that may want to consume our Pod Information.

With that in mind, when the application first loads in the browser, the UI will first attempt to get a list of all of the pod members that currently are active in **Pod Supreme**

It will `GET` this information at `/api/pod/members`.
It is ONLY going to respond with a JSON array:

```javascript 1.8
Content-Type: application/json
```

With a payload that looks like this:

```javascript 1.8
[{
	"_id": "dffc6470-a712-11e8-b3de-89c3131879b4"
},
{
	"_id": "bc1d6900-9fd3-11e8-b28d-df00e344ef92"
}]
```

Pod Member Level
---

#### Pod Member Information

On the topic of information retrieval, all pod member information is expected to be accessible 
by `GET`ting it at `/api/pod/member/{identifier}/information`

Where it returns just content type of `application/json` and NOT 'application/stream+json'

Expected return value is as follows:

```javascript 1.8
{
    "interests": [
      {
        "id": "25313000-b43f-11e8-a39e-ad0592b82c90",
        "value": "Google Feud"
      }
    ],
    "email": "is.my.c@plotting-against.me",
    "firstName": "A Pet",
    "lastName": "Named Steve",
    "phoneNumber": "1234567890"
}
```

#### Pod Member Contact Information

All pod member level contact information is persisted by `POST`ing an **FSA** to 
`/api/pod/member/{identifier}/event`.

The FSA is expected to look something like this:

```javascript 1.8
{
    "type": "PERSONAL_INFO_CAPTURED",
    "payload": {
      "value": "Named Steve",
      "field": "lastName"
    },
    "error": false,
    "meta": {}
  }
```

Where the field can be `firstName`, `lastName`, `email`, or `phoneNumber`.

#### Pod Member Interests

##### Creation

All pod member level interest information is persisted by `POST`ing an **FSA** to 
`/api/pod/member/{identifier}/event`.

The FSA is expected to look something like this:

```javascript 1.8
{
    "type": "INTEREST_CAPTURED",
    "payload": {
      "id": "25313000-b43f-11e8-a39e-ad0592b82c90",
      "value": "Google Feud"
    },
    "error": false,
    "meta": {}
  }
```

Where the UI creates the `identifier`

##### Deletion

All pod member level interest information is persisted by `POST`ing an **FSA** to 
`/api/pod/member/{identifier}/event`.

The FSA is expected to look something like this:

```javascript 1.8
  {
    "type": "INTEREST_REMOVED",
    "payload": {
      "id": "5a619d90-b445-11e8-88d5-5fe830a9621a",
      "value": "Waterfall Development"
    },
    "error": false,
    "meta": {}
  }
```

Where the UI maintains the reference the `identifier`

#### Avatar Access

Remember when I said that the backend has not been built for data persistence?
Well I lied, turns out that some of the REST API has been built out.
Those parts are the static content forwarding and Avatar Image Persistence/Retreival.

### Where the Workshop Work Begins!

#### 1. Create Minimal REST API

In `PodRestController` we will need to put one of our rest controller!

As a recap, here is the following outline of what the UI is expecting in regards as a REST API:
- POST `/api/pod/event` 
    - Accepts a `String` and returns the accepted `Event` (which is a string) as a `Optional` eg: `Optional<String>`
- GET `/api/pod/members`
    - Returns a empty `Stream<Identifier>` remember that the return type _must_ be `application/json`!
    
In `PodMemberRestController` we will need to put the other rest controller!

- POST `/api/pod/member/{identifier}/event`
    - Accepts a `Event` and returns the accepted `Event` as a `Optional` eg: `Optional<Event>`
    - Needs to also take advantage  of the _path variable_
- GET `/api/pod/member/{identifier}/information`
    - Accepts the _path variable_ and returns an empty `Optional<PersonalInformation>
    
We well need to fulfill the following before we can move onto the next part.
    
#### 2. Wire in Services into the REST API

It is really convenient that the `PodHandler` class has a handy API!
Which looks a little something like this:

```java
//Pod Handler
public Stream<Identifier> projectAllPodMembers();
public Optional<Event> savePodMemberEvent(String podMemberIdentifier, Event eventToSave);
public Optional<String> savePodEvent(String eventAsJson);
public Optional<PersonalInformation> projectPersonalInformation(String podMemberIdentifier);
```

Take the time to match the handler API to the corresponding REST API we created above!

#### 3. Implement Service Methods!

Now comes the fun part!
We'll start off easy and work our way up!

Implement these service methods in `PodHandler`!

1. public Stream<Identifier> projectAllPodMembers();
1. public Optional<Event> savePodMemberEvent(String podMemberIdentifier, Event eventToSave);
1. public Optional<String> savePodEvent(String eventAsJson);
1. public Optional<PersonalInformation> projectPersonalInformation(String podMemberIdentifier);
    1. Start off by projecting contact information
    1. Second project Interests
    1. Combine both projections
    1. ????
    1. Profit!

## Event Stream Examples

### Pod Level Event Stream

```javascript 1.8
Content-Type: application/json

[{
	"type": "POD_MEMBER_CREATED",
	"payload": {
		"identifier": "d7c9d570-a7b8-11e8-a8e4-afa47f95a3a1"
	},
	"error": false,
	"meta": {}
},
{
	"type": "POD_MEMBER_CREATED",
	"payload": {
		"identifier": "e9e462c0-a7b8-11e8-9852-dbb438e9e7e6"
	},
	"error": false,
	"meta": {}
},
{
	"type": "POD_MEMBER_CREATED",
	"payload": {
		"identifier": "17d16ba0-b43f-11e8-a39e-ad0592b82c90"
	},
	"error": false,
	"meta": {}
},
{
	"type": "POD_MEMBER_DELETED",
	"payload": {
		"identifier": "e9e462c0-a7b8-11e8-9852-dbb438e9e7e6"
	},
	"error": false,
	"meta": {}
}]
```

### Pod Member Level Event Stream

```javascript 1.8
Content-Type: application/json
[{
	"type": "PERSONAL_INFO_CAPTURED",
	"payload": {
		"value": "Party",
		"field": "firstName"
	},
	"error": false,
	"meta": {}
},
{
	"type": "PERSONAL_INFO_CAPTURED",
	"payload": {
		"value": "Parrot",
		"field": "lastName"
	},
	"error": false,
	"meta": {}
},
{
	"type": "PERSONAL_INFO_CAPTURED",
	"payload": {
		"value": "party@parrot.io",
		"field": "email"
	},
	"error": false,
	"meta": {}
},
{
	"type": "PERSONAL_INFO_CAPTURED",
	"payload": {
		"value": "1234567890",
		"field": "phoneNumber"
	},
	"error": false,
	"meta": {}
},
{
	"type": "INTEREST_CAPTURED",
	"payload": {
		"id": "10747c60-b446-11e8-88d5-5fe830a9621a",
		"value": "Party"
	},
	"error": false,
	"meta": {}
},
{
	"type": "INTEREST_CAPTURED",
	"payload": {
		"id": "12b91530-b446-11e8-88d5-5fe830a9621a",
		"value": "Parrot"
	},
	"error": false,
	"meta": {}
},
{
	"type": "INTEREST_CAPTURED",
	"payload": {
		"id": "16463390-b446-11e8-88d5-5fe830a9621a",
		"value": "Not Partying"
	},
	"error": false,
	"meta": {}
},
{
	"type": "INTEREST_CAPTURED",
	"payload": {
		"id": "14040bc0-b446-11e8-88d5-5fe830a9621a",
		"value": "RGB"
	},
	"error": false,
	"meta": {}
},
{
	"type": "INTEREST_REMOVED",
	"payload": {
		"id": "16463390-b446-11e8-88d5-5fe830a9621a",
		"value": "Not Partying"
	},
	"error": false,
	"meta": {}
},
{
	"type": "PERSONAL_INFO_CAPTURED",
	"payload": {
		"value": "Ultra Fast Party",
		"field": "firstName"
	},
	"error": false,
	"meta": {}
},
{
	"type": "PERSONAL_INFO_CAPTURED",
	"payload": {
		"value": "party@parrot.io",
		"field": "email"
	},
	"error": false,
	"meta": {}
},
{
	"type": "AVATAR_UPLOADED",
	"payload": {
		"identifier": "5b953e0dd99cc7703eef3f40"
	},
	"error": false,
	"meta": {}
}]
```