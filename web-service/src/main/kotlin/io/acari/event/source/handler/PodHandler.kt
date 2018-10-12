package io.acari.event.source.handler

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import io.acari.event.source.models.Event
import io.acari.event.source.models.Identifier
import io.acari.event.source.models.PersonalInformation
import io.acari.springwebflux.models.*
import io.acari.event.source.repository.PodMemberRepository
import io.acari.event.source.repository.PodRepository
import org.reactivestreams.Publisher
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.core.publisher.toMono
import java.util.*

/**
 * Forged in the flames of battle by alex.
 */
@Service
class PodHandler(
    private val podRepository: PodRepository,
    private val podMemberRepository: PodMemberRepository,
    private val imageHandler: ImageHandler) {

  private val objectMapper = jacksonObjectMapper()
      .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)

  fun projectAllPodMembers(): Flux<Identifier> =
      Flux.empty()

  fun projectPersonalInformation(podMemberIdentifier: String): Mono<PersonalInformation> {
    return PersonalInformation().toMono()
  }

  fun fetchAvatar(podMemberIdentifier: String): Flux<ByteArray> =
      Flux.empty()

  fun savePodMemberEvent(podMemberIdentifier: String, bodyToMono: Mono<Event>): Publisher<Event> =
      bodyToMono

  /**
   * Accepts a String which is literally just JSON.
   * I ran into an issue of not being able to create a JSONNode from
   * the functional endpoint. ¯\_(ツ)_/¯
   *
   * But this works!
   */
  fun savePodEvent(bodyToMono: Mono<String>): Publisher<String> =
      bodyToMono
}