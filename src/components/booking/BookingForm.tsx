import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, User, Phone, Mail, ShieldCheck, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../ui/Button";
import { CalendarScheduler } from "./CalendarScheduler";
import { cn } from "../../lib/utils";
import { format } from "date-fns";

interface BookingFormProps {
  onClose?: () => void;
}

export function BookingForm({ onClose }: BookingFormProps) {
  const [step, setStep] = React.useState(1);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = React.useState<string>("");
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hasInsurance: "",
    visitType: "",
    visitMode: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleDateTimeSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValid = 
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.hasInsurance !== "" &&
    formData.visitType !== "" &&
    formData.visitMode !== "" &&
    formData.consent &&
    selectedDate &&
    selectedTime !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    
    // Package data for n8n webhook
    const payload = {
      ...formData,
      appointmentDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      appointmentTime: selectedTime,
      submittedAt: new Date().toISOString(),
      clinic: "Dr. Joe Henderson ENT Specialist",
    };

    try {
      // Simulate API call
      console.log("Submitting to n8n webhook:", payload);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl sm:rounded-[2.5rem] shadow-2xl border border-outline-variant/10 overflow-hidden max-w-4xl mx-auto w-full">
      <div className="grid lg:grid-cols-5 lg:min-h-[600px] w-full min-w-0">
        {/* Sidebar Info */}
        <div className="lg:col-span-2 bg-primary p-6 sm:p-8 lg:p-10 text-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8">
              <Calendar className="size-6 text-primary" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-headline font-extrabold mb-4 sm:mb-6 leading-tight">
              Book Your <br />
              Consultation.
            </h3>
            <p className="text-sm sm:text-base text-white/70 font-body leading-relaxed mb-6 sm:mb-8">
              Select a convenient time for your initial assessment with Dr. Joe Henderson.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="size-4 sm:size-5 text-secondary-container" />
                </div>
                <p className="text-sm font-medium">Expert ENT Assessment</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="size-4 sm:size-5 text-secondary-container" />
                </div>
                <p className="text-sm font-medium">Personalized Care Plan</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="size-4 sm:size-5 text-secondary-container" />
                </div>
                <p className="text-sm font-medium">Medicare Rebates Apply</p>
              </div>
            </div>
          </div>
          
          <div className="pt-6 sm:pt-10 border-t border-white/10 mt-8 lg:mt-0">
            <p className="text-xs text-white/50 font-body uppercase tracking-widest mb-2">Need help?</p>
            <p className="text-lg font-headline font-bold">(02) 9000 0000</p>
          </div>
        </div>

        {/* Main Form Area */}
        <div className="lg:col-span-3 p-4 sm:p-6 lg:p-10 relative min-w-0 w-full">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col w-full min-w-0"
              >
                {/* Progress Bar */}
                <div className="flex items-center gap-4 mb-6 sm:mb-10">
                  <div className={cn("h-1 flex-1 rounded-full transition-all duration-500", step >= 1 ? "bg-primary" : "bg-surface-container-high")} />
                  <div className={cn("h-1 flex-1 rounded-full transition-all duration-500", step >= 2 ? "bg-primary" : "bg-surface-container-high")} />
                </div>

                {step === 1 ? (
                  <div className="flex-1 min-w-0 w-full relative">
                    <CalendarScheduler
                      onSelect={handleDateTimeSelect}
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      canProceed={!!(selectedDate && selectedTime)}
                    />
                    <div className="mt-6 sm:mt-10 flex justify-end w-full">
                      <Button
                        size="lg"
                        disabled={!selectedDate || !selectedTime}
                        onClick={() => setStep(2)}
                        className="shadow-xl shadow-primary/20 w-full sm:w-auto"
                      >
                        Next: Patient Details
                        <ArrowRight className="size-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    <div className="space-y-6 flex-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-primary uppercase tracking-widest text-shadow-sm">First Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-on-surface-variant" />
                            <input
                              required
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="John"
                              className="w-full h-11 sm:h-12 bg-surface border border-outline-variant/20 rounded-xl pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-primary uppercase tracking-widest text-shadow-sm">Last Name</label>
                          <input
                            required
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Doe"
                            className="w-full h-11 sm:h-12 bg-surface border border-outline-variant/20 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-primary uppercase tracking-widest text-shadow-sm">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-on-surface-variant" />
                          <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className="w-full h-11 sm:h-12 bg-surface border border-outline-variant/20 rounded-xl pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-primary uppercase tracking-widest text-shadow-sm">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-on-surface-variant" />
                          <input
                            required
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="0400 000 000"
                            className="w-full h-11 sm:h-12 bg-surface border border-outline-variant/20 rounded-xl pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-primary uppercase tracking-widest block text-shadow-sm">Is this your first visit?</label>
                        <div className="flex flex-wrap gap-4 sm:gap-6">
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center">
                              <input
                                type="radio"
                                name="visitType"
                                value="first"
                                checked={formData.visitType === "first"}
                                onChange={handleInputChange}
                                className="peer sr-only"
                              />
                              <div className="w-5 h-5 border-2 border-outline-variant/30 rounded-full peer-checked:bg-primary peer-checked:border-primary transition-all" />
                              <div className="absolute inset-0 m-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">First Visit</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center">
                              <input
                                type="radio"
                                name="visitType"
                                value="follow-up"
                                checked={formData.visitType === "follow-up"}
                                onChange={handleInputChange}
                                className="peer sr-only"
                              />
                              <div className="w-5 h-5 border-2 border-outline-variant/30 rounded-full peer-checked:bg-primary peer-checked:border-primary transition-all" />
                              <div className="absolute inset-0 m-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">Follow-up</span>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-primary uppercase tracking-widest block text-shadow-sm">Preferred Consultation Method</label>
                        <div className="flex flex-wrap gap-4 sm:gap-6">
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center">
                              <input
                                type="radio"
                                name="visitMode"
                                value="in-person"
                                checked={formData.visitMode === "in-person"}
                                onChange={handleInputChange}
                                className="peer sr-only"
                              />
                              <div className="w-5 h-5 border-2 border-outline-variant/30 rounded-full peer-checked:bg-primary peer-checked:border-primary transition-all" />
                              <div className="absolute inset-0 m-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">In-clinic Visit</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center">
                              <input
                                type="radio"
                                name="visitMode"
                                value="online"
                                checked={formData.visitMode === "online"}
                                onChange={handleInputChange}
                                className="peer sr-only"
                              />
                              <div className="w-5 h-5 border-2 border-outline-variant/30 rounded-full peer-checked:bg-primary peer-checked:border-primary transition-all" />
                              <div className="absolute inset-0 m-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">Telehealth (Video Call)</span>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-primary uppercase tracking-widest block text-shadow-sm">Do you have insurance?</label>
                        <div className="flex flex-wrap gap-4 sm:gap-6">
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center">
                              <input
                                type="radio"
                                name="hasInsurance"
                                value="yes"
                                checked={formData.hasInsurance === "yes"}
                                onChange={handleInputChange}
                                className="peer sr-only"
                              />
                              <div className="w-5 h-5 border-2 border-outline-variant/30 rounded-full peer-checked:bg-primary peer-checked:border-primary transition-all" />
                              <div className="absolute inset-0 m-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">Yes</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center">
                              <input
                                type="radio"
                                name="hasInsurance"
                                value="no"
                                checked={formData.hasInsurance === "no"}
                                onChange={handleInputChange}
                                className="peer sr-only"
                              />
                              <div className="w-5 h-5 border-2 border-outline-variant/30 rounded-full peer-checked:bg-primary peer-checked:border-primary transition-all" />
                              <div className="absolute inset-0 m-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">No</span>
                          </label>
                        </div>
                      </div>

                      <div className="pt-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative flex items-center pt-0.5">
                            <input
                              type="checkbox"
                              name="consent"
                              checked={formData.consent}
                              onChange={handleInputChange}
                              className="peer sr-only"
                            />
                            <div className="w-5 h-5 border-2 border-outline-variant/30 rounded-md peer-checked:bg-primary peer-checked:border-primary transition-all" />
                            <CheckCircle2 className="absolute inset-0 size-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                          <span className="text-xs text-on-surface-variant leading-relaxed group-hover:text-primary transition-colors">
                            I consent to the collection and use of my personal information in accordance with the <strong>Australian Privacy Act 1988</strong> and the clinic's privacy policy.
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
                      >
                        Back to Calendar
                      </button>
                      <Button
                        size="lg"
                        disabled={!isFormValid || isSubmitting}
                        className="shadow-xl shadow-primary/20 w-full sm:w-auto sm:min-w-[200px]"
                      >
                        {isSubmitting ? (
                          <Loader2 className="size-5 animate-spin" />
                        ) : (
                          <>
                            Confirm Booking
                            <ArrowRight className="size-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/20">
                  <CheckCircle2 className="size-12 text-white" />
                </div>
                <h3 className="text-3xl font-headline font-extrabold text-primary mb-4">
                  Request Received!
                </h3>
                <p className="text-lg text-on-surface-variant font-body mb-8 max-w-sm">
                  Your request has been received and you will receive an automated confirmation call on the provided phone number shortly.
                </p>
                <div className="p-6 bg-surface-container-low rounded-3xl border border-outline-variant/10 mb-10 text-left w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="size-5 text-primary" />
                    <p className="text-sm font-bold text-primary">Next Steps</p>
                  </div>
                  <ul className="space-y-3 text-sm text-on-surface-variant font-body">
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      Check your email for confirmation details.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      Bring your GP referral to the appointment.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      Arrive 10 minutes early for intake paperwork.
                    </li>
                  </ul>
                </div>
                <Button size="lg" onClick={onClose} className="w-full">
                  Return to Home
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
