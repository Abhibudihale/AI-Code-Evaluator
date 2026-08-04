package com.abhishek.ai_code_evaluator.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleAllExceptions(Exception ex) {
        log.error(">>> ERROR in AI Code Evaluator Backend: ", ex);

        Map<String, Object> errorBody = Map.of(
                "pass", false,
                "score", 0,
                "feedback", "Backend Error: " + (ex.getMessage() != null ? ex.getMessage() : ex.toString()),
                "message", ex.getMessage() != null ? ex.getMessage() : ex.toString()
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
    }
}
