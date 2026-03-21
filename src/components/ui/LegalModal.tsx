import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield, FileText, Scale, Lock, Eye, Globe, Clock } from "lucide-react";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "privacy" | "terms";
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const isPrivacy = type === "privacy";
  const title = isPrivacy ? "Privacy Policy" : "Terms of Service";
  const Icon = isPrivacy ? Shield : Scale;

  const content = isPrivacy ? (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <Eye className="size-6" />
          <h3 className="text-xl font-headline font-bold">Information We Collect</h3>
        </div>
        <p className="text-on-surface-variant font-body leading-relaxed">
          At Henderson ENT & Sinus Centre, we collect personal information necessary to provide you with high-quality medical care. This includes your name, contact details, date of birth, and relevant medical history. We may also collect information through our website's contact and booking forms.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <Lock className="size-6" />
          <h3 className="text-xl font-headline font-bold">How We Use Your Data</h3>
        </div>
        <p className="text-on-surface-variant font-body leading-relaxed">
          Your information is used primarily to manage your appointments, provide medical treatments, and communicate with you regarding your healthcare. We may also use anonymized data for clinical audits and to improve our service standards.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <Shield className="size-6" />
          <h3 className="text-xl font-headline font-bold">Data Security</h3>
        </div>
        <p className="text-on-surface-variant font-body leading-relaxed">
          We implement robust physical and electronic security measures to protect your personal information from unauthorized access, loss, or misuse. Our systems are regularly audited to ensure compliance with Australian healthcare privacy standards.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <Globe className="size-6" />
          <h3 className="text-xl font-headline font-bold">Third-Party Disclosure</h3>
        </div>
        <p className="text-on-surface-variant font-body leading-relaxed">
          We do not sell or trade your personal information. We only share data with third parties (such as pathology labs or other specialists) when it is essential for your medical treatment or required by law.
        </p>
      </section>
    </div>
  ) : (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <FileText className="size-6" />
          <h3 className="text-xl font-headline font-bold">Agreement to Terms</h3>
        </div>
        <p className="text-on-surface-variant font-body leading-relaxed">
          By accessing the Henderson ENT & Sinus Centre website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <Shield className="size-6" />
          <h3 className="text-xl font-headline font-bold">Medical Disclaimer</h3>
        </div>
        <p className="text-on-surface-variant font-body leading-relaxed">
          The content provided on this website is for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <Clock className="size-6" />
          <h3 className="text-xl font-headline font-bold">Appointments & Cancellations</h3>
        </div>
        <p className="text-on-surface-variant font-body leading-relaxed">
          Booking an appointment through our website constitutes a request. We reserve the right to modify or cancel appointments based on clinical priority. Please provide at least 24 hours' notice for cancellations to avoid potential fees.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <Scale className="size-6" />
          <h3 className="text-xl font-headline font-bold">Limitation of Liability</h3>
        </div>
        <p className="text-on-surface-variant font-body leading-relaxed">
          Henderson ENT & Sinus Centre shall not be held liable for any damages arising out of the use or inability to use the materials on this website, even if we have been notified orally or in writing of the possibility of such damage.
        </p>
      </section>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl max-h-[85vh] bg-surface rounded-[2.5rem] shadow-2xl border border-outline-variant/10 overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-surface-container-high text-primary hover:bg-primary hover:text-white transition-all"
            >
              <X className="size-6" />
            </button>

            <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
              {/* Modal Header */}
              <div className="relative p-8 sm:p-12 bg-primary/5 border-b border-outline-variant/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-headline font-extrabold text-primary">
                      {title}
                    </h2>
                    <p className="text-on-surface-variant font-body text-sm">
                      Last Updated: March 20, 2026
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 sm:p-12">
                {content}
                
                <div className="mt-12 pt-8 border-t border-outline-variant/10 text-center">
                  <p className="text-on-surface-variant font-body text-sm">
                    If you have any questions regarding our {title.toLowerCase()}, please contact us at:
                    <br />
                    <span className="font-bold text-primary">info@drjoehenderson.com.au</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
