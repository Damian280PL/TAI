using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PayPalCheckoutSdk.Core;
using PayPalCheckoutSdk.Orders;
using PayPalHttp;
using proj2_tutorialPL; // Przestrzeń nazw DbTestContext
using proj2_tutorialPL.Models; // Modele Rent, Product, Driver

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly string clientId = "AdWl5SeBaJZeX0i2B4pJJ6uJSU_Zx3dU6Nxg1PFNmPDf7I5umURxURIUKxMdUZRIe1xDnCl_AvGD-LeM";
    private readonly string secret = "EGr4kZLtAP8T6L4JVZ1aTYJ2DxeDgf3ViTCJ4Dboalmo9Zl_fkxjRf2qpBSd26OvFDn_mQPumwIKQg4j";
    private readonly DbTestContext _context;

    public PaymentController(DbTestContext context)
    {
        _context = context;
    }

    private PayPalHttpClient GetPayPalClient()
    {
        var environment = new SandboxEnvironment(clientId, secret);
        return new PayPalHttpClient(environment);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateOrder([FromBody] decimal totalAmount)
    {
        var request = new OrdersCreateRequest();
        request.Prefer("return=representation");
        request.RequestBody(new OrderRequest
        {
            CheckoutPaymentIntent = "CAPTURE",
            PurchaseUnits = new List<PurchaseUnitRequest>
            {
                new PurchaseUnitRequest
                {
                    AmountWithBreakdown = new AmountWithBreakdown
                    {
                        CurrencyCode = "USD",
                        Value = totalAmount.ToString("F2")
                    }
                }
            },
            ApplicationContext = new ApplicationContext
            {
                ReturnUrl = "http://localhost:3000/success",
                CancelUrl = "http://localhost:3000/cancel"
            }
        });

        try
        {
            var response = await GetPayPalClient().Execute(request);
            var result = response.Result<Order>();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }
 

    [HttpPost("capture")]
    public async Task<IActionResult> CaptureOrder([FromBody] CaptureOrderRequest captureRequest)
    {
        var request = new OrdersCaptureRequest(captureRequest.OrderId);
        request.RequestBody(new OrderActionRequest());

        try
        {
            var response = await GetPayPalClient().Execute(request);
            var result = response.Result<Order>();

            // Aktualizuj status zamówienia Rent na "opłacony"
            var rent = await _context.Rents.FirstOrDefaultAsync(r => r.Id == captureRequest.RentId);
            if (rent != null)
            {
                rent.Status = "opłacony";
                _context.Rents.Update(rent);
                await _context.SaveChangesAsync();
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }

    [HttpGet("order-details/{rentId}")]
    public async Task<IActionResult> GetOrderDetails(int rentId)
    {
        var rent = await _context.Rents
            .Include(r => r.Driver)
            .Include(r => r.Product)
            .FirstOrDefaultAsync(r => r.Id == rentId);

        if (rent == null)
        {
            return NotFound("Rent not found.");
        }

        var orderDetails = new
        {
            RentId = rent.Id,
            DriverEmail = rent.Driver.Email,
            DriverPhone = rent.Driver.Phone,
            DriverFirstName = rent.Driver.FirstName,
            DriverLastName = rent.Driver.LastName,
            ProductName = rent.Product.Name,
            RentalCost = rent.RentalCost
        };

        return Ok(orderDetails);
    }

    // Metoda do opłacania zamówień z panelu użytkownika
    [HttpPost("pay-from-panel")]
    public async Task<IActionResult> PayFromPanel([FromBody] PanelPaymentRequest panelPaymentRequest)
    {
        var rent = await _context.Rents.FirstOrDefaultAsync(r => r.Id == panelPaymentRequest.RentId);

        if (rent == null)
        {
            return NotFound("Rent not found.");
        }

        if (rent.Status == "opłacony")
        {
            return BadRequest("This order is already paid.");
        }

        var request = new OrdersCreateRequest();
        request.Prefer("return=representation");
        request.RequestBody(new OrderRequest
        {
            CheckoutPaymentIntent = "CAPTURE",
            PurchaseUnits = new List<PurchaseUnitRequest>
            {
                new PurchaseUnitRequest
                {
                    AmountWithBreakdown = new AmountWithBreakdown
                    {
                        CurrencyCode = "",
                        Value = rent.RentalCost.ToString("F2")
                    },
                    Description = $"Payment for Rent ID: {rent.Id}"
                }
            },
            ApplicationContext = new ApplicationContext
            {
                ReturnUrl = "http://localhost:3000/success",
                CancelUrl = "http://localhost:3000/cancel"
            }
        });

        try
        {
            var response = await GetPayPalClient().Execute(request);
            var result = response.Result<Order>();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }
}

// Modele do zapytań
public class CaptureOrderRequest
{
    public string OrderId { get; set; }
    public int RentId { get; set; }
}

public class PanelPaymentRequest
{
    public int RentId { get; set; }
}
