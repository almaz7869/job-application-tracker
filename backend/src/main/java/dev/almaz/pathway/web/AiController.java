package dev.almaz.pathway.web;

import dev.almaz.pathway.service.AiService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.apache.tika.Tika;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {
    private final AiService ai;
    private final Tika tika = new Tika();

    public AiController(AiService ai) { this.ai = ai; }

    public record Request(@NotBlank String mode, String language,
                          @NotBlank @Size(max = 30000) String code) {}

    @PostMapping("/analyze")
    public Map<String, String> analyze(@RequestBody @Valid Request request) {
        return Map.of("analysis", ai.analyze(request.mode(),
                request.language() == null ? "Java" : request.language(), request.code()));
    }

    @PostMapping("/resume-match")
    public Map<String, String> resumeMatch(@RequestParam("jobDescription") @NotBlank String jobDescription,
                                           @RequestParam(value = "resume", required = false) MultipartFile resume) throws Exception {
        String resumeText = resume == null ? "No resume file uploaded; analyze only the supplied job description." : tika.parseToString(resume.getInputStream());
        String input = "Resume text:\n" + resumeText + "\n\nJob description:\n" + jobDescription;
        return Map.of("analysis", ai.analyze("Resume match: identify evidence-backed keyword gaps, matching strengths, and truthful improvement suggestions. Never invent experience.", "Resume", input));
    }
}
