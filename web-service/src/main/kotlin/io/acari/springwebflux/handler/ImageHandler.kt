package io.acari.springwebflux.handler

import com.mongodb.reactivestreams.client.gridfs.GridFSBucket
import io.acari.springwebflux.flux.DownloadStreamToFluxFactory
import io.acari.springwebflux.flux.FluxAsyncStreamConverter
import io.acari.springwebflux.models.Identifier
import org.bson.types.ObjectId
import org.springframework.http.codec.multipart.Part
import org.springframework.stereotype.Component
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

/**
 * Forged in the flames of battle by alex.
 */
@Component
class ImageHandler(private val gridFSBucket: GridFSBucket) {
    private val downloadStreamToFluxFactory = DownloadStreamToFluxFactory()

    fun saveImage(multipartFile: Flux<Part>): Flux<String> {
        return multipartFile
                .flatMap { part ->
                    Mono.from(gridFSBucket.uploadFromStream(part.name(),
                            FluxAsyncStreamConverter.convert(part.content())))
                }
                .map { it.toHexString() }
    }

    fun fetchImage(imageId: String): Flux<ByteArray> {
        return downloadStreamToFluxFactory
                .convert(gridFSBucket.openDownloadStream(getId(imageId)))

    }

    fun removeImage(imageId: String): Mono<Boolean> {
        return Mono
                .from(gridFSBucket.delete(getId(imageId)))
                .map { Objects.nonNull(it) }
                .onErrorReturn(false)
    }

    fun findAllNames(): Flux<Identifier> {
        return Flux.from(gridFSBucket.find())
                .map { it.getId() }
                .map { it.asObjectId() }
                .map { it.getValue() }
                .map { it.toHexString() }
                .map { Identifier(it) }

    }

    private fun getId(imageId: String): ObjectId = ObjectId(imageId)

}


