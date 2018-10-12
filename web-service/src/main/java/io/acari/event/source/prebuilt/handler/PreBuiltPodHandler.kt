package io.acari.event.source.prebuilt.handler

import io.acari.event.source.models.Event
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux

/**
 * This is not the class you are looking for
 */
@Service
class PreBuiltPodHandler(
    private val podMemberRepository: PreBuiltPodMemberRepository,
    private val preBuiltPodRepository: PreBuiltPodRepository
){

  fun allPodMemberEvents(podMemberIdentifier: String): Flux<Event> =
      podMemberRepository.fetchPodMemberEventStream(podMemberIdentifier)

  fun allPodEvents(): Flux<Event> =
      preBuiltPodRepository.allPodEvents()
}