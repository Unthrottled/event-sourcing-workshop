package io.acari.springwebflux.mono

import reactor.core.publisher.MonoSink

/**
 * Forged in the flames of battle by alex.
 */
class MonoSinkHelper<T>(private val monoSink: MonoSink<T>) {
    var isDisposed = false
        private set

    init {
        monoSink.onDispose { this.disposed() }
    }

    fun success() {
        this.monoSink.success()
    }

    fun success(t: T) {
        this.monoSink.success(t)
    }

    fun error(t: Throwable) {
        this.monoSink.error(t)
    }

    private fun disposed() {
        isDisposed = true
    }
}

