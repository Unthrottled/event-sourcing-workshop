package io.acari.event.source.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.acari.event.source.models.Event;
import org.bson.Document;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class PodMemberRepository {
    private final ReactiveMongoTemplate reactiveMongoTemplateDefined;
    private final ObjectMapper objectMapper;

    public PodMemberRepository(ReactiveMongoTemplate reactiveMongoTemplateDefined, ObjectMapper objectMapper) {
        this.reactiveMongoTemplateDefined = reactiveMongoTemplateDefined;
        this.objectMapper = objectMapper;
    }

    public Stream<Event> fetchPodMemberEventStream(String podMemberIdentifier){
        return reactiveMongoTemplateDefined.find(Query.query(Criteria.where("id")
                .is(podMemberIdentifier)), Document.class, "podMemberEvents")
                .map(document -> (List<Document>) document.get("events"))
                .flatMap(documents ->
                        Flux.fromIterable(documents)
                .map(Document::toJson)
                .flatMap(json -> {
                    try {
                        return Mono.just(objectMapper.readValue(json, Event.class));
                    } catch (IOException e) {
                        return Mono.error(e);
                    }
                })).toStream();

    }

    public Optional<Event> saveEvent(String podMemberIdentifier, Event event){
        try {
            return reactiveMongoTemplateDefined.upsert(
                    Query.query(Criteria.where("id").is(podMemberIdentifier)),
            new Update().push("events", Document.parse(objectMapper.writeValueAsString(event))),//probably should figure out how to do this better.
                    String.class, "podMemberEvents")
                    .map(__-> event)
                    .blockOptional();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }
}
