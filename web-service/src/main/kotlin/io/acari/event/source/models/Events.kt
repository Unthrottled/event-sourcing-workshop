package io.acari.event.source.models

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.MissingNode
import java.util.*

/**
 * Forged in the flames of battle by alex.
 */
data class Identifier(val _id: String)

interface Identifiable {
    val identifier: String
}

data class AvatarUploadedPayload(override val identifier: String): Identifiable

data class PersonalInformation(val interests: List<Interest> = Collections.emptyList(),
                               override var email: String = "",
                               override var firstName: String = "",
                               override var lastName: String = "",
                               override var phoneNumber: String = ""): Contactable

data class Contact(override var email: String = "", override var firstName: String = "", override var lastName: String = "", override var phoneNumber: String= ""): Contactable

interface Contactable {
    var email: String
    var firstName: String
    var lastName: String
    var phoneNumber: String
}

data class Interest(val id: String, val value: String)

data class CapturedInfoPayload(val value: String, val field: String)

interface HasPodMember {
    val identifier: String
}

data class BasePodMemberPayload(override val identifier: String): HasPodMember

const val POD_MEMBER_CREATED = "POD_MEMBER_CREATED"
const val POD_MEMBER_DELETED = "POD_MEMBER_DELETED"
const val PERSONAL_INFO_CAPTURED = "PERSONAL_INFO_CAPTURED"
const val AVATAR_UPLOADED = "AVATAR_UPLOADED"
const val INTEREST_CAPTURED = "INTEREST_CAPTURED"
const val INTEREST_REMOVED = "INTEREST_REMOVED"

data class Event(val type: String ="",
                 val payload: JsonNode = MissingNode.getInstance(),
                 val error: Boolean = false,
                 val meta: JsonNode = MissingNode.getInstance())