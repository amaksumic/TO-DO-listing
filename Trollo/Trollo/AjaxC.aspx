<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <meta name="viewport" content="width=device-width" />
    <title></title>
</head>
<body>
    <div>
        <form runat ="server">
            <asp:Calendar ID="Calendar1" runat="server"
            TargetControlID="Date1"
            CssClass="ClassName"
            Format="MMMM d, yyyy"
            PopupButtonID="Image1" />


        </form>
    </div>
</body>
</html>
