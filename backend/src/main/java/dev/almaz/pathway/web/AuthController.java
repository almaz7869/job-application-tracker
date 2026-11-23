package dev.almaz.pathway.web;

import dev.almaz.pathway.service.JwtService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Map;

@RestController @RequestMapping("/api/auth") public class AuthController {
    private final JwtService jwt;
    @Value("${app.auth.username:}") private String username;
    @Value("${app.auth.password:}") private String password;
    public AuthController(JwtService jwt) { this.jwt = jwt; }
    public record Login(@NotBlank String username, @NotBlank String password) {}
    @PostMapping("/login") public Map<String,String> login(@RequestBody @Valid Login login) {
        if (username == null || username.isBlank() || password == null || password.isBlank()
                || !username.equals(login.username()) || !password.equals(login.password()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        return Map.of("token", jwt.issue(username), "tokenType", "Bearer", "expiresIn", "3600");
    }
}
