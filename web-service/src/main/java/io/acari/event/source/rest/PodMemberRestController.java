package io.acari.event.source.rest;

import io.acari.event.source.handler.PodHandler;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@NoArgsConstructor
@RestController("/api/pod/member")
public class PodMemberRestController {
  private PodHandler podHandler;

}
