package com.abhishek.ai_code_evaluator.service;


import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ProblemService {

    private final Map<Integer, String> problems = new HashMap<>();

    public ProblemService() {

        problems.put(1, """
                Title: Two Sum

                Problem:
                Given an integer array nums and an integer target,
                return indices of the two numbers such that they add up to target.

                Exactly one valid answer exists.
                You may not use the same element twice.
                Return the answer in any order.
                """);

        problems.put(167, """
                Title: Two Sum II - Input Array Is Sorted

                Problem:
                Given a 1-indexed array of integers numbers that is already sorted
                in non-decreasing order, find two numbers such that they add up to
                a specific target number.

                Return the indices of the two numbers (1-indexed).

                Exactly one solution exists.

                You must use only constant extra space.
                """);

        problems.put(704, """
                Title: Binary Search

                Problem:
                Given a sorted array of integers nums and an integer target,
                return the index of target if it exists.
                Otherwise return -1.

                Your algorithm must run in O(log n).
                """);

        problems.put(121, """
                Title: Best Time to Buy and Sell Stock

                Problem:
                Given an array prices where prices[i] is the price of a stock
                on day i.

                Return the maximum profit you can achieve by buying once
                and selling once.

                If no profit is possible return 0.
                """);
    }

    public String getProblem(int problemId) {

        return problems.getOrDefault(
                problemId,
                "Unknown Problem. Evaluate the algorithm using general DSA principles."
        );
    }

}