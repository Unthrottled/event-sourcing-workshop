package io.acari.event.source.handler;


import com.fasterxml.jackson.databind.ObjectMapper;
import io.acari.event.source.models.Event;
import io.acari.event.source.models.Identifier;
import io.acari.event.source.models.PersonalInformation;
import io.acari.event.source.repository.PodMemberRepository;
import io.acari.event.source.repository.PodRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Stream;

@Service
public class PodHandler {
    private final PodRepository podRepository;
    private final PodMemberRepository podMemberRepository;
    private final ObjectMapper objectMapper;

    public PodHandler(PodRepository podRepository, PodMemberRepository podMemberRepository, ObjectMapper objectMapper) {
        this.podRepository = podRepository;
        this.podMemberRepository = podMemberRepository;
        this.objectMapper = objectMapper;
    }

    public Stream<Identifier> projectAllPodMembers() {
        return Stream.empty();
    }

    public Optional<PersonalInformation> projectPersonalInformation(String podMemberIdentifier) {
        return Optional.empty();
    }

    public Optional<Event> savePodMemberEvent(String podMemberIdentifier, Event eventToSave) {
        return Optional.of(eventToSave);
    }

    /**
     * Accepts a String which is literally just JSON.
     * I ran into an issue of not being able to create a JSONNode from
     * the REST endpoint. ¯\_(ツ)_/¯
     * <p>
     * But this works!
     */
    public Optional<String> savePodEvent(String eventAsJson) {
        return Optional.of(eventAsJson);
    }


}
