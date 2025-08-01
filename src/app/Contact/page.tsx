'use client'; import React, { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, User, MessageSquare, Hash } from "lucide-react";
import { Button } from "@/components/ui/buttons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address' : '';
      case 'subject':
        return value.length < 3 ? 'Subject must be at least 3 characters' : '';
      case 'message':
        return value.length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    setStatus("sending");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setTouched({});

      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "panchaldarshan507@gmail.com",
      href: "mailto:panchaldarshan507@gmail.com",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+64 288 521 8538",
      href: "tel:+64-2885218538",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Wellington, New Zealand",
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  const inputFields = [
    { name: "name", type: "text", placeholder: "Your Full Name", icon: User },
    { name: "email", type: "email", placeholder: "your.email@example.com", icon: Mail },
    { name: "subject", type: "text", placeholder: "What's this about?", icon: Hash }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3 mb-8 shadow-lg">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Available for new projects</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-extralight text-foreground mb-6 tracking-tight">
              Let's
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent font-light"> Connect</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {`Have an exciting project in mind? I'd love to hear about it. 
              Let's discuss how we can bring your vision to life.`}

            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl font-light text-foreground mb-8">Get in Touch</h2>

                <div className="space-y-6">
                  {contactItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-center gap-4 p-4 rounded-2xl transition-all-smooth hover:bg-accent/50 hover:shadow-lg cursor-pointer">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} p-3 shadow-lg group-hover:scale-110 transition-all-smooth`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-muted-foreground mb-1">{item.label}</p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-foreground font-medium hover:text-primary transition-colors duration-200"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-foreground font-medium">{item.value}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-accent/30 backdrop-blur-xl border border-border/50 rounded-3xl p-8"
              >
                <h3 className="text-xl font-medium text-foreground mb-4">Response Time</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {` I typically respond to all inquiries within 24 hours. 
                  For urgent matters, don't hesitate to call directly.`}
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl"
            >
              <h2 className="text-3xl font-light text-foreground mb-8">Send a Message</h2>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">Message Sent!</h3>
                    <p className="text-muted-foreground">{`Thank you for reaching out. I'll get back to you soon.`}</p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 1 }}
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {inputFields.map((field, index) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                        className="space-y-2"
                      >
                        <Label htmlFor={field.name} className="text-foreground font-medium">
                          {field.placeholder}
                        </Label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            <field.icon className="w-5 h-5" />
                          </div>
                          <Input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={`pl-12 h-14 bg-background/60 border-2 transition-all-smooth rounded-xl text-foreground placeholder:text-muted-foreground ${errors[field.name] && touched[field.name]
                                ? 'border-destructive focus:border-destructive'
                                : 'border-border focus:border-primary hover:border-border/80'
                              }`}
                          />
                        </div>
                        <AnimatePresence>
                          {errors[field.name] && touched[field.name] && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-destructive text-sm flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" />
                              {errors[field.name]}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="message" className="text-foreground font-medium">
                        Your Message
                      </Label>
                      <div className="relative">
                        <div className="absolute left-4 top-4 text-muted-foreground">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell me about your project..."
                          value={formData.message}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          rows={5}
                          className={`pl-12 bg-background/60 border-2 transition-all-smooth rounded-xl text-foreground placeholder:text-muted-foreground resize-none ${errors.message && touched.message
                              ? 'border-destructive focus:border-destructive'
                              : 'border-border focus:border-primary hover:border-border/80'
                            }`}
                        />
                      </div>
                      <AnimatePresence>
                        {errors.message && touched.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-destructive text-sm flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                      className="pt-4"
                    >
                      <Button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all-smooth transform hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-70"
                      >
                        {status === "sending" ? (
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Sending Message...
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <Send className="w-5 h-5" />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </motion.div>

                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-3"
                        >
                          <AlertCircle className="w-5 h-5 text-destructive" />
                          <p className="text-destructive">{`Something went wrong. Please try again.`}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}