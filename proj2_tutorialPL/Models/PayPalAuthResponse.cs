﻿public class PayPalAuthResponse
{
    public string Scope { get; set; }
    public string AccessToken { get; set; }
    public string TokenType { get; set; }
    public string AppId { get; set; }
    public int ExpiresIn { get; set; }
    public string Nonce { get; set; }
}