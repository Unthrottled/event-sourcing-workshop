package io.acari.event.source.flux

import com.mongodb.reactivestreams.client.Success
import com.mongodb.reactivestreams.client.gridfs.AsyncInputStream
import org.reactivestreams.Publisher
import org.springframework.core.io.buffer.DataBuffer
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.nio.ByteBuffer

/**
 * Forged in the flames of battle by alex.
 */
class FluxAsyncInputStream(source: Flux<DataBuffer>) : AsyncInputStream {

    private val source: NonBlockingIterableFlux<DataBuffer> = NonBlockingIterableFlux(source)

    /**
     * Reads a sequence of bytes from this stream into the given buffer.
     *
     * @param dst      the destination buffer
     * @return a publisher with a single element, the total number of bytes read into the buffer, or
     * `-1` if there is no more data because the end of the stream has been reached.
     */
    override fun read(dst: ByteBuffer): Publisher<Int> {
        return this.source.takeNext()
                .map { dataBuffer ->
                    val bytesToReadCount = dataBuffer.readableByteCount()
                    dst.put(dataBuffer.asByteBuffer())
                    if (bytesToReadCount <= 0) -1 else bytesToReadCount
                }.defaultIfEmpty(-1)
    }

    /**
     * Closes the input stream
     *
     * @return a publisher with a single element indicating when the stream has been closed
     */
    override fun close(): Publisher<Success> {
        this.source.dispose()
        return Mono.just(Success.SUCCESS)
    }

}
