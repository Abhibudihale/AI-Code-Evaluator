package com.abhishek.ai_code_evaluator.controller;

import com.abhishek.ai_code_evaluator.dto.EvaluationResponse;
import com.abhishek.ai_code_evaluator.service.EvaluationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/ocr")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EvaluationController {

    private static final Logger log = LoggerFactory.getLogger(EvaluationController.class);
    private final EvaluationService evaluationService;

    @PostMapping("/evaluate")
    public EvaluationResponse evaluate(
            @RequestParam Integer problemId,
            @RequestParam MultipartFile file) throws Exception {

        log.info(">>> Received Evaluation Request: problemId={}, fileName={}, size={} bytes",
                problemId, file.getOriginalFilename(), file.getSize());

        EvaluationResponse response = evaluationService.evaluate(
                problemId,
                file.getBytes()
        );

        log.info("<<< Completed Evaluation: pass={}, score={}", response.isPass(), response.getScore());
        return response;
    }

}