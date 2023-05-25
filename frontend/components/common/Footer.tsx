import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faEnvelope, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope as faEnvelopeSolid } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer className="py-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white" }}>
      <div className="container text-center">
        <p>
          Leave a ⭐ on{' '}
          <a href="https://github.com/J0SAL/Decentralized-Expense-Tracker" target="_blank" rel="noopener noreferrer" className="footer-link">
            Github
          </a>
          <span className="px-2">, made by</span>
          <a href="https://bio.link/j0sal" target="_blank" rel="noopener noreferrer" className="footer-link">
            @Joy Almeida
          </a>
        </p>
        <div className="icon-container">
          <a href="https://twitter.com/_j0sal" target="_blank" rel="noopener noreferrer" className="footer-icon">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.linkedin.com/in/joy-almeida0/" target="_blank" rel="noopener noreferrer" className="footer-icon">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="mailto:joy.almeida0@gmail.com" className="footer-icon">
            <FontAwesomeIcon icon={faEnvelopeSolid} />
          </a>
          <a href="https://github.com/J0SAL/Decentralized-Expense-Tracker.git" target="_blank" rel="noopener noreferrer" className="footer-icon">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
      <style jsx>{`
        .icon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }

        .footer-icon {
          margin: 0 10px;
          font-size: 24px;
          color: white;
          transition: transform 0.3s ease;
        }

        .footer-icon:hover {
          transform: translateY(-3px);
        }

        .footer-link {
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #e6e6e6;
        }
      `}</style>
    </footer>
  );
}

export default Footer;

