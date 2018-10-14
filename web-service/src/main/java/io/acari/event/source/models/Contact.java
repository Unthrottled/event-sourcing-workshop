package io.acari.event.source.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Contact implements Contactable {
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
