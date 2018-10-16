package io.acari.event.source.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PersonalInformation implements Contactable {
    private List<Interest> interests = new ArrayList<>();
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
