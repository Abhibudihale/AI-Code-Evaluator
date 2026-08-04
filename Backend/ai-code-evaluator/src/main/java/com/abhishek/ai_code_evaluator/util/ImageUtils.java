package com.abhishek.ai_code_evaluator.util;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;

public class ImageUtils {

    public static String encodeImage(byte[] imageBytes) {
        return Base64.getEncoder().encodeToString(imageBytes);
    }
}
