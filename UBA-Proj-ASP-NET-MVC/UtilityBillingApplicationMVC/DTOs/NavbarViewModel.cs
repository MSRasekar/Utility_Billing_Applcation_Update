#nullable disable


namespace UtilityBillingApplicationMVC.DTOs
{
    public class NavbarViewModel
    {
        public bool IsLoggedIn { get; set; }
        public string UserRole { get; set; }

        public LoginViewModel Login { get; set; }

        public SignUpViewModel SignUp { get; set; }

    }
}
