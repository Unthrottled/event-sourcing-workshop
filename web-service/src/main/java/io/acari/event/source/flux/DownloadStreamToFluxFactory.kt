package io.acari.event.source.flux

import com.mongodb.reactivestreams.client.Success
import com.mongodb.reactivestreams.client.gridfs.GridFSDownloadStream
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import reactor.core.publisher.Flux
import reactor.core.publisher.FluxSink
import reactor.core.publisher.Mono
import java.nio.ByteBuffer

/**
 * Forged in the flames of battle by alex.
 */

class DownloadStreamToFluxFactory {

    fun convert(gridFSDownloadStream: GridFSDownloadStream): Flux<ByteArray> {
        return Flux.create { synchronousSink -> readStream(gridFSDownloadStream, synchronousSink) }
    }

    private fun readStream(gridFSDownloadStream: GridFSDownloadStream, synchronousSink: FluxSink<ByteArray>) {
        val allocate = ByteBuffer.allocate(512000)
        Mono.from(gridFSDownloadStream.read(allocate))
                .subscribe({ bytesRead ->
                    if (finishedReading(bytesRead)) {
                        Mono.from<Success>(gridFSDownloadStream.close())
                                .subscribe({}, {}, { synchronousSink.complete() })
                    } else {
                        synchronousSink.next(allocate.array())
                        readStream(gridFSDownloadStream, synchronousSink)
                    }
                }, { throwable ->
                    LOGGER.warn("Ohhh snap!", throwable)
                    synchronousSink.complete()
                })
    }

    private fun finishedReading(read: Int?): Boolean = read ?: -1 < 0

    companion object {
        private val LOGGER = loggerFor(DownloadStreamToFluxFactory::class.java)
    }
}

fun <T> loggerFor(clazz: Class<T>): Logger = LoggerFactory.getLogger(clazz)