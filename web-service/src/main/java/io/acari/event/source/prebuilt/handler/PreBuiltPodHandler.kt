package io.acari.event.source.prebuilt.handler

import com.fasterxml.jackson.databind.ObjectMapper
import io.acari.event.source.models.AvatarUploadedPayload
import io.acari.event.source.models.Event
import io.acari.event.source.models.EventTypes
import io.acari.event.source.repository.PodMemberRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux

/**
 * This is not the class you are looking for
 */
@Service
class PreBuiltPodHandler(
        private val podMemberRepository: PodMemberRepository,
        private val preBuiltPodRepository: PreBuiltPodRepository,
        private val imageHandler: ImageHandler,
        private val objectMapper: ObjectMapper
) {

    fun allPodMemberEvents(podMemberIdentifier: String): Flux<Event> =
            podMemberRepository.fetchPodMemberNonBlockingEventStream(podMemberIdentifier)

    fun allPodEvents(): Flux<Event> =
            preBuiltPodRepository.allPodEvents()

    fun fetchAvatar(podMemberIdentifier: String): Flux<ByteArray> =
            podMemberRepository.fetchPodMemberNonBlockingEventStream(podMemberIdentifier)
                    .filter { it.type == EventTypes.AVATAR_UPLOADED }
                    .reduce { _, u -> u }
                    .map { it.payload }
                    .map { objectMapper.treeToValue(it, AvatarUploadedPayload::class.java) }
                    .map { it.identifier }
                    .flatMapMany { imageHandler.fetchImage(it) }
}