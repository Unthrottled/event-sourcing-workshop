package io.acari.event.source.rest;

import io.acari.event.source.handler.PodHandler;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@NoArgsConstructor
@RestController("/api/pod")
public class PodRestController {
  private PodHandler podHandler;

}
