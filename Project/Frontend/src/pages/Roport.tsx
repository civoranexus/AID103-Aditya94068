import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { InteractiveCard } from "@/components/interactive-card";
import { StaggeredList } from "@/components/StaggeredList";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Leaf,
  Zap,
  Cloud,
  Users,
  Code,
  Database,
  Camera,
  Thermometer,
  FileText,
  Globe,
  Cpu,
  Layers,
  CheckCircle,
  ExternalLink,
  Target,
  BookOpen,
  AlertTriangle,
  Brain,
  ArrowRight,
} from "lucide-react";
import linkedinIcon from "@/assets/linkedin.png";
import civoraLogo from "@/assets/civora-logo.png";

const techStack = [
  { name: "React 18", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Vite", category: "Build Tool" },
  { name: "shadcn/ui", category: "Component Library" },
  { name: "Lovable Cloud", category: "Backend" },
  { name: "Edge Functions", category: "Backend" },
  { name: "Gemini 2.5 Pro", category: "AI Model" },
  { name: "Open-Meteo API", category: "Weather" },
];

const features = [
  {
    icon: Camera,
    title: "Image-Based Disease Detection",
    description:
      "Upload crop images via drag-and-drop or camera capture. The AI analyzes visible symptoms to identify diseases, pests, and health issues with confidence scores.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Analysis",
    description:
      "Powered by Google Gemini 2.5 Pro, the system provides structured diagnoses including scientific names, severity ratings, spread risk, and affected plant parts.",
  },
  {
    icon: Leaf,
    title: "Treatment Recommendations",
    description:
      "Comprehensive treatment plans including immediate actions, organic solutions, chemical treatments, and preventive measures — all in farmer-friendly language.",
  },
  {
    icon: Cloud,
    title: "Weather Integration",
    description:
      "Real-time weather data from the Open-Meteo API is correlated with disease risk. The system provides weather-adjusted recommendations and alerts.",
  },
  {
    icon: Database,
    title: "Analysis History",
    description:
      "Authenticated users can save and review past analyses, tracking crop health trends over time with detailed records including crop type, location, and growth stage.",
  },
  {
    icon: Users,
    title: "Farm Profiles",
    description:
      "Farmers can create profiles with farm name, location, and crops grown. This contextual information improves the accuracy of AI recommendations.",
  },
];

const milestones = [
  { phase: "Phase 1", title: "Understanding plant pathology challenges and AI detection use cases", status: "complete" },
  { phase: "Phase 2", title: "Designing AI-driven user journeys using Civora Nexus theme", status: "complete" },
  { phase: "Phase 3", title: "Implementing AI logic and disease analysis behavior", status: "complete" },
  { phase: "Phase 4", title: "Testing AI accuracy, usability, and clarity", status: "complete" },
  { phase: "Phase 5", title: "Final refinement, documentation, and project submission", status: "complete" },
];

const coreModules = [
  { title: "User & Farm Data Module", desc: "Farmer registration, profile setup, and farm-related details capture for AI contextualization.", icon: Users },
  { title: "Visual Data Input Module", desc: "Capture visual data via image uploads or camera capture for AI-powered disease detection.", icon: Camera },
  { title: "AI Detection & Analysis Engine", desc: "Primary intelligence layer generating smart, contextual reports on disease type, severity, and cause.", icon: Brain },
  { title: "Treatment & Management Module", desc: "AI-driven recommendations for fungicide/pesticide use, organic treatments, and preventative strategies.", icon: Leaf },
  { title: "Alerts & Trend Analysis Module", desc: "AI-generated alerts for critical outbreaks and visualization of disease trends for preventative planning.", icon: AlertTriangle },
  { title: "Admin & Reference Data Module", desc: "Manage advisory rules, AI inputs, and reference datasets for disease profiles and treatment standards.", icon: Database },
];

const mandatoryAIFeatures = [
  "AI-based crop disease and pest assessment (no static or dummy data)",
  "Personalized recommendation outputs based on visual report and farm data",
  "Logical and explainable decision-making behavior (linking detection to advice)",
  "Clear separation between AI analysis and general information",
  "Context-aware suggestions (crop-specific, environment, growth stage)",
];

const Report = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-10">
        <div className="container max-w-4xl space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Badge variant="secondary" className="text-sm px-4 py-1">
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                Project Report — AID103
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-foreground"
            >
              CropGuard <span className="text-primary">AI</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              AI-Powered Crop Disease Detection and Advisory System
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-4 pt-2"
            >
              <img src={civoraLogo} alt="Civora Nexus" className="h-10 object-contain" />
              <Separator orientation="vertical" className="h-8" />
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">Civora Nexus Pvt. Ltd.</p>
                <p className="text-xs text-muted-foreground">CivoraX Internship Program</p>
              </div>
            </motion.div>
          </div>

          {/* Project Info Cards */}
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Project ID", value: "AID103" },
                { label: "Domain", value: "AI Development" },
                { label: "URN", value: "UDYAM-MH-01-0075817" },
                { label: "Program", value: "CivoraX Internship" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-3 rounded-lg bg-card border border-border text-center"
                >
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Executive Summary */}
          <ScrollReveal>
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed">
                <p>
                  <strong>CropGuard AI</strong> is a web-based crop disease detection system that leverages
                  artificial intelligence to help farmers identify plant diseases, receive treatment
                  recommendations, and correlate disease outbreaks with local weather conditions.
                </p>
                <p>
                  Developed as part of the <strong>CivoraX Internship Program</strong> by Civora Nexus Pvt.
                  Ltd. (URN: UDYAM-MH-01-0075817), this project aims to democratize access to
                  agricultural expertise through technology — enabling farmers to make informed
                  decisions and protect their livelihoods.
                </p>
                <p>
                  The system uses <strong>Google Gemini 2.5 Pro</strong> for multimodal image analysis,
                  the <strong>Open-Meteo API</strong> for real-time weather correlation, and a modern
                  React-based frontend for an intuitive user experience accessible on both desktop and
                  mobile devices.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Project Objective */}
          <ScrollReveal direction="left">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Project Objective
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StaggeredList className="space-y-3">
                  {[
                    "Provides accurate, AI-driven analysis for identifying crop diseases and pests.",
                    "Offers actionable, context-specific recommendations for disease treatment and prevention.",
                    "Converts raw image data and environmental factors into meaningful health insights.",
                    "Improves crop yield, reduces pesticide use, and increases farm resilience for farmers.",
                  ].map((obj, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                      <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm">{obj}</span>
                    </div>
                  ))}
                </StaggeredList>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Core Modules */}
          <ScrollReveal>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Layers className="h-6 w-6 text-primary" />
                Core Modules
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {coreModules.map((mod, i) => (
                  <InteractiveCard key={i} delay={i * 0.08} hoverScale={1.03}>
                    <Card className="h-full border-border hover:border-primary/40 transition-colors">
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="p-2.5 rounded-lg bg-primary/10 h-fit"
                          >
                            <mod.icon className="h-5 w-5 text-primary" />
                          </motion.div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1 text-sm">{mod.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">{mod.desc}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </InteractiveCard>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Key Features */}
          <ScrollReveal>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                Key Features
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {features.map((feature, i) => (
                  <InteractiveCard key={i} delay={i * 0.08} hoverScale={1.03}>
                    <Card className="h-full hover:border-primary/40 transition-colors">
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="p-2.5 rounded-lg bg-primary/10 h-fit"
                          >
                            <feature.icon className="h-5 w-5 text-primary" />
                          </motion.div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </InteractiveCard>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Mandatory AI Features */}
          <ScrollReveal direction="right">
            <Card className="border-accent/30 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Mandatory AI Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StaggeredList className="space-y-2" staggerDelay={0.08}>
                  {mandatoryAIFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 p-2">
                      <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feat}</span>
                    </div>
                  ))}
                </StaggeredList>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Tech Stack */}
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Technology Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Badge
                        variant="outline"
                        className="px-3 py-1.5 hover:bg-primary/10 transition-colors cursor-default"
                      >
                        <span className="font-medium">{tech.name}</span>
                        <span className="ml-1.5 text-muted-foreground text-xs">({tech.category})</span>
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Architecture */}
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  System Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      icon: Layers,
                      title: "Frontend",
                      items: ["React 18 + TypeScript", "Vite build system", "Tailwind CSS + shadcn/ui", "Responsive PWA-ready"],
                    },
                    {
                      icon: Database,
                      title: "Backend",
                      items: ["Lovable Cloud", "Edge Functions (Deno)", "PostgreSQL Database", "Row Level Security"],
                    },
                    {
                      icon: Cpu,
                      title: "AI & APIs",
                      items: ["Google Gemini 2.5 Pro", "Multimodal Vision API", "Open-Meteo Weather", "Geocoding API"],
                    },
                  ].map((arch, i) => (
                    <InteractiveCard key={i} delay={i * 0.1}>
                      <div className="p-4 rounded-lg bg-secondary/50 border border-border h-full">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <arch.icon className="h-4 w-4 text-primary" />
                          {arch.title}
                        </h4>
                        <ul className="space-y-1 text-muted-foreground">
                          {arch.items.map((item, j) => (
                            <li key={j}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </InteractiveCard>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Analysis Workflow - Interactive Steps */}
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-primary" />
                  Analysis Workflow
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4">
                <div className="grid gap-3 md:grid-cols-5">
                  {[
                    { step: "1", label: "Upload", desc: "Farmer uploads crop image" },
                    { step: "2", label: "Context", desc: "Add crop type, location, stage" },
                    { step: "3", label: "Weather", desc: "Fetch local weather data" },
                    { step: "4", label: "AI Analysis", desc: "Gemini Pro processes image" },
                    { step: "5", label: "Results", desc: "Diagnosis & treatment plan" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.5 }}
                      whileHover={{ scale: 1.08, y: -4 }}
                      className="text-center p-3 rounded-lg bg-primary/5 border border-primary/20 cursor-default"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-2"
                      >
                        {item.step}
                      </motion.div>
                      <p className="font-semibold text-foreground text-xs">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
                {/* Flow arrows for desktop */}
                <div className="hidden md:flex items-center justify-center gap-2 -mt-2">
                  {[1, 2, 3, 4].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.15 }}
                      className="flex-1 h-0.5 bg-gradient-to-r from-primary/40 to-primary/20 rounded-full"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Development Milestones */}
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Development Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StaggeredList className="space-y-3" staggerDelay={0.12}>
                  {milestones.map((milestone, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-default"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                      >
                        <CheckCircle className="h-5 w-5 text-success shrink-0" />
                      </motion.div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-primary">{milestone.phase}</span>
                        <p className="font-medium text-foreground text-sm">{milestone.title}</p>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                        Complete
                      </Badge>
                    </motion.div>
                  ))}
                </StaggeredList>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Target Users */}
          <ScrollReveal direction="left">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Target Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { title: "Farmers", desc: "Primary users who upload crop images for disease detection and treatment guidance.", icon: Leaf },
                    { title: "Agricultural Advisors", desc: "Experts who use the system to provide data-backed advice to farming communities.", icon: BookOpen },
                    { title: "Admin / AI Managers", desc: "Manage advisory rules, AI inputs, and monitor system usage and relevance.", icon: Shield },
                  ].map((user, i) => (
                    <InteractiveCard key={i} delay={i * 0.1} hoverScale={1.04}>
                      <div className="p-4 rounded-lg bg-secondary/30 border border-border text-center h-full">
                        <motion.div
                          whileHover={{ y: -4 }}
                          className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3"
                        >
                          <user.icon className="h-6 w-6 text-primary" />
                        </motion.div>
                        <h4 className="font-semibold text-foreground mb-1">{user.title}</h4>
                        <p className="text-xs text-muted-foreground">{user.desc}</p>
                      </div>
                    </InteractiveCard>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Developer Info */}
          <ScrollReveal>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-sm text-muted-foreground mb-1">Developed by</p>
                    <h3 className="text-xl font-bold text-foreground">Aditya Vaishnav</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      CivoraX Intern — Civora Nexus Pvt. Ltd.
                    </p>
                    <motion.a
                      href="https://www.linkedin.com/in/aditya-vaishnav-234344364"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-[#0077B5]/10 hover:bg-[#0077B5]/20 transition-colors group"
                    >
                      <img src={linkedinIcon} alt="LinkedIn" className="h-5 w-5 rounded-sm" />
                      <span className="text-sm font-medium text-foreground">Connect on LinkedIn</span>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.a>
                  </div>
                  <motion.img
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                    src={civoraLogo}
                    alt="Civora Nexus"
                    className="h-16 object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Report;
