﻿namespace proj2_tutorialPL.Models
{
    public class AuthResponse
    {
        public string AccessToken { get; set; }
        public string TokenType { get; set; }
        public int ExpiresIn { get; set; }
    }

}
