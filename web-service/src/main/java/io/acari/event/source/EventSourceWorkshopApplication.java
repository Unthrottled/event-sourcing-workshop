package io.acari.event.source;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoReactiveDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoReactiveAutoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

@EnableReactiveMongoRepositories
@SpringBootApplication(exclude = {
        MongoReactiveDataAutoConfiguration.class,
        MongoReactiveAutoConfiguration.class})
public class EventSourceWorkshopApplication {

    public static void main(String... args) {
        SpringApplication.run(EventSourceWorkshopApplication.class, args);
    }
}
