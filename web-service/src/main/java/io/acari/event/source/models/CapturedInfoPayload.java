package io.acari.event.source.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CapturedInfoPayload {
    private String value;
    private String field;
}
