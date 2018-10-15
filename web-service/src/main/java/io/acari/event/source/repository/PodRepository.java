package io.acari.event.source.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.acari.event.source.models.Event;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class PodRepository {
    private final ObjectMapper objectMapper;
    private final ReactiveMongoTemplate reactiveMongoTemplateDefined;
    private final MongoTemplate lameMongoTemplate;

    public PodRepository(ObjectMapper objectMapper,
                         ReactiveMongoTemplate reactiveMongoTemplateDefined,
                         MongoTemplate lameMongoTemplate) {
        this.objectMapper = objectMapper;
        this.reactiveMongoTemplateDefined = reactiveMongoTemplateDefined;
        this.lameMongoTemplate = lameMongoTemplate;
    }

    public Stream<Event> allPodEvents() {
        return lameMongoTemplate.findAll(String.class, "podEvents")
                .stream()
                .flatMap(document -> {
                    try {
                        return Stream.of(objectMapper.readValue(document, Event.class));
                    } catch (IOException e) {
                        e.printStackTrace();
                        return Stream.empty();
                    }
                });
    }

    public Stream<Event> allNonBlockingPodEvents() {
        return reactiveMongoTemplateDefined.findAll(String.class, "podEvents")
                .flatMap(document -> {
                    try {
                        return Mono.just(objectMapper.readValue(document, Event.class));
                    } catch (IOException e) {
                        e.printStackTrace();
                        return Mono.error(e);
                    }
                }).toStream();
    }

    public Optional<String> nonBlockingSaveEvent(String eventAsJson) {
        return reactiveMongoTemplateDefined.save(eventAsJson, "podEvents").blockOptional();
    }

    public Optional<String> saveEvent(String eventAsJson) {
        lameMongoTemplate.save(eventAsJson, "podEvents");
        return Optional.of(eventAsJson);
    }
}
