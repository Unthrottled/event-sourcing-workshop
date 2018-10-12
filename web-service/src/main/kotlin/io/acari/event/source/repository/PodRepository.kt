package io.acari.event.source.repository

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import io.acari.event.source.models.Event
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.data.mongodb.core.findAll
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

/**
 * Forged in the flames of battle by alex.
 */

@Service
class PodRepository(private val reactiveMongoTemplateDefined: ReactiveMongoTemplate){

    private val objectMapper = jacksonObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)

    fun allPodEvents(): Flux<Event> =
            reactiveMongoTemplateDefined.findAll<String>(collectionName = "podEvents")
                    .map { objectMapper.readValue(it, Event::class.java) }

    fun saveEvent(eventJson: String): Mono<String> =
            reactiveMongoTemplateDefined.save(eventJson, "podEvents")

}