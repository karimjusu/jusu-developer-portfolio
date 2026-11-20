package com.jusu.portfolio.contact;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final ContactMessageRepository repository;

    public ContactController(ContactMessageRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin(origins = "${portfolio.allowed-origin:http://localhost:5173}")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> create(@Valid @RequestBody ContactRequest request) {
        if (request.message().toLowerCase().contains("http://") || request.message().toLowerCase().contains("https://")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Links are not accepted in this message.");
        }
        repository.save(new ContactMessage(request.name().trim(), request.email().trim(), request.message().trim()));
        return Map.of("message", "Thank you. Your message has been received.");
    }
}