package io.acari.springwebflux.flux

import io.acari.springwebflux.mono.MonoSinkHelper
import reactor.core.Disposable
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.core.publisher.MonoSink
import java.util.*
import java.util.function.Consumer

/**
 * Forged in the flames of battle by alex.
 */

class NonBlockingIterableFlux<T>
/**
 * Stateful class, which allows for non-blocking
 * sequential access to items in provided flux stream.
 *
 *
 * It is a hot observable that buffers when it has
 * backpressure. It guarantees that all items where delivered
 * to somebody.
 *
 * @param source non-null flux source.
 */
(private val source: Flux<T>) : Disposable {
    private val itemBuffer = LinkedList<T>()
    private val callables = LinkedList<MonoSinkHelper<T>>()
    private lateinit var subscription: Disposable
    private var complete = false

    /**
     * Cancel or dispose the underlying task or resource.
     */
    override fun dispose() {
        subscription.dispose()
        callables.forEach { it.success() }
    }

    /**
     * Think of this like a "Take a Number" queue.
     * When you `takeNext()` you are essentially asking
     * to be served when your number is called.
     * The order at which this is called determines what
     * item you get in the flux, ie the first call get the first element
     * and the second call gets the second item in the flux.
     *
     *
     * Some people ahead of you may leave, that's okay,
     * because you will get their item.
     *
     *
     * If you take a number that cannot fulfilled
     * (the flux handed out all of it's items),
     * you will be notified by an empty return.
     *
     * @return An item in the flux based off of the current queue of callbacks.
     * or nothing if the flux has completeStream out of items.
     */
    fun takeNext(): Mono<T> =
            if (complete && itemBuffer.isEmpty()) {
                Mono.empty()
            } else if (itemBuffer.isEmpty()) {
                createCallback()
            } else {
                Mono.just(itemBuffer.poll())
            }

    private fun createCallback(): Mono<T> {
        val tConsumer = Consumer { tMonoSink: MonoSink<T> ->
            if (itemBuffer.isEmpty())
                callables.offer(MonoSinkHelper(tMonoSink))
            else
                tMonoSink.success(itemBuffer.pollFirst())

        }
        return Mono.create(tConsumer)
                .doOnSubscribe { subscribble() }
    }

    private fun jettisonNextItem(a: T) {
        if (callables.isEmpty()) {
            bufferItem(a)
        } else {
            emitToNextSubscribedCaller(a)
        }
    }

    private fun bufferItem(a: T) {
        itemBuffer.offer(a)
    }

    private fun emitToNextSubscribedCaller(a: T) {
        val nextPersonInLine = callables.poll()
        if (nextPersonInLine.isDisposed) {
            jettisonNextItem(a)
        } else {
            nextPersonInLine.success(a)
        }
    }


    private fun subscribble() {
        if (!this::subscription.isInitialized) {
            subscription = source.subscribe({ jettisonNextItem(it) },
                    { accept(it) },
                    { completeStream() })

        }
    }


    private fun accept(b: Throwable) {
        callables.forEach { callable -> callable.error(b) }
    }

    private fun completeStream() {
        callables.forEach { it.success() }
        complete = true
    }

}
