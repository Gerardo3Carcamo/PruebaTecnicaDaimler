using PruebaTecnicaBackend.Controllers.Models;

namespace PruebaTecnicaBackend.Controllers.Methods
{
    public class LoginMethods
    {
        public static string GetMainModuleUser(User user)
        {
            switch(user.RoleId)
            {
                case 1:
                    return "pages/dashboard"; 
                case 2:
                    return "pages/attend-appointment"; 
                case 3:
                    return "pages/appointments";
                default:
                    return "";

            }
        }
    }
}
