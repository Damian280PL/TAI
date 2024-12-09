using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using proj2_tutorialPL.Models;
using proj2_tutorialPL.Services.Interfaces;

public class PayPalService : IPayPalService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public PayPalService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<PayPalOrderResponse> CreateOrder(PayPalOrderRequest orderRequest)
    {
        if (orderRequest == null)
        {
            throw new ArgumentNullException(nameof(orderRequest), "Order request cannot be null.");
        }

        string url = $"{_configuration["PayPal:BaseUrl"]}/v2/checkout/orders";

        string accessToken = await GetAccessToken();
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        var requestContent = new StringContent(JsonSerializer.Serialize(orderRequest), Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync(url, requestContent);

        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            throw new Exception($"Error creating PayPal order: {errorContent}");
        }

        var responseBody = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<PayPalOrderResponse>(responseBody)
            ?? throw new Exception("Failed to deserialize PayPal order response.");
    }

    public async Task<PayPalOrderResponse> CaptureOrder(string orderId)
    {
        if (string.IsNullOrWhiteSpace(orderId))
        {
            throw new ArgumentException("Order ID cannot be null or empty.", nameof(orderId));
        }

        string url = $"{_configuration["PayPal:BaseUrl"]}/v2/checkout/orders/{orderId}/capture";

        string accessToken = await GetAccessToken();
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        var response = await _httpClient.PostAsync(url, null);

        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            throw new Exception($"Error capturing PayPal order: {errorContent}");
        }

        var responseBody = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<PayPalOrderResponse>(responseBody)
            ?? throw new Exception("Failed to deserialize PayPal capture response.");
    }

    private async Task<string> GetAccessToken()
    {
        string clientId = _configuration["PayPal:ClientId"] ?? throw new Exception("PayPal ClientId is not configured.");
        string clientSecret = _configuration["PayPal:ClientSecret"] ?? throw new Exception("PayPal ClientSecret is not configured.");

        var authRequest = new HttpRequestMessage(HttpMethod.Post, $"{_configuration["PayPal:BaseUrl"]}/v1/oauth2/token")
        {
            Content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_type", "client_credentials")
            })
        };

        var basicAuth = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{clientId}:{clientSecret}"));
        authRequest.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", basicAuth);

        var authResponse = await _httpClient.SendAsync(authRequest);
        if (!authResponse.IsSuccessStatusCode)
        {
            throw new Exception($"Failed to retrieve PayPal access token: {await authResponse.Content.ReadAsStringAsync()}");
        }

        var authContent = await authResponse.Content.ReadAsStringAsync();
        var authResult = JsonSerializer.Deserialize<PayPalAuthResponse>(authContent);

        return authResult?.AccessToken ?? throw new Exception("Failed to retrieve PayPal access token.");
    }
}
