/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

var ps;

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
          <img
            alt="Task Management System Logo"  // Update the alt text to reflect the TMS
            className="navbar-brand-img"
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEBUTExIWFRIWGBgaGRgVGBoZHhkdGh4WGRgYHRsaHSggGhslGxsYIT0hJykrLjExFx8zODMtOygtLisBCgoKDg0OGxAQGy8mICUvLS8vLTctLS03MC0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUDBgcCAf/EAEMQAAIBAwMBBQYDBAcGBwAAAAECAwAEEQUSITEGE0FRYQciMnGBkRQjQmKCobEVM1KSssHRJENydKLwFzZEg9Lh8f/EABoBAQADAQEBAAAAAAAAAAAAAAABAgUDBAb/xAAyEQACAgEDAgQFBAEEAwAAAAAAAQIRAwQSITFBBRNRYSJCcYGxMpHR8OEUM0PxI6HB/9oADAMBAAIRAxEAPwDuFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUB4llVRlmCjzJA/nQCKZWGVYMPNSD/KgPdAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAj6heJDDJNIcJGrOx9FBJ+tSlfBDdKzjNrpcd7E+paj3jmaVlgiR9oCLnPJBwoI28Y+HPO6vXjg3LZE8OSaUd8+/REDUbeK0K3VgkkMsTAkNLvVl8QRtBxnGecYzXeenkou3f2OENRFyW1V9zuGi6klzbxTp8MiBgPLPVT6g5H0rNap0asXasm1BIoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgNO7S+0aztJjDtkmkX4xCAe79GJIGeRx4eOK6RxORynmjF0fNJ9p2lzkAymFj4TrtH1cEoP71HikhHNBkztH270+zHvyiRyARHFh2IPQ9dqg+ZIz4ZqIwbJlljE1DWdQ1nVLd4o7NbW1fGZLhypIBBHJwQDjwQ8ePn0ioRfW2cpSnNVVI862yL3VvGwaK3iSNSDkMQBvbPjk4+1aGlxuMW31Zm6rIpSSXRFVIgZSp6EEH5Hg16WrPOnTs+dme1GoabEIe4S4tlLEYJDjccnBGeMknG09etZ2XStuzRxatJUdB7Oe0LT7v3e87mXxjmwp464bO1voc+grySxyie2GaMjHq3tM0uAkCYzMPCBd4/vnCH+9RYpMSzwXc89m/aNZ3c/c7ZIZG+DvQoD+gIJwfQ9fCksUoqxDNGTo3KuZ1FAKAUAoBQCgFAKAUAoBQCgFAYL28jijMkrrHGvVnIAGSAMk9OSKlKyG6MR1W33xJ30e+Ybol3DMgAySo/UMc8UpizyNYtsSnv48QZ733h+XjOd/wDZ6Hr5UpjcgdZtcRHv48T8Re8PzM4xs/tdR086bWNyM993ndP3eO82Nsz03YO3P1xUIPocN7K7fwe4Z715HE7N8RcHcoJPO3ac48W3k9BjW06jbMfUOW1f3kk3VhFJ8aA+uOfuOa9Lgn1PMptEvs9Fb2YLRW6tcZ4mkO8oPJFxhT69fPNeeWlUny+PQ9EdU4rhc+pH1ntCCczzlm8ic4/dHC/wrovLx8I5SeTI7ZVR6+H/AKqCWQearn/DmqvURRZaeTEuulOZbeaMebKR/ixRaiLJenkiZZ6rDLwjjPkeD/Hr9K6xyRfc5SxyQvtMhl+NMnzHB+460lCMuojOUehktrCKP4EUeuOfuealQiuiIc5PuVfapl7tcZ70MNhX4s8HjHP/AN4rjnqjrgu+DvumiTuY+9wZdib8dN2Bux9c1jvqbi6ckmoJFAKAUAoBQCgFAKAUAoBQCgI9/ZRTRtFKgeNsblbkHBBGfqBUp0Q0nwzCdHtt8T90m+AbYmxzGCNpC+XHFLYpHldDtQJgIUxcZ77j+sznO7z6n703MbUfDodriEdymLfmEY/q8Yxt8ug+1NzI2osagschvdMC67PbW+GS4j72RRwIXAZwx/eP2uD6V68WTalJnhzYt0nFdyKTxk9K1jJK7Tba71GUxWnuQr/WTtkAfLxz5KOT6CvFm1KXCPbh0zfU6FpXYbTLGFppEE7RqzvJNhsbQWJVPhXp5Z9TWe8rm6RpLFGCsotA07UtThN42oSWcTM3dxQghVRSR1Vl6EEZOfhz44F24w4qznFSmt10Un9KXEImmtNVlvDasO9hnDFZI920um52DpngkYIBzkcZtSfDVWUtq2pXRvN72O0vUbdLhYxC0qK6yRYQ+8AfeX4WPgcjPB5FcvMlB1Z2eKORWc+1ewu9NlEdye8t2OI51Bx8j4g4/Sc+OCcVoYNSpdTP1GmceUTAwIyORXsPCeexlilzrKiQjbAneqp/Ww24x8mYN+4PWs7VSZo6SCO214DTFAKAUAoBQCgFAKAUAoBQCgFAKA8yhtp2nDYOCfPwqJXTrqTGrV9DHaK4QCQgv4kdKrjUlFb+pbI4uT2KkZquUMN5crFG8jnCIrMx8goJP8BRKyG6VnJOysr/AIO6v5P6++lZFPkgJL48hnK/uLXuxY92RR7Izss3HE5d3wUmpRyXE8VlCfzJiMnyXkkn0ADMfRfWvVqMm1UebT49zs6da6SkZjsIMpDGuXP6nJwWZj4k5H39AK+V1Up6jUeTdKrZ9XpoQ0+Dzat9Eaj2y0qWXVItNhnMMUsG9jjO4/nEhsEEgiMcZx16179LpMWBb4rkz9Vq8udrHJ8ETsR2QW7lu4Lq4mZbRxAFjfYjBTIvK4PGVz9STknNevJOqaXU8mOG60304JvtN7KWtpBby2qdzJ3iwHaeGR1kyXB+JuMEnqGIOeMRjm23ZbLjikmuDxoOhzWuqxadLctNC0DSAAbQuS+AoJbHKk8HB3dK8+p0+LUR3SXJ6NNqMunnti+Dcp9MRmexm/MglTIz1XqQQfAjB5HiAaz9PKWn1HlXafKNHURhqNP5tU06fucvtbeS1uZbKU5aI5Rv7SHBBHzBBx4ZI8K+o0+TcqPlNTj2SMd1eG0u7e8X/duA+PFDncP7pcfUVXUw3Itpp0zvysCMjkHpWUbJ8lUlSAcEgjI8PWhDMGnW7RxKjyGRgOXbqevX+X0q05KUrSorji4xpuyTVS4oBQCgFAKAUAoBQCgFAKAUAoCh7bdpBYWjXGze25VVSduS3mcHgAE9PCrQjudFMk9qs0m/sNauoyb68hsreQEGJQCSD1BUHJyPDefkK7wUbqKtnnnKVXNpIxX7QpDb20Ll44Iyu8qV3MxyzYPTJ5+te7TY5Rty6s8GpyRlUY9j57J7US6leXB/3SrGv7xIJ+0f/Ua8mrlbPZo48WbjNcu9y0tuhbYMMfBvD/v5Zr5meSc87yYY3XD9z6aGOENOseaVXyvYpu1ekG9lgc95aXCHakyFg2G4I/SSOT0IPJ55NevH4hljNQlCk/U8mTw/HKDlGdtLsUmnXU2g3cwulkuLa4Kt+JUcl/eyWyxG4ljkFs8AjOcVrNLIuDJV43z0Z61rW312SK1s4pFtkkDy3DrwpAIGMHHRjgZyTjgAE0jHy+WJPzOEWfZvRWs7uaUmS9uSNhlbdkDjPHvHnAHJ/TgY5rKzeI5HkeOELSNXD4djWNZJzpv1L2K4kS5Wa4QqGBUfs+HT79fMmvFHJkhnWXMqvj6HtlDHPA8WB3XL9zU/a/bCO9srgDlw0TH5Fdv8JH+1fTaSVM+Z1kbVmv6nZ97GUzjPj1xgg1pTjuVGXCW12Z9P7SavZgYmW4hQD3JR0UeR4YcftH5V4p6U90NW+h1vsvrS3lpFcqu3vAcrnO1lJVhnAzhgecV4ZR2ujRhLcrLWqlhQCgFAKAUAoBQCgFAKAUAoBQCgOe+3CJjp0bAZCXCM3yKyqP8AqYD612w/qOGoXw2UerXSS3EsiOJEZyQykMCD05Hp4Vq4OMaMjPzkbIorqcS19jsoD6iCcYdCSfLMw/yrG1nFt+5t6LlUvY2fQbGZ4iUmMa7iMAHngc9R8vpXzmjwZZ47jOlZ9JrM+KGSpQt0an2g12eS5NnZFry4Q4dyCI4iOvvbuoxySQMjHJ4r3x8Nc6ebI2jOl4ko2sONJkLsdpGo6lB+OGqTRzb2QAglMKF4KhguDnptx6GtRuMPhozVGUuWyV2q7PajZWr37arM88RT3VGxMO6IV27tvVs/Dg46eNISjJ7aInGUVus8dn+0FxHMkN6TbPMqtHMPglDYK5IOB8Q56AnnbWZPw1puWCbXqacPEk0o54J+huet2E6RbnmMi5HBz689f+81n6vT5oY7lO0aOkz4Z5KjCmav7YZQU09QclpCRjyAjB/iwr6HRO0mvY+c1yq0/VlOa2zEI1/OiRsWYDg9T146CqSkqZaCdo6D7IIyNJhz4tKR8u8f/Q1jZf1G5h/QbnXM6igFAKAUAoBQCgFAKAUAoBQGC+vI4Y3lkYLGilmY+AHJPHNSlZDdFLofbXT7uQxwT7n/ALLI6Z+W9Rk+nWplBx5ZWOSMnSLq/sopo2ilRXjYYZWGQfEfxAP0qE2uUWaTVM512h9lkCRyTWUssMiozLHu3KxUEhcn3hnpksevSu0M8keeeni1waxo9x3lrFITksGDH9pWI/wFG/erUwzck77GVmgotUYdGlaHUmjydlyo482HIHqchhjzcVj+M6eU8T29ua9V3NnwXURx5fi78fR9jq0XaG3SDaqspVThQM84Pj48+dZWHXYIxUEmu1Gtm0Odyc279yg9h8Q/ownHvNM+4+JwEHJ8a1836jIwcxsoeylnqOnakNMgmSW3G2Zg6gflFkVyD1Em3wzjI6VaW2UdzKpyU9vYk9u01C71NNMaZIrWf3k2rncqAuS/iWDI2BkD4aQcYx3dyMm6UtnZl37VrKNNFZAMiLuFQtyRhkTOfPbkfU1XF+stnVYy0sNdt2solfLsYowy4PJ2rnk+vjWXqNbg+KD57Uamn0Wf4ZLjvdnMNflaXUUi5226kkH9LNhiPn8H1BrQ8FwShj+Lu7r2M7xrURnkqPZVfq+5F7S3bJFhCd7EAY6+fH0GPrWzlk0jEwxtm+6N7JrRcPcySXEmBkFti5/dO4/Vqy5ZpPoa8dPFdTarvWtPsu6t3ljgyMRp0AUcDOOEXjGTgVzpvk7boxpGqa/2+me5W30028n5Zd5JSdowcbRhhg4wec/EKRcPLeSdpft+SJ+Z5ixwpv8Af8Fl2O7eQ3FsXupIoZkLCQFtq4U43DcTgc4xk8g1WTSnsXfoWhbhul9P6ja7C+imjEkMiyRt0ZDkHHB5HrxUtNdQmnyiRUEigFAKAUAoBQCgFAaZ7Ue0b2tptilSOeU4BY8hAQHZRycjI5x545xVofrSq0UyOoN3TNFlsLqRXhl1OQ2wAC5jZ5JOB+gt8H6tzNnGK9P+lW5ZEufrwv8A4eT/AFb2PG3x9Of5MWvaVcLKk0Bkg2JtjLR7SUXG05AwCTz04JGK6vBDJFLh1+TgtTPHJySavj7Ejsn25vY9QjiupVMUh2upwBGTnawY+JOPEg7vPp4np1hi1T/JoR1DzSTtftX9Z2uqHU4munG21C6sAPdYmeAAeGCzKP8A28j5wDzrQ0+Smm+/DMzUYrtLtyiDrVgZUG04lQ7kYHBBHr4dBz5gV7MuPejxYsmxm59nu2yXFlMWh3ajDG26JVw8uBjcmAT8wBkH0INY0tPGM7r7m3DUSlCr+xr3YjtPc6badw+m3Ljezb9joPeC8cx+ldMu1vc5JHPE5pbVFsmL2ll/pA3/APRN/wB6Ye627W2YyG3f1Oc8eeKnZ8NWhv8Aivaxedo5ZL6G9Ok34kgRkVQrbSGDgk5hzn3j0I6CoUKVWg5tyT2sxdr+1tzqFk9ummXS72Q79juBtZWI4T0/jTEo3uUkxmc2tri19S1uu2MdrpkDG37u/aPYkUie+uzMYlcEBgp25A8cgDxI5rTRlkbpfU6y1Mo40m39LNP0azZFZ5CTLISzk8nJyefXJJPqTWxihtRiZZ72Suy2nG91aNcZitvzX+akFV+rbePJWryarIevSY7Z26aVVUsxwqgkk+AHJP2rPNRnGrZF1C8u7oWzNbTRqEkuUPBVkjKRkEjccE5HKhT0zzGsySw4bi+URosePNn+NXGjatO0yKJDHDb9Fw3cgKDjGQ0hVnlOeuT8uKx8uozZrTt+y4X45NfFp8OCmqXo3y/r1VFVrHZO0kYuYdsiMC6nCt8yVwHHnxnkVEdVmxRahJ8dU+a90XelwZpJ5Irno1xfsyJ7I9Vjhu7i1djG0r5ji5Kgpu3e8f1FcDpyI/lW7e7HGV3x1MHiGSUarl8HXqodRQCgFAKAUAoBQCgORe00bdVhcNFI0qLB3Uq7tm5sbwCCvO8+Bxk9cjHXDkju2tdOWcNRikoqadXwv5+ha2ssqx94p/2ieYQq4CAR7MLhRjgEHHHTaPr7XGLe35Urr1M+5KO75pOr9P8AszNcGLnvpJYjM0MqT+6Gbbt3Z973B18xgVCW7sk6tNFrcX1bV00znHbq2RbruGKqgZx3hBJAViP08njH3qcs3KMWutEYoqMpJvozv9rMq26uz5VYwxc+ICglvtzWbRrWcn0G7aQ3mqPxJcs0NuD1VON5HyUIufMN517sWPdJR7LlmdlybYOfd8Ij1pmWV2oaZucSxsYp15V1JByOnI5B9R/GuWTCpHbHmcCyk7f3YhEF7DvwRiaPAJx5r8JPPUFflWJr/D5Zce2PBueH+IxxZN0+Tf8AT/aHpUij/alQ46SBk/xAA/Q1PlSSqiPOg+57ve3+lIpJu0b0jDSH/oBp5Un2HmwXc5/F7RJxCYLKA7iT+bJ+nOOi9M+rH6GqaDQzx41GRfxDxGGXI5Q6e5U2Wmt3hnncyzsclmOcH69T4engBW3jwqJhZMzkyzrucSJo+p/gdTiuCcQy/lS+QBxhj8iFb5K3nXg1WO1we/S5afJ2zVLdJIJY3JCPG6sR12spBI9cE1nLg1Hyjkns6OWfa8jWySolu8ihchjKxPXwba2PDf4ZxXj8ThHfjn0k3X8P7Hq8MySePJjS+Fc/yvublbxFkTEZkCFhIikj3jwG9TjHTyrLhByiko3V2vf1NSclGbuVN1T68eh8dMBVbG5IpN/jgNkKuR+oZ+maiSpKMuqjK/v0X1Cd3KPRyjX1XV/Q55pErz63Crvs7mb8sFSCwBycH1C9fLp41saSEcWBOCvdV89DI1mSWbUyU3W2646o7tXoOIoBQCgFAKAUAoBQHMPa3pskLLqMMpjdV7ttoyTuOFwc+7nJGf8A8qcbcZ0ld/8AqiuaKljtyrb097/BSaNr1v3Zt55FJABDx7W7p/dLlGyAynAyA1ajd1KPXuvUyFwnGS47P0Le81+CIrM1zJM6ZMe/CqoIx7wIyzZP6euBzVdnDTSiu/8AgtvW5NNya6f5NEIk1C7ECyD84grwCSeS2fFT8Z58q8+ozNcxV1wejTYbdTdXyd/n0pHtGtWJ2NCYiRwcFdhP2ryRbR7pK+Dilzcy2RFneAqYNwicA7XjZi2Rj1JOfXB5XnT0+SKt+planFJ17EaLWXmbZawSTP8AsqTj1O3OB88V1lqEjjHTtmS9lvbQgXts0at0cDK8+GQSpPpnPpVIalMtk0ziSra+ilHusG9PH6g816FOMjzuMonmTSoG6xr9Bj+VPLi+xKySXc8ppNuP92v1Gf508uC7B5JPuZZrqKIe8yqPAdPsP9KOUYhRciJZ3V3dOUsrdpdvxMRhR6EkhQfmc+lcJ6lI7w0zkeZtZaFtl1byQP8AtKRn1G7GR8s1aGoiystPKJikLX8iWtqu93IyxBwig8sc9APP6DJNUzZY0dMGGVnfrC17uGOLJYIiplurbQBk+pxWUzXS4ON9oLBdKv4olmlW0dXkxIMoPi/LTaCcggeXVc9a5avTrUYm1G58UdNJqHp8qTlUObRbaZ2zs7llU5aY8D4kY4945OCpOAef86y8+lzYo780Lrun+fwauDU4cr2YZ1fZr8fkrNX7fW+0xQcBs5baSAeSpbOGcA+AHnXbH4fllHmKjH0vl/c4T8RwwlxLdL1rhfb+D77JdAe4nW9kdisRIG4fEw6YPiBnJPnnzrUnFR+CKpdTLxty/wDJJ2+h2ioLigFAKAUAoBQCgFAYL20jljaORA8bjDKwyCKJ0Q1Zo3aL2ZWhtWS1iVJgCVLMxJPUZckn054qspZN6mm67r1/yTGGPY4OKvs/R/wavoPs5vpLlTeRosKJjO5T06AKOvj14rrnzyyxqNr39jlp9PHFK5pNenudK0LsdY2kjSwQhZGGNxJOB4hQeFB9OtUTko7W2zo1HdaVF9QkjXunwS7e9ijk2nK94ittPmNwODUptdCGk+pmiiVRhVCjyAAH2FQTVCaJWUqyhlPBDAEEeRB60Bzvt17OrL8LNPbxGOaNC4WMnadvJGzkD3Qfhxziu2PJK6ZwyYY02kahpNx3kCNnJwAfmOD/ABrYhLdGzEnGpUetRn2RM3kD9/D+OKjI6RMFbNh9nfs/tJrWK6ukaWSTLBWY7QuSEOBgtlQDySOelZOTI7pGxixRq2dOtraONAkaKiLwFQBQPkBwK4XZ6EqPUsSsNrKGXyYAj7GhNGGz0+CLPdRRx7jlu7RVyfM7QM0tshJIk0JI1/p0E6hZoklUEMBIoYAjoQCOtSnRDSfU0vth7OvxMqTW0/4Z13A4U+P9kqwK+PHr4VTFCENyatPsWyznPa06a7kzsn2At7a2MU6pcszMWLp7uDjChSSOMZyeck+ldJNOW5FIRajtZtltbpGgSNFRFGFVQAAPIAcAVWyUqMtCRQCgFAKAUAoBQCgFAKA+MwAJJwBySfCgujzFKrKGVgynkEHII8wR1qWmuGQmmrR7qCRQCgFAfCKA5LqXs6v4JZPwLRPbsxZY3O1kz+kZGCB0znoBx4n2Y9VtVM8OXSbnaMFv7PNUuGVbpooYMgvsbLEDwAAIz8zx1wcYqcmq3IjHpKZ163gVEVEAVEUKoHQADAH2rxHuSpUZKEmOGdHGVYMAccHPI8KrGcZdGWlCUXUlRkqxUUAoBQCgFAKAUAoBQCgFAKAUAoBQCgPE0SspVhlWBBB8QeCKlOuSGk1TPNrbpGgRAFVRgAeFJScnbIjFRVLoZagsKAUAoBQCgFAKAUBjggRAQihQTk4GOT41SMIwVRVFpTlJ3J2ZKuVFAKAUAoBQCgFAKAUAoBQCgFAatrPb/T7ad4JHfvI8b9sbsFyAwyQMdCOmetXWOTVo5yyxi6ZJ1HtnYw20dyZS0Mp2xmNWYsecjAHBGD1xgjFFCTdEvJGrMnZztZZ3pZYJD3icsjqUYDpnB6j1GeoqJQceojkjLoV1z7SNKScwtPyDtLBGKA+W4DH1HHrUrHJqyrzQTqza0cEAgggjII5BB6EHxFUOpry9t7A2ZvBI34cPszsfO7y24z4jmr+XK6OfmR27ux67P9tLK8do4WfcqlzvjZRtBAJ3EY6kcZ/kaSg11JjkUuhXye03Sw5USu4U4LpE7Ln5gc/McGp8qRXzonj/AMUNLzjfLny7mT/408qQ86JaQ9srJriC3DsJbiMSRhkZQQwYgHI91iFbg/51XY6stvV0SLXtLayXslkrEzxruYbTtx7mQG6EjevH+lNrqyVNN7TxL2qtFvlsS5/EN4bTge6XALdAdozj1HnTY63Eb1u2mSftHbJepZMxE8ib1BBwR73G7pn3W49KbXVk71e0yabrsE888EZJktyokBUgAtuxg9D8JqHFpWFJN0R9J7V2lxcy20Tkyw7twKkD3W2NtP6sMQPrUuDStkRyRbpEbXu3FhaTdzLIxmxkpGjOVGM87RxxzjrjnFSoNqw8kU6JmndprWe5ltY3PfQjLAqRxxkgnrgkA/MVDi0rCmm6MGm9sLKeGeaOQmK3z3jbW6AFtw4ywwD0o4NOmFki02uxF0ft/YXMyQxGXfJkLmJwDgE9cYHAPWpeOSVsiOSMuhP0ntRaXE08MbnvLckSblKjgspIJ6gFSM/LzqHFpWSppuiBD7QNPa2a5DyGFZBESInJ3EbhwBnBHiflU+XK6I8yNWYrD2kaZNKkUckhkkYIo7mTqTgZ93gevhR45ILLFujbqodBQCgFAKAUAoDk7SXw1vU1s4Y5XdYlbvWwFBjjwcfq8eK78bFZ5vi3vaRu0WhS2FhpkGVknW8V+pClySQoJ525wM48ziphLc2/YrODhGK9yRpL3Fzf6jNIFhv4rV4o4E9V9192ff528/tr6VEqUUl0LRtyk31o89nr6wXszKjNGH2TBlJG4ykt3XHUt/V4PgAPKkk/MIg4+UbX2C1OKHTbWO4njSUQ79juqsIyW2NtJzt2YGfSqTVybR1xuoJP0ObKuOyzZHBuv9B/lXb/AJPsef8A4fubxfyXzadfJLd29w5gJRbfhgAD3mQDk5UgdK5LbuVI7PdsabLT2c31p/RtssckYOxVZdyg97+sEddxbJ9cioyJ7mWxNbFRWaj/AOaLf/kz/iuKlf7f3Kv/AHl9Ck7aWM0usTSQKWntLeCaNVySxSRSVwOTlC3HjVoNKNPuVyJudrseOxFnLBrKPPlZbm0lnlDZG1pJXbaQeRhVXjwwaTdwpEY01Pn0NXvNUkZn1IW05f8AGrMs/dnu+5T3Eh39A2dq+XGOtdEvl9jm5fNXc2jtvp73msL+HciUWKTwMPF0d3T7/wAyKpB1Dn1OmSO6fHoY+xPaQg6xfMux9kT7D4PiZQvP7fHPnScf0xEJVukVfZKRrS706VoJohJuilllXCzGZiyMp8cFl5PggqZfEmisPhcXRsfZO9EF9qwcxi+MzGITvsDpl2RQx6DBU4HgV8uKzVxj6F8bSlK+priWWoyTXd3bxE3f4iaCWOM7gBKhGQfEI4HPngngGr3FJJ9ClSbbXUs9DshbW2u2wORFEo58cxygn6kVVu3FkxW1SibB7NZ7kQ2we8tzbmPCQAASZ/SM5ySKpkq3wdcV0rZpFnpt6/4q5tEZ3nubu0kCgnCS92yvx0AJbLeHFdW48J+zOCUuXH3RvHsktRC+oW46RXRUZ8hlVP2UVyyu6Z2wqrXuZfZV8Wpf89N/OmXt9CcPzfU32uR2FAKAUAoBQCgIkGmQJNJMsarNLgO4HLbRhcnxwMfapbdURSuxf6ZBNs72NZO7cOm4Z2sOjD1om0Gk+p8OlW/4j8R3S9/t2d5j3tvlml9hSuytn7F6a83fNaRGQnJOOCepJXO0nPPIq2+VVZXy4XdGbWey1jdMGnt0kdQAGOQcDJAypBI5PHrUKTXRhwi+qM0ugWjW4tjBH+HHSPbhQc5yAPHJJz61G53ZOyNVXBH0fspYWrmS3t0jcgqWGScHBIyxOBwPtUucn1EYRj0RCm7M6TbSi5NsiS7hsKhj7/UbI1yN3jwvhmrxc5/CjnJY4fEyZvsnniuSmJzmFHdHVh1JQ5Ax+rGfM461GyXK9OQskOH68dDMz2aXE0uFWZY172TB+HkopboenTr0qFCTS9yznBN326kaaSxlZp3hYuqd2WMMofZJkbQNu4qct0q3lyTrj90VWWDW7n9mYbGTTnh/BxxHuOU7vuZAg5LMCSuAc88nqamWOcfif5RWOXHL4Un+zPuktpxlieGEhxGIo5O5kAEa8hA5XAX61E8c4p3+UTDLjk1t/DPcWj6ZMbpRDGxdwLgbSNzISwLA4Bw2TkeOahqcav7FouErS+5KSCyvIYzsSWFGBTcpwrJlQQCBjHIqJKUHTJjKOSNrk+az2Xsbpg9xbxyOBjcRg48iRgkeh45qFJroyzhFvlE2x06GHf3UaJvYu+0AbmPVjjqaq231JSS6GI6LbZmPcpm4AE3uj8wAFQG8xgn71NsbUV9j2L02GVZY7WNZFOVbBOD5gE4BqXOT7lVjinaRa6fp0MClYY1jVmLkKMAs3Vvmahtsskl0Fpp0MTyPHGqvK26QgcsfM+tLCSR8sNNgh391Gqd45d9oxuY9WPqaNt9QlRLqCRQCgFAKAUAoBQCgFAKAUAoBQFfq9iZe7Kyd3LG25GwCM4IIKnqCpPrXTHPbdq0zlkhuqnTXQr1drq2njk2rJExXfHyu9Arq655GDjj0IrpXlzTXR/2jmn5sGn1X9s86Vp6zWOZGO64xK7DghiVZMf8ADhQB6VOSbhl47cURigp4rl83JM0u7mEz28xV2RFcSKNuQxIwy9A3GeOKpOMdqnH9i+OctzhLn3MfZ7/1X/My/wAkpl+X6IYfm+rI3Y+GcW0BMyGLYPc7vB9Pf3+Hyq2pcd8lXNnPSqWyPPFFVHbze+8SnF1JPC5H6PzX2yHywhkGf+GuzlHhS+VJr9uhxipcuPzNp/v1/Jfdlo1SOVFGFSeZQPIbsgfY1587uSb9EenTpKLS7Nl1XE9AoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQEa+sIpgFlRXAORkdD0yKtGcou4spOEZ8SR7t7WNE2Iiqn9lQAOevAqHJt2yYxUVSR5ayiMXdFF7rAGzHGB0GPTip3yvdfI2R27a4PllYRRAiONUB67R1+Z8aSnKXMmRCEYfpRlit0XdtUDcSzY8SepPrUNt9Syil0IcGh2iMHSCNWXkEKAR8qu8s2qbZzjgxxdqKJkMCINqqFGScAY5JJJ+pJP1qjbfU6JJKkIoVXO1QNxLHAxknqT5mjbfUJJdDJUEigFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQH2gPlAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoD//2Q=="    // Replace this with the path to your TMS logo image
          />
        </NavbarBrand>
        
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/theme/team-1-800x800.jpg")}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}
         
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
