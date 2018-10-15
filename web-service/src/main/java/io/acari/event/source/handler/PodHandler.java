package io.acari.event.source.handler;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.acari.event.source.models.*;
import io.acari.event.source.repository.PodMemberRepository;
import io.acari.event.source.repository.PodRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
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
        return podRepository.allPodEvents()
                .collect(HashSet<String>::new,
                        (podMembers, podEvent) -> {
                            try {
                                BasePodMemberPayload basePodMemberPayload = objectMapper.treeToValue(podEvent.getPayload(), BasePodMemberPayload.class);
                                if (EventsKt.POD_MEMBER_DELETED.equals(podEvent.getType())) {
                                    podMembers.remove(basePodMemberPayload.getIdentifier());
                                } else {
                                    podMembers.add(basePodMemberPayload.getIdentifier());
                                }
                            } catch (JsonProcessingException e) {
                                e.printStackTrace();
                            }
                        }, Set::addAll).stream().map(Identifier::new);
    }

    public Optional<PersonalInformation> projectPersonalInformation(String podMemberIdentifier) {
        return Optional.empty();
    }

    public Optional<Event> savePodMemberEvent(String podMemberIdentifier, Event eventToSave) {
        return podMemberRepository.saveEvent(podMemberIdentifier, eventToSave);
    }

    /**
     * Accepts a String which is literally just JSON.
     * I ran into an issue of not being able to create a JSONNode from
     * the REST endpoint. ¯\_(ツ)_/¯
     * <p>
     * But this works!
     */
    public Optional<String> savePodEvent(String eventAsJson) {
        return podRepository.saveEvent(eventAsJson);
    }


}
