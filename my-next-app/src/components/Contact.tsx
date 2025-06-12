import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const inputBaseClasses = "rounded border-2 border-brand-gray-border p-3 w-full focus:border-brand-red outline-none placeholder-brand-gray-light italic text-brand-gray";
  const buttonClasses = "bg-brand-red text-white font-bold h-11 leading-11 px-6 rounded hover:bg-red-700 cursor-pointer disabled:opacity-50";

  // Placeholder - replace with your actual site key from Google reCAPTCHA admin
  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "YOUR_RECAPTCHA_SITE_KEY_PLACEHOLDER";


  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);
    setMessageType(null);

    if (!recaptchaToken) {
      setStatusMessage('Please complete the reCAPTCHA.');
      setMessageType('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage(result.message || 'Message sent successfully!');
        setMessageType('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
        recaptchaRef.current?.reset(); // Reset reCAPTCHA
        setRecaptchaToken(null);
      } else {
        setStatusMessage(result.message || 'An error occurred.');
        setMessageType('error');
        // Optionally reset reCAPTCHA on server-side validation failure too
        // if the error is not specific to reCAPTCHA itself (e.g. bad input but reCAPTCHA was fine)
        // recaptchaRef.current?.reset();
        // setRecaptchaToken(null);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatusMessage('An unexpected error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="border-t-[6px] border-brand-gray-extralight py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <h3 className="text-3xl text-brand-gray-dark font-bold mb-4 text-center md:text-left" data-vavilon="contact-title">
          Contact Me
        </h3>
        <p className="mb-10 text-center md:text-left" data-vavilon="contact-intro">
          Feel free to contact me and see what I can do for you
        </p>

        <form id="contact-form" className="mb-9" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-6">
              <input
                name="name"
                id="name"
                placeholder="Name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={inputBaseClasses + " h-11"}
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-6">
              <input
                name="email"
                id="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={inputBaseClasses + " h-11"}
                required
              />
            </div>
            <div className="w-full px-2 mb-4 md:mb-6">
              <input
                name="subject"
                id="subject"
                placeholder="Subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                className={inputBaseClasses + " h-11"}
                required
              />
            </div>
            <div className="w-full px-2 mb-4 md:mb-6">
              <textarea
                name="message"
                id="message"
                placeholder="Message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={inputBaseClasses + " py-3"}
                required
              ></textarea>
            </div>
            <div className="w-full px-2 mb-4 md:mb-6">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
              />
            </div>
            <div className="w-full px-2">
              <ul className="list-none p-0 flex">
                <li>
                  <button
                    className={buttonClasses + " primary"}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {statusMessage && (
            <p
              className={`mt-4 text-sm ${messageType === 'success' ? 'text-green-600' : 'text-brand-red'}`}
            >
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
