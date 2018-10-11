package io.acari.springwebflux

import reactor.core.publisher.Flux

/**
 * Forged in the flames of battle by alex.
 */

object ReactorBasics {
    fun main(args: Array<String>) {
        val pod = Flux.fromIterable(("Alex Java,Functional_Programming,Javascript,Fixing_bugs,Fun_Commit_Messages;" +
                "Steve Cobol,Ada,Java,Groovy,Pineapples,Sunday_Mornings;" +
                "Amy Javascript,HTML,CSS,Spiders,Assembly;" +
                "Chad PHP,Java,Ruby,Purple_Stuff,Anime;" +
                "Mira Python,Ruby,Whitespaces,Java,Lombok,Curly_Brace_Placement")
                .split(";"))
                .map { podMemberInfo ->
                    val split = podMemberInfo.split(" ".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
                    PodMember(split[0], Interests(split[1].split(",")))
                }

    }
}

data class PodMember(val name: String, val interests: Interests)
data class Interests(val coreInterests: List<String>)