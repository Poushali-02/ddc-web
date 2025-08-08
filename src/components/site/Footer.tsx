const Footer = () => {
  return (
    <footer id="contact" className="mt-16 border-t bg-background">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-primary">
        © {new Date().getFullYear()} ddc-web • All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
