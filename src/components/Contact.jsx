import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const containerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } }
};

const Contact = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  // Email validation regex
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!message.trim()) {
      newErrors.message = 'Message is required';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildMailTo = () => {
    const to = 'hello@example.com';
    const subject = `Contact from ${name || 'Website Visitor'}`;
    const bodyLines = [];
    if (name) bodyLines.push(`Name: ${name}`);
    if (email) bodyLines.push(`Email: ${email}`);
    if (message) bodyLines.push('\n' + message);
    const body = encodeURIComponent(bodyLines.join('\n'));
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    
    // Validate before sending
    if (!validateForm()) {
      return;
    }

    // Simulate loading state
    setIsLoading(true);
    
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Open mail client
    const mailto = buildMailTo();
    window.location.href = mailto;
    
    // Show success message
    setIsLoading(false);
    setShowSuccess(true);
    
    // Reset form after delay
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setShowSuccess(false);
      setErrors({});
    }, 3000);
  };

  // Clear error when user starts typing
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (errors.message) {
      setErrors(prev => ({ ...prev, message: '' }));
    }
  };

  return (
    <motion.section
      id="contact"
      className="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="contact-inner">
        <motion.h2 className="contact-title" variants={itemVariants}>
          Contact
        </motion.h2>

        <motion.p className="contact-text" variants={itemVariants}>
          I'd love to hear from you. For now these are placeholder details — replace them later.
        </motion.p>

        <motion.ul className="contact-list" variants={containerVariants}>
          <motion.li className="contact-item" variants={itemVariants}>
            <strong>Email:</strong> hello@example.com
          </motion.li>
          <motion.li className="contact-item" variants={itemVariants}>
            <strong>Phone:</strong> +1 (555) 123-4567
          </motion.li>
          <motion.li className="contact-item" variants={itemVariants}>
            <strong>Address:</strong> 123 Beacon Lane, Port City
          </motion.li>
        </motion.ul>

        <motion.div className="contact-form-placeholder" variants={itemVariants}>
          <h3>Send a message</h3>
          <motion.form
            className="contact-form"
            onSubmit={handleSend}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
          >
            <div>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Your name *"
                value={name}
                onChange={handleNameChange}
                className={errors.name ? 'error' : name.trim().length >= 2 ? 'success' : ''}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <div className="error-message" id="name-error" role="alert">
                  ⚠ {errors.name}
                </div>
              )}
            </div>
            
            <div>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Your email *"
                value={email}
                onChange={handleEmailChange}
                className={errors.email ? 'error' : isValidEmail(email) ? 'success' : ''}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <div className="error-message" id="email-error" role="alert">
                  ⚠ {errors.email}
                </div>
              )}
            </div>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                placeholder="Your message *"
                value={message}
                onChange={handleMessageChange}
                className={errors.message ? 'error' : message.trim().length >= 10 ? 'success' : ''}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <div className="error-message" id="message-error" role="alert">
                  ⚠ {errors.message}
                </div>
              )}
            </div>
            
            <motion.button
              type="submit"
              className={`contact-send ${isLoading ? 'loading' : ''}`}
              whileHover={{ scale: isLoading ? 1 : 1.035 }}
              whileTap={{ scale: isLoading ? 1 : 0.975 }}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? '' : 'Send Message'}
            </motion.button>
            
            {showSuccess && (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ gridColumn: '1 / -1' }}
                role="status"
              >
                ✓ Message sent! Your mail client should open shortly.
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
