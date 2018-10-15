package io.acari.event.source.models;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.MissingNode;
import lombok.Builder;

public class Event {
    private String type;
    @Builder.Default
    private JsonNode payload = MissingNode.getInstance();
    @Builder.Default
    private JsonNode meta = MissingNode.getInstance();
    @Builder.Default
    private boolean error = false;

    @java.beans.ConstructorProperties({"type", "payload", "meta", "error"})
    public Event(String type, JsonNode payload, JsonNode meta, boolean error) {
        this.type = type;
        this.payload = payload;
        this.meta = meta;
        this.error = error;
    }

    public Event() {
    }

    public static EventBuilder builder() {
        return new EventBuilder();
    }

    public String getType() {
        return this.type;
    }

    public JsonNode getPayload() {
        return this.payload;
    }

    public JsonNode getMeta() {
        return this.meta;
    }

    public boolean isError() {
        return this.error;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setPayload(JsonNode payload) {
        this.payload = payload;
    }

    public void setMeta(JsonNode meta) {
        this.meta = meta;
    }

    public void setError(boolean error) {
        this.error = error;
    }

    public boolean equals(Object o) {
        if (o == this) return true;
        if (!(o instanceof Event)) return false;
        final Event other = (Event) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$type = this.getType();
        final Object other$type = other.getType();
        if (this$type == null ? other$type != null : !this$type.equals(other$type)) return false;
        final Object this$payload = this.getPayload();
        final Object other$payload = other.getPayload();
        if (this$payload == null ? other$payload != null : !this$payload.equals(other$payload)) return false;
        final Object this$meta = this.getMeta();
        final Object other$meta = other.getMeta();
        if (this$meta == null ? other$meta != null : !this$meta.equals(other$meta)) return false;
        if (this.isError() != other.isError()) return false;
        return true;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $type = this.getType();
        result = result * PRIME + ($type == null ? 43 : $type.hashCode());
        final Object $payload = this.getPayload();
        result = result * PRIME + ($payload == null ? 43 : $payload.hashCode());
        final Object $meta = this.getMeta();
        result = result * PRIME + ($meta == null ? 43 : $meta.hashCode());
        result = result * PRIME + (this.isError() ? 79 : 97);
        return result;
    }

    protected boolean canEqual(Object other) {
        return other instanceof Event;
    }

    public String toString() {
        return "Event(type=" + this.getType() + ", payload=" + this.getPayload() + ", meta=" + this.getMeta() + ", error=" + this.isError() + ")";
    }

    public static class EventBuilder {
        private String type;
        private JsonNode payload;
        private JsonNode meta;
        private boolean error;

        EventBuilder() {
        }

        public Event.EventBuilder type(String type) {
            this.type = type;
            return this;
        }

        public Event.EventBuilder payload(JsonNode payload) {
            this.payload = payload;
            return this;
        }

        public Event.EventBuilder meta(JsonNode meta) {
            this.meta = meta;
            return this;
        }

        public Event.EventBuilder error(boolean error) {
            this.error = error;
            return this;
        }

        public Event build() {
            return new Event(type, payload, meta, error);
        }

        public String toString() {
            return "Event.EventBuilder(type=" + this.type + ", payload=" + this.payload + ", meta=" + this.meta + ", error=" + this.error + ")";
        }
    }
}
