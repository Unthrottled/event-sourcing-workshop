package io.acari.springwebflux.flux

import com.mongodb.reactivestreams.client.gridfs.AsyncInputStream
import org.springframework.core.io.buffer.DataBuffer
import reactor.core.publisher.Flux

/**
 * Forged in the flames of battle by alex.
 */
object FluxAsyncStreamConverter {

    fun convert(source: Flux<DataBuffer>): AsyncInputStream {
        return FluxAsyncInputStream(source)
    }
}
