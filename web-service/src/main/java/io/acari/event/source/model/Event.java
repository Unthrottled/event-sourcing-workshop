package io.acari.event.source.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.MissingNode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    private String type;
    @Builder.Default
    private JsonNode payload = MissingNode.getInstance();
    @Builder.Default
    private JsonNode meta = MissingNode.getInstance();
    @Builder.Default
    private boolean error = false;
}
