package com.abhishek.ai_code_evaluator.util;


import com.abhishek.ai_code_evaluator.dto.EvaluationResponse;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class GeminiResponseParser {

    private static final Gson gson = new Gson();

    private GeminiResponseParser() {
    }

    public static EvaluationResponse parseEvaluation(String response) {

        JsonObject root = JsonParser.parseString(response).getAsJsonObject();

        // Handle Gemini API errors
        if (root.has("error")) {
            throw new RuntimeException(root.get("error").toString());
        }

        JsonArray candidates = root.getAsJsonArray("candidates");

        if (candidates == null || candidates.isEmpty()) {
            throw new RuntimeException("No response returned by Gemini.");
        }

        String text = candidates.get(0)
                .getAsJsonObject()
                .getAsJsonObject("content")
                .getAsJsonArray("parts")
                .get(0)
                .getAsJsonObject()
                .get("text")
                .getAsString();

        // Remove markdown if Gemini accidentally returns it
        text = text.replace("```json", "")
                   .replace("```", "")
                   .trim();

        return gson.fromJson(text, EvaluationResponse.class);
    }

}