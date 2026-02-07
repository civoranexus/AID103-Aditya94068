import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import linkedinIcon from "@/assets/linkedin.png";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold text-foreground mb-3">CropGuard AI</h3>
            <p className="text-sm text-muted-foreground">
              An AI-powered crop disease detection system developed under the 
              CivoraX Internship Program by Civora Nexus Pvt. Ltd.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                info@civoranexus.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +91-7350 675192
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Sangamner, Maharashtra – 422605 India
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-3">About</h3>
            <p className="text-sm text-muted-foreground">
              URN: UDYAM-MH-01-0075817
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Project ID: AID103
            </p>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Developer</h4>
              <a
                href="https://www.linkedin.com/in/aditya-vaishnav-234344364"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0077B5]/10 hover:bg-[#0077B5]/20 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="h-5 w-5 rounded-sm" />
                <span className="text-sm font-medium text-foreground">Aditya Vaishnav</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Civora Nexus Pvt. Ltd. All rights reserved.
          </p>
          <p className="mt-1">
            Connecting Citizens Through Intelligent Innovation
          </p>
        </div>
      </div>
    </footer>
  );
};
