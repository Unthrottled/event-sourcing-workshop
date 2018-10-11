###spring 

Reactive Streams is a small spec, also adopted in Java 9, that defines the interaction between asynchronous components with back pressure. For example a data repository — acting as Publisher, can produce data that an HTTP server — acting as Subscriber, can then write to the response. The main purpose of Reactive Streams is to allow the subscriber to control how fast or how slow the publisher will produce data.

- Annotated Controllers — consistent with Spring MVC, and based on the same annotations from the spring-web module. Both Spring MVC and WebFlux controllers support reactive (Reactor, RxJava) return types and as a result it is not easy to tell them apart. One notable difference is that WebFlux also supports reactive @RequestBody arguments.

- Functional Endpoints — lambda-based, lightweight, functional programming model. Think of this as a small library or a set of utilities that an application can use to route and handle requests. The big difference with annotated controllers is that the application is in charge of request handling from start to finish vs declaring intent through annotations and being called back.

Below are some specific points to consider:

- If you have a Spring MVC application that works fine, there is no need to change. Imperative programming is the easiest way to write, understand, and debug code. You have maximum choice of libraries since historically most are blocking.
- If you are already shopping for a non-blocking web stack, Spring WebFlux offers the same execution model benefits as others in this space and also provides a choice of servers — Netty, Tomcat, Jetty, Undertow, Servlet 3.1+ containers, a choice of programming models — annotated controllers and functional web endpoints, and a choice of reactive libraries — Reactor, RxJava, or other.
- If you are interested in a lightweight, functional web framework for use with Java 8 lambdas or Kotlin then use the Spring WebFlux functional web endpoints. That can also be a good choice for smaller applications or microservices with less complex requirements that can benefit from greater transparency and control.
- In a microservice architecture you can have a mix of applications with either Spring MVC or Spring WebFlux controllers, or with Spring WebFlux functional endpoints. Having support for the same annotation-based programming model in both frameworks makes it easier to re-use knowledge while also selecting the right tool for the right job.
- A simple way to evaluate an application is to check its dependencies. If you have blocking persistence APIs (JPA, JDBC), or networking APIs to use, then Spring MVC is the best choice for common architectures at least. It is technically feasible with both Reactor and RxJava to perform blocking calls on a separate thread but you wouldn’t be making the most of a non-blocking web stack.
- If you have a Spring MVC application with calls to remote services, try the reactive WebClient. You can return reactive types (Reactor, RxJava, or other) directly from Spring MVC controller methods. The greater the latency per call, or the interdependency among calls, the more dramatic the benefits. Spring MVC controllers can call other reactive components too.
- If you have a large team, keep in mind the steep learning curve in the shift to non-blocking, functional, and declarative programming. A practical way to start without a full switch is to use the reactive WebClient. Beyond that start small and measure the benefits. We expect that for a wide range of applications the shift is unnecessary. If you are unsure what benefits to look for, start by learning about how non-blocking I/O works (e.g. concurrency on single-threaded Node.js) and its effects.

Spring WebFlux is supported on Tomcat, Jetty, Servlet 3.1+ containers, as well as on non-Servlet runtimes such as Netty and Undertow. All servers are adapted to a low-level, common API so that higher level programming models can be supported across servers.

Reactive and non-blocking generally do not make applications run faster.
The key expected benefit of reactive and non-blocking is the ability to scale with a small, fixed number of threads and less memory. That makes applications more resilient under load because they scale in a more predictable way. In order to observe those benefits however you need to have some latency including a mix of slow and unpredictable network I/O. That’s where the reactive stack begins to show its strengths and the differences can be dramatic.

In Spring WebFlux, and non-blocking servers in general, it is assumed that applications will not block, and therefore non-blocking servers use a small, fixed-size thread pool (event loop workers) to handle request

###### Invoking a Blocking API

What if you do need to use a blocking library? Both Reactor and RxJava provide the publishOn operator to continue processing on a different thread. That means there is an easy escape latch. Keep in mind however that blocking APIs are not a good fit for this concurrency model.


###### Threading Model

What threads should you expect to see on a server running with Spring WebFlux?

