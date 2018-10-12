package io.acari.event.source.prebuilt.rest

import org.springframework.stereotype.Component
import org.springframework.web.server.ServerWebExchange
import org.springframework.web.server.WebFilter
import org.springframework.web.server.WebFilterChain
import reactor.core.publisher.Mono

/**
 * Forged in the flames of battle by alex.
 */
@Component
class RootForwarder : WebFilter {
    override fun filter(exchange: ServerWebExchange, chain: WebFilterChain): Mono<Void> {
        val request = exchange.request
        return if (request.uri.path == "/") {
            chain.filter(exchange.mutate().request(request.mutate().path("/index.html").build()).build())
        } else chain.filter(exchange)

    }
}
