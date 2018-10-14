package io.acari.event.source.rest;

import io.acari.event.source.handler.PodHandler;
import io.acari.event.source.models.Event;
import io.acari.event.source.models.PersonalInformation;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/pod/member/{identifier}")
public class PodMemberRestController {
  private PodHandler podHandler;

  public PodMemberRestController(PodHandler podHandler) {
    this.podHandler = podHandler;
  }

  @GetMapping("/information")
  public Optional<PersonalInformation> getPodMemberInformation(@PathVariable("identifier") String id) {
    return podHandler.projectPersonalInformation(id);
  }

  @PostMapping("/event")
  public Optional<Event> savePodMemberEvent(@PathVariable("identifier") String id, @RequestBody Event eventToSave) {
    return podHandler.savePodMemberEvent(id, eventToSave);
  }
}
