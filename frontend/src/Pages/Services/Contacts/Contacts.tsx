import React, { useState } from 'react';
import PhoneInputStyle from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Photos } from '../../../../Photos';
import styles from './ProjectForm.module.scss';

const PhoneInput = ((PhoneInputStyle as any).default || PhoneInputStyle) as any;

export const ProjectForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        email: '',
        budget: '',
        location: '',
        service: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (value: string) => {
        setFormData({ ...formData, phone_number: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch('http://localhost:5000/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Sent successfully!');
                setFormData({ name: '', phone_number: '', email: '', budget: '', location: '', service: '', message: '' });
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <section className={styles.formSection}>
            <div className={styles.container}>
                <h2 className={styles.formTitle}>
                    <span className={styles.orangeHourglass}></span>
                    Have a project in your mind?
                </h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputRow}>
                        <div className={styles.inputWrapper}>
                            <img src={Photos.FormIcon.User} className={styles.inputIcon} alt="" />
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                        </div>
                        
                        <div className={styles.phoneInputContainer}>
                            <PhoneInput
                                country={'cm'}
                                value={formData.phone_number}
                                onChange={handlePhoneChange}
                                enableSearch={true}
                                inputProps={{
                                    name: 'phone_number',
                                    required: true,
                                    placeholder: 'Phone Number'
                                }}
                            />
                        </div>

                        <div className={styles.inputWrapper}>
                            <img src={Photos.FormIcon.Mail} className={styles.inputIcon} alt="" />
                            <input type="email" name="email" placeholder="Business Email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className={styles.inputRow}>
                        <div className={styles.inputWrapper}>
                            <img src={Photos.FormIcon.Budget} className={styles.inputIcon} alt="" />
                            <select name="budget" value={formData.budget} onChange={handleChange}>
                                <option value="">Select budget</option>
                                <option value="10k-50k">$10,000 - $50,000</option>
                                <option value="50k-100k">$50,000 - $100,000</option>
                                <option value="100k+">$100,000+</option>
                            </select>
                        </div>

                        {/* Новое поле выбора локации с иконкой пина */}
                        <div className={styles.inputWrapper}>
                            <img src={Photos.Icon.Pin} className={styles.inputIcon} alt="" />
                            <select name="location" value={formData.location} onChange={handleChange}>
                                <option value="">Preferred Location</option>
                                <option value="usa">USA</option>
                                <option value="europe">Europe</option>
                                <option value="asia">Asia</option>
                            </select>
                        </div>

                        <div className={styles.inputWrapper}>
                            <img src={Photos.FormIcon.Service} className={styles.inputIcon} alt="" />
                            <select name="service" value={formData.service} onChange={handleChange}>
                                <option value="">Service you are interested in</option>
                                <option value="residential">Residential Construction</option>
                                <option value="commercial">Commercial Construction</option>
                                <option value="renovation">Interior Renovation</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.textareaWrapper}>
                        <img src={Photos.FormIcon.Message} className={styles.textareaIcon} alt="" />
                        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required></textarea>
                    </div>

                    <div className={styles.formFooter}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" required />
                            <span>I agree with Terms of Use and Privacy Policy</span>
                        </label>
                        <button type="submit" className={styles.submitBtn}>
                            Send <img src={Photos.FormIcon.Send} alt="" />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ProjectForm;
