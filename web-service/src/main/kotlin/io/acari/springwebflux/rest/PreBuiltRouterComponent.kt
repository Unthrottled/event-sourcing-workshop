package io.acari.springwebflux.rest

import io.acari.springwebflux.handler.ImageHandler
import io.acari.springwebflux.handler.PodHandler
import io.acari.springwebflux.handler.PreBuiltPodHandler
import io.acari.springwebflux.models.Event
import io.acari.springwebflux.models.Identifier
import io.acari.springwebflux.models.PersonalInformation
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
class PreBuiltRouterComponent(private val imageHandler: ImageHandler,
                              private val preBuiltPodHandler: PreBuiltPodHandler) {

  @Bean
  fun staticRouterFunction(): RouterFunction<*> =
      resources("/**", ClassPathResource("static/"))

  @Bean
  fun alsoAPIRouterFunction(): RouterFunction<ServerResponse> =
      nest(path("/api"),
          nest(path("/pod"),
              route(GET("/event"), podGetEventHandler())
                  .andNest(path("/member/{id}"),
                      route(POST("/avatar"), saveImageHandler())
                          .andRoute(GET("/event"), podMemberGetEventHandler())
                  ))
      )

  private fun saveImageHandler() = HandlerFunction {
    ServerResponse.ok()
        .body(imageHandler.saveImage(it.body(BodyExtractors.toParts())), String::class.java)
  }

  private fun podMemberGetEventHandler() = HandlerFunction {
    ServerResponse.ok()
        .contentType(MediaType.APPLICATION_STREAM_JSON)
        .body(fromPublisher(preBuiltPodHandler.allPodMemberEvents(it.pathVariable("id")), Event::class.java))
  }

  private fun podGetEventHandler() = HandlerFunction {
    ServerResponse.ok()
        .contentType(MediaType.APPLICATION_STREAM_JSON)
        .body(fromPublisher(preBuiltPodHandler.allPodEvents(), Event::class.java))
  }
}