import { cssClasses } from "../lib/cssClasses";

const Footer = () => {
    return (
      <footer className={cssClasses.footer3}>
        <div style={{ padding: 50 }}>
          <h1>IPark</h1>

          <h5 style={{ fontSize: 12 }}>Convenient Parking Solution!</h5>
        </div>
      </footer>
    );
}

export default Footer;