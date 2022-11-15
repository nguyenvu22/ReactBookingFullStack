import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem fListText">About</li>
          <li className="fListItem">Blog</li>
          <li className="fListItem">Demo</li>
          <li className="fListItem">Customer</li>
          <li className="fListItem">Investor</li>
          <li className="fListItem">Term of Service</li>
          <li className="fListItem">Hotels</li>
        </ul>
        <ul className="fList">
          <li className="fListItem fListText">Contact Us</li>
          <li className="fListItem">Jobs</li>
          <li className="fListItem">Support</li>
          <li className="fListItem">Contact</li>
          <li className="fListItem">Sponsorships</li>
        </ul>
        <ul className="fList">
          <li className="fListItem fListText">Social Media</li>
          <li className="fListItem">Instagram</li>
          <li className="fListItem">Facebook</li>
          <li className="fListItem">Youtube</li>
          <li className="fListItem">Twitter</li>
        </ul>

        <ul className="fList">
          <li className="fListItem fListText">Join our Service</li>
          <input type="text" placeholder="Enter your Email address" />
          <button>Sign Up</button>
        </ul>
      </div>
      <div className="fText">Copyright © 2022 lama.</div>
    </div>
  );
};

export default Footer;
