package com.abhishek.ai_code_evaluator.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationResponse {

    /**
     * True if the algorithm is logically correct.
     * Syntax/OCR mistakes should not affect this.
     */
    private boolean pass;

    /**
     * Score between 0 and 10.
     */
    private int score;

    /**
     * Short evaluation summary.
     */
    private String feedback;
}