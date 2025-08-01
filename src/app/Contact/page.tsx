import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/buttons";


export default function ContactSection() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="glassmorphic-strong rounded-3xl p-8 mb-8 inline-block">
            <h2 className="text-5xl font-light mb-4" style={{ color: 'var(--text-primary)' }}>
              Get In Touch
            </h2>
            <div className="w-24 h-1 glassmorphic rounded-full mx-auto"></div>
          </div>
          <div className="glassmorphic rounded-2xl p-6">
            <p className="text-1xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
             {`I'm always open to discussing new opportunities and interesting projects.
              Let's create something amazing together!`} 
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glassmorphic-card rounded-3xl p-8">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
                Contact Information
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: <Mail className="w-4 h-4" style={{ color: 'var(--accent)' }} />,
                    label: "Email",
                    value: "panchaldarshan507@gmail.com",
                    href: "mailto:panchaldarshan507@gmail.com",
                  },
                  {
                    icon: <Phone className="w-4 h-4" style={{ color: 'var(--accent)' }} />,
                    label: "Phone",
                    value: "02885218538",
                    href: "tel:+64-2885218538",
                  },
                  {
                    icon: <MapPin className="w-4 h-4" style={{ color: 'var(--accent)' }} />,
                    label: "Location",
                    value: "Wellington, New Zealand",
                  },
                ].map((item, i) => (
                  <div className="flex items-center gap-4" key={i}>
                    <div className="glassmorphic-strong rounded-xl p-3">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="hover:underline" style={{ color: 'var(--text-secondary)' }}>
                          {item.value}
                        </a>
                      ) : (
                        <p style={{ color: 'var(--text-secondary)' }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
              Send Message
            </h3>
            <form className="space-y-6">
              {[
                { type: "text", placeholder: "Your Name" },
                { type: "email", placeholder: "Your Email" },
                { type: "text", placeholder: "Subject" },
              ].map((input, i) => (
                <div key={i}>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    className="w-full rounded-sm p-2 border font-medium"
                  />
                </div>
              ))}
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full  rounded-sm p-3 border resize-none font-medium"
                />
              </div>
              <Button
                variant="default"
                size="sm"
                className="text=sm p-5 px-3 font-semibold hover:scale-105 transition-all group"
                aria-label="About Me"
              >
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
