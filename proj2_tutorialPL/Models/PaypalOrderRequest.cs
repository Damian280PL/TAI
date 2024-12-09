using System.ComponentModel.DataAnnotations;

public class PayPalOrderRequest
{
    public string Intent { get; set; } = "CAPTURE";

    [Required]
    public List<PayPalPurchaseUnit> PurchaseUnits { get; set; }

    public PayPalApplicationContext ApplicationContext { get; set; }
}

public class PayPalPurchaseUnit
{
    [Required]
    public PayPalAmount Amount { get; set; }

    public string Description { get; set; }
}

public class PayPalAmount
{
    [Required]
    public string CurrencyCode { get; set; }

    [Required]
    public string Value { get; set; }
}

public class PayPalApplicationContext
{
    public string ReturnUrl { get; set; }
    public string CancelUrl { get; set; }
    public string BrandName { get; set; }
    public string UserAction { get; set; }
}
