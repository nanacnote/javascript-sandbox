import { FaGithub, FaLinkedin, FaInstagram, FaPaperPlane } from 'react-icons/fa'
export const Footer = (): JSX.Element => (
  <div className="footer">
    <div>
      <a
        href="https://github.com/nanacnote"
        target="_blank"
        rel="noreferrer"
        className="footer-socials px-1 h3"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/owusu-k-adjei-bohyen-b9b4bb83"
        target="_blank"
        rel="noreferrer"
        className="footer-socials px-1 h3"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://www.instagram.com/cedi_note"
        target="_blank"
        rel="noreferrer"
        className="footer-socials px-1 h3"
      >
        <FaInstagram />
      </a>
      <a
        href="mailto:adjeibohyen@hotmail.co.uk"
        rel="noreferrer"
        className="footer-socials px-1 h4"
      >
        <FaPaperPlane />
      </a>
    </div>
    <div>
      Owusu K. © {new Date(Date.now()).getFullYear()} | Fullstack Developer &
      Data Scientist
    </div>
  </div>
)

export default Footer
