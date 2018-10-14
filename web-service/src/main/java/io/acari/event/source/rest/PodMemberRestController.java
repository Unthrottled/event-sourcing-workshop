package io.acari.event.source.rest;

import io.acari.event.source.handler.PodHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pod/member/{identifier}")
public class PodMemberRestController {
  private PodHandler podHandler;

  public PodMemberRestController(PodHandler podHandler) {
    this.podHandler = podHandler;
  }
}
