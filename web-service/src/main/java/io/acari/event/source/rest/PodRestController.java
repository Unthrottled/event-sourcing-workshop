package io.acari.event.source.rest;

import io.acari.event.source.handler.PodHandler;
import io.acari.event.source.models.Identifier;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/pod")
public class PodRestController {
  private PodHandler podHandler;

  public PodRestController(PodHandler podHandler) {
    this.podHandler = podHandler;
  }

  @GetMapping("/members")
  public Stream<Identifier> getAllPodMembers() {
    return podHandler.projectAllPodMembers();
  }

  @PostMapping("/event")
  public Optional<String> savePodEvent(@RequestBody String event) {
    return podHandler.savePodEvent(event);
  }
}
