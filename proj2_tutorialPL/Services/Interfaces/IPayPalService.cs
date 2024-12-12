using System.Threading.Tasks;
using proj2_tutorialPL.Models;

namespace proj2_tutorialPL.Services.Interfaces
{
    public interface IPayPalService
    {
        Task<PayPalOrderResponse> CreateOrder(PayPalOrderRequest orderRequest);
        Task<PayPalOrderResponse> CaptureOrder(string orderId);
    }
}
