package com.abhishek.ai_code_evaluator.service;

import com.abhishek.ai_code_evaluator.config.AppConfig;
import com.abhishek.ai_code_evaluator.dto.EvaluationResponse;
import com.abhishek.ai_code_evaluator.util.GeminiResponseParser;
import com.abhishek.ai_code_evaluator.util.ImageUtils;
import com.abhishek.ai_code_evaluator.util.PromptBuilder;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EvaluationService {

    private static final Logger log = LoggerFactory.getLogger(EvaluationService.class);

    private final AppConfig config;
    private final ProblemService problemService;

    private final HttpClient client = HttpClient.newHttpClient();
    private final Gson gson = new Gson();

    public EvaluationResponse evaluate(int problemId,
                                       byte[] imageBytes) throws Exception {

        log.info("Fetching problem statement for problemId: {}", problemId);
        String problem = problemService.getProblem(problemId);

        log.info("Building evaluation prompt...");
        String prompt = PromptBuilder.buildEvaluationPrompt(problem);

        log.info("Encoding image to Base64 (image length: {} bytes)...", imageBytes.length);
        String base64Image = ImageUtils.encodeImage(imageBytes);

        Map<String, Object> request = Map.of(
                "contents", new Object[]{
                        Map.of(
                                "parts", new Object[]{
                                        Map.of(
                                                "text",
                                                prompt
                                        ),
                                        Map.of(
                                                "inlineData",
                                                Map.of(
                                                        "mimeType",
                                                        "image/jpeg",
                                                        "data",
                                                        base64Image
                                                )
                                        )
                                }
                        )
                }
        );

        String url = "https://generativelanguage.googleapis.com/v1beta/models/"
                + config.getModel()
                + ":generateContent?key="
                + config.getApiKey();

        log.info("Sending request to Gemini API model: {}", config.getModel());

        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(new URI(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(gson.toJson(request)))
                .build();

        HttpResponse<String> response =
                client.send(
                        httpRequest,
                        HttpResponse.BodyHandlers.ofString()
                );

        log.info("Received Gemini HTTP response status: {}", response.statusCode());
        log.debug("Gemini raw response body: {}", response.body());

        if (response.statusCode() != 200) {
            log.error("Gemini API Error (HTTP {}): {}", response.statusCode(), response.body());
        }

        EvaluationResponse evaluationResult = GeminiResponseParser.parseEvaluation(response.body());
        log.info("Successfully parsed evaluation result: pass={}, score={}",
                evaluationResult.isPass(), evaluationResult.getScore());

        return evaluationResult;
    }

}