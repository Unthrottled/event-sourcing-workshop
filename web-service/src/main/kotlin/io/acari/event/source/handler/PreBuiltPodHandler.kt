package io.acari.event.source.handler

import io.acari.event.source.models.Event
import io.acari.event.source.repository.PodMemberRepository
import io.acari.event.source.repository.PodRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux

/**
 * This is not the class you are looking for
 */
@Service
class PreBuiltPodHandler(
    private val podMemberRepository: PodMemberRepository,
    private val podRepository: PodRepository
){

  fun allPodMemberEvents(podMemberIdentifier: String): Flux<Event> =
      podMemberRepository.fetchPodMemberEventStream(podMemberIdentifier)

  fun allPodEvents(): Flux<Event> =
      podRepository.allPodEvents()
}