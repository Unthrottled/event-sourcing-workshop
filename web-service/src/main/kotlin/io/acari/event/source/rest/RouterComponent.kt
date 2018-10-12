package io.acari.event.source.rest

import io.acari.event.source.handler.ImageHandler
import io.acari.event.source.handler.PodHandler
import io.acari.event.source.handler.PreBuiltPodHandler
import io.acari.event.source.models.Event
import io.acari.event.source.models.Identifier
import io.acari.event.source.models.PersonalInformation
import org.springframework.context.annotation.Bean
import org.springframework.core.io.ClassPathResource
import org.springframework.http.MediaType
import org.springframework.web.reactive.function.BodyExtractors
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.BodyInserters.fromPublisher
import org.springframework.web.reactive.function.server.HandlerFunction
import org.springframework.web.reactive.function.server.RequestPredicates.*
import org.springframework.web.reactive.function.server.RouterFunction
import org.springframework.web.reactive.function.server.RouterFunctions.*
import org.springframework.web.reactive.function.server.ServerResponse

/**
 * Forged in the flames of battle by alex.
 */
@Component
class RouterComponent(private val podHandler: PodHandler) {

  //it all starts here :)
}