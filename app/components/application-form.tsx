'use client';

import { useState, type FormEvent, type ReactNode } from 'react';

const degreeLevels = [
  'Diploma of Biblical Studies',
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctor's Degree",
  'Ph.D. Program',
];

const programTracks = [
  {
    label: "Associate's Programs",
    options: ['A.B.S. — Associate of Biblical Studies', 'A.Min. — Associate of Ministry'],
  },
  {
    label: "Bachelor's Programs",
    options: [
      'B.B.S. — Bachelor of Biblical Studies',
      'B.Min. — Bachelor of Ministry',
      'TH.B. — Bachelor of Theology',
      'B.C.E. — Bachelor of Christian Education',
    ],
  },
  {
    label: "Master's Programs",
    options: [
      'M.B.S. — Master of Biblical Studies',
      'M.Min. — Master of Ministry',
      'TH.M. — Master of Theology',
      'M.C.E. — Master of Christian Education',
      'M.C.C. — Master of Christian Counseling',
    ],
  },
  {
    label: 'Doctoral Programs',
    options: [
      'D.B.S. — Doctor of Biblical Studies',
      'D.Min. — Doctor of Ministry',
      'TH.D. — Doctor of Theology',
      'D.C.E. — Doctor of Christian Education',
      'D.C.C. — Doctor of Christian Counseling',
      'Ph.D. Program (contact for details)',
    ],
  },
  {
    label: 'Other',
    options: ['Diploma of Biblical Studies', 'Undecided — need guidance'],
  },
];

function SelectField({
  id,
  label,
  required = false,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="application-field" htmlFor={id}>
      <span>{label}{required && ' *'}</span>
      <select id={id} name={id} required={required} defaultValue="">
        <option value="" disabled>Select...</option>
        {children}
      </select>
    </label>
  );
}

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <p className="application-notice">
        Online submission is not connected yet. Information entered here will not be sent or stored.
        To begin an application, contact <a href="mailto:admission@gcua.us">admission@gcua.us</a>.
      </p>

      <fieldset className="application-fieldset">
        <legend>Personal Information</legend>
        <div className="application-fields-grid">
          <label className="application-field" htmlFor="firstName"><span>First Name *</span><input id="firstName" name="firstName" autoComplete="given-name" required /></label>
          <label className="application-field" htmlFor="lastName"><span>Last Name *</span><input id="lastName" name="lastName" autoComplete="family-name" required /></label>
          <label className="application-field" htmlFor="email"><span>Email Address *</span><input id="email" name="email" type="email" autoComplete="email" required /></label>
          <label className="application-field" htmlFor="phone"><span>Phone Number *</span><input id="phone" name="phone" type="tel" autoComplete="tel" required /></label>
          <label className="application-field application-field-wide" htmlFor="address"><span>Mailing Address *</span><textarea id="address" name="address" autoComplete="street-address" rows={2} required /></label>
          <label className="application-field" htmlFor="city"><span>City *</span><input id="city" name="city" autoComplete="address-level2" required /></label>
          <label className="application-field" htmlFor="state"><span>State / Province</span><input id="state" name="state" autoComplete="address-level1" /></label>
          <label className="application-field" htmlFor="postalCode"><span>ZIP / Postal Code</span><input id="postalCode" name="postalCode" autoComplete="postal-code" /></label>
          <label className="application-field" htmlFor="country"><span>Country</span><input id="country" name="country" autoComplete="country-name" /></label>
        </div>
      </fieldset>

      <fieldset className="application-fieldset">
        <legend>Program of Study</legend>
        <div className="application-fields-grid">
          <SelectField id="degreeLevel" label="Degree Level" required>
            {degreeLevels.map((level) => <option key={level}>{level}</option>)}
          </SelectField>
          <SelectField id="programTrack" label="Program Track" required>
            {programTracks.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => <option key={option}>{option}</option>)}
              </optgroup>
            ))}
          </SelectField>
        </div>
      </fieldset>

      <fieldset className="application-fieldset">
        <legend>Educational Background</legend>
        <div className="application-fields-grid">
          <SelectField id="highestEducation" label="Highest Level of Education" required>
            <option>High School Diploma or GED</option>
            <option>Some College</option>
            <option>Associate's Degree</option>
            <option>Bachelor's Degree</option>
            <option>Master's Degree</option>
            <option>Doctoral Degree</option>
            <option>Bible College / Seminary</option>
          </SelectField>
          <SelectField id="transferringCredits" label="Transferring Credits?">
            <option>No</option>
            <option>Yes — from another institution</option>
            <option>Yes — life experience credit request</option>
            <option>Both institution credits and life experience</option>
          </SelectField>
        </div>
      </fieldset>

      <fieldset className="application-fieldset">
        <legend>Ministry Experience</legend>
        <label className="application-field" htmlFor="ministryExperience">
          <span>Describe your ministry experience</span>
          <textarea id="ministryExperience" name="ministryExperience" rows={4} />
        </label>
      </fieldset>

      <fieldset className="application-fieldset">
        <legend>Financial Preferences</legend>
        <SelectField id="paymentPreference" label="Payment Preference">
          <option>Pay tuition in full</option>
          <option>Monthly payment plan (no interest)</option>
          <option>Undecided — please contact me to discuss</option>
        </SelectField>
      </fieldset>

      <fieldset className="application-fieldset">
        <legend>How Did You Hear About GCUA?</legend>
        <SelectField id="referralSource" label="How did you find us?">
          <option>Referred by a friend or family member</option>
          <option>Referred by my pastor or church</option>
          <option>Internet search</option>
          <option>Social media</option>
          <option>Radio or broadcast</option>
          <option>Other</option>
        </SelectField>
      </fieldset>

      <fieldset className="application-fieldset">
        <legend>Anything Else?</legend>
        <label className="application-field" htmlFor="comments">
          <span>Questions or Comments</span>
          <textarea id="comments" name="comments" rows={4} />
        </label>
      </fieldset>

      <button className="button gold application-submit" type="submit">Review application <span aria-hidden="true">↗</span></button>
      {submitted && (
        <p className="application-submit-status" role="status">
          This form is not connected yet, so your information has not been sent or saved. Please contact GCUA Admissions to apply.
        </p>
      )}
    </form>
  );
}
