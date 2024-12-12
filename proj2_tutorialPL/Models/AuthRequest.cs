using Refit;

namespace proj2_tutorialPL.Models
{
    public class AuthRequest
    {
        [AliasAs("grant_type")]
        public string GrantType { get; set; } = "client_credentials";

        [AliasAs("client_id")]
        public string ClientId { get; set; }

        [AliasAs("client_secret")]
        public string ClientSecret { get; set; }
    }

}
