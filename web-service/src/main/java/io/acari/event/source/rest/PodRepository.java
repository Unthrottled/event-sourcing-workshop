package io.acari.event.source.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.acari.springwebflux.models.Event;
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

    public PodRepository(ObjectMapper objectMapper, ReactiveMongoTemplate reactiveMongoTemplateDefined) {
        this.objectMapper = objectMapper;
        this.reactiveMongoTemplateDefined = reactiveMongoTemplateDefined;
    }

    public Stream<Event> allPodEvents() {
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

    public Optional<String> saveEvent(String eventAsJson) {
        return reactiveMongoTemplateDefined.save(eventAsJson, "podEvents").blockOptional();
    }
}
