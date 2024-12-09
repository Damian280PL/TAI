using System.Collections.Generic;

namespace proj2_tutorialPL.Models
{
    public class PayPalOrderResponse
    {
        public string Id { get; set; }
        public string Status { get; set; }
        public List<Link> Links { get; set; }
    }

    public class Link
    {
        public string Href { get; set; }
        public string Rel { get; set; }
        public string Method { get; set; }
    }
}
