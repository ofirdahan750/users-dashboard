import { GitHub, LinkedIn } from "@mui/icons-material";
import { FOOTER_COPYRIGHT_TEXT } from "constants";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="app-footer__separator"></div>
      <div className="app-footer__content">
        <p className="app-footer__copyright">
          © {currentYear} {FOOTER_COPYRIGHT_TEXT}
        </p>
        <nav className="app-footer__links" aria-label="Social media links">
          <a
            href="https://github.com/ofirdahan750/users-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="app-footer__link"
            aria-label="Visit GitHub repository"
          >
            <GitHub className="app-footer__icon" />
            <span className="app-footer__link-text">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/ofir-dahan-8ba3a318a/"
            target="_blank"
            rel="noopener noreferrer"
            className="app-footer__link"
            aria-label="Visit LinkedIn profile"
          >
            <LinkedIn className="app-footer__icon" />
            <span className="app-footer__link-text">LinkedIn</span>
          </a>
        </nav>
      </div>
    </footer>
  );
};
