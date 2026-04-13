package com.minsat.help;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/help")
@PreAuthorize("hasAnyRole('DFI','DSC','IN','ADMIN')")
public class HelpController {

    private final HelpRepository helpRepository;

    public HelpController(HelpRepository helpRepository) {
        this.helpRepository = helpRepository;
    }

    @GetMapping("/sc")
    public ResponseEntity<List<Map<String, Object>>> getServiceClasses() {
        return ResponseEntity.ok(helpRepository.getServiceClasses());
    }

    @GetMapping("/ua")
    public ResponseEntity<List<Map<String, Object>>> getUaGroups() {
        return ResponseEntity.ok(helpRepository.getUaGroups());
    }

    @GetMapping("/si")
    public ResponseEntity<List<Map<String, Object>>> getServiceIdentifiers() {
        return ResponseEntity.ok(helpRepository.getServiceIdentifiers());
    }

    @GetMapping("/offer")
    public ResponseEntity<List<Map<String, Object>>> getOffers() {
        return ResponseEntity.ok(helpRepository.getOffers());
    }

    @GetMapping("/uc")
    public ResponseEntity<List<Map<String, Object>>> getUsageCounters() {
        return ResponseEntity.ok(helpRepository.getUsageCounters());
    }
}