- On a "vanilla" Spring WebFlux server (e.g. no data access, nor other optional dependencies), you can expect one thread for the server, and several others for request processing (typically as many as the number of CPU cores). Servlet containers, however, may start with more threads (e.g. 10 on Tomcat), in support of both servlet, blocking I/O and servlet 3.1, non-blocking I/O usage.
- The reactive WebClient operates in event loop style. So you’ll see a small, fixed number of processing threads related to that, e.g. "reactor-http-nio-" with the Reactor Netty connector. However if Reactor Netty is used for both client and server, the two will share event loop resources by default.
- Reactor and RxJava provide thread pool abstractions, called Schedulers, to use with the publishOn operator that is used to switch processing to a different thread pool. The schedulers have names that suggest a specific concurrency strategy, e.g. "parallel" for CPU-bound work with a limited number of threads, or "elastic" for I/O-bound work with a large number of threads. If you see such threads it means some code is using a specific thread pool Scheduler strategy.
- Data access libraries and other 3rd party dependencies may also create and use threads of their own.

##### Jackson

The decoder relies on Jackson’s non-blocking, byte array parser to parse a stream of byte chunks into a TokenBuffer stream, which can then be turned into Objects with Jackson’s ObjectMapper. JSON and Smile (binary JSON) data formats are currently supported.

- The encoder processes a Publisher<?> as follows:
- if the Publisher is a Mono (i.e. single value), the value is encoded when available.
- if media type is application/stream+json for JSON or application/stream+x-jackson-smile for Smile, each value produced by the Publisher is encoded individually (and followed by a new line in JSON).

otherwise all items from the Publisher are gathered in with Flux#collectToList() and the resulting collection is encoded as an array.
As a special case to the above rules the ServerSentEventHttpMessageWriter feeds items emitted from its input Publisher individually into the Jackson2JsonEncoder as a Mono<?>.
Note that both the Jackson JSON encoder and decoder explicitly back out of rendering elements of type String. Instead String's are treated as low level content, (i.e. serialized JSON) and are rendered as-is by the CharSequenceEncoder. If you want a Flux<String> rendered as a JSON array, you’ll have to use Flux#collectToList() and provide a Mono<List<String>> instead.

##### HTTP Streaming
      
Same in Spring MVC

When a multi-value, reactive type such as Flux is used for response rendering, it may be collected to a List and rendered as a whole (e.g. JSON array), or it may be treated as an infinite stream with each item flushed immediately. The determination for which is which is made based on content negotiation and the selected media type which may imply a streaming format (e.g. "text/event-stream", "application/stream+json"), or not (e.g. "application/json").

When streaming to the HTTP response, regardless of the media type (e.g. text/event-stream, application/stream+json), it is important to send data periodically, since the write would fail if the client has disconnected. The send could take the form of an empty (comment-only) SSE event, or any other data that the other side would have to interpret as a heartbeat and ignore.

Spring WebFlux does not support suffix pattern matching — unlike Spring MVC, where a mapping such as /person also matches to /person.*

Some annotated controller method arguments that represent String-based request input — e.g. @RequestParam, @RequestHeader, @PathVariable, @MatrixVariable, and @CookieValue, may require type conversion if the argument is declared as something other than String.


Spring WebFlux, unlike Spring MVC, supports reactive types in the model, e.g. Mono<Account> or io.reactivex.Single<Account>. An @ModelAttribute argument can be declared with or without a reactive type wrapper, and it will be resolved accordingly, to the actual value if necessary. Note however that in order to use a BindingResult argument, you must declare the @ModelAttribute argument before it without a reactive type wrapper, as shown earlier. Alternatively, you can handle any errors through the reactive type:

##### Functional endpoints

Spring WebFlux includes a lightweight, functional programming model in which functions are used to route and handle requests and contracts are designed for immutability.

>For example, given a Publisher that is not a Mono, the Jackson JSON message writer expects multiple values. If the media type implies an infinite stream — e.g. "application/json+stream", values are written and flushed individually; otherwise values are buffered into a list and rendered as a JSON array.



Project Reactor
---

[Threading stuffs](http://projectreactor.io/docs/core/release/reference/#schedulers)

[Error Stuffs](http://projectreactor.io/docs/core/release/reference/#error.handling)

[How to make a hot stream](http://projectreactor.io/docs/core/release/reference/#_safely_produce_from_multiple_threads_by_using_the_code_sink_code_facade)

[Tasty Kotlin Extensions](http://projectreactor.io/docs/core/release/reference/#kotlin-extensions)

[Connectable flux](http://projectreactor.io/docs/core/release/reference/#advanced-broadcast-multiple-subscribers-connectableflux)

