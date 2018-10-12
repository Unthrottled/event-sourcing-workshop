package io.acari.event.source.repository

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import io.acari.event.source.models.Event
import org.bson.Document
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

/**
 * Forged in the flames of battle by alex.
 */
@Service
class PreBuiltPodMemberRepository(private val reactiveMongoTemplateDefined: ReactiveMongoTemplate) {
    private val objectMapper = jacksonObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)

    fun fetchPodMemberEventStream(pathVariable: String): Flux<Event> =
            reactiveMongoTemplateDefined.find(Query.query(Criteria.where("id").`is`(pathVariable)), Document::class.java, "podMemberEvents")
                    .map {
                        it["events"] as List<Document>
                    }
                    .flatMap {
                        Flux.fromIterable(it)
                                .map { it.toJson() }
                                .map { objectMapper.readValue(it, Event::class.java) }
                    }

    fun saveEvent(pathVariable: String, event: Event): Mono<Event> =
            reactiveMongoTemplateDefined.upsert(
                    Query.query(Criteria.where("id").`is`(pathVariable)),
                    Update().push("events", Document.parse(objectMapper.writeValueAsString(event))),//probably should figure out how to do this better.
                    String::class.java, "podMemberEvents"
            ).map { event }
}