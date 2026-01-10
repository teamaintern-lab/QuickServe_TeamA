package com.quickservice.util;

import at.favre.lib.crypto.bcrypt.BCrypt;

public class GenerateBCryptPassword {
    public static void main(String[] args) {
        String plainPassword = "admin123";
        String hash = BCrypt.withDefaults()
                .hashToString(12, plainPassword.toCharArray());

        System.out.println(hash);
    }
}
