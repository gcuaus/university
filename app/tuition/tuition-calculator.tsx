'use client';

import { useState } from 'react';

const programs = [
  { name: 'Foundation Courses', level: '1st year', tuition: 1447 },
  { name: 'Associate of Biblical Studies', level: '2nd year', tuition: 1600 },
  { name: 'Graduate of Theology', level: '3rd year', tuition: 1472 },
  { name: 'Bachelor Programs', level: '4th year', tuition: 1600 },
  { name: 'Master Programs', level: '5th & 6th years', tuition: 1856 },
  { name: 'Doctorate Programs', level: '6th year', tuition: 2679 },
  { name: 'Ph.D. Programs', level: '6th year · Ph.D.', tuition: 2937 },
  { name: 'Master of Divinity', level: 'Seminary division', tuition: 1600 },
];

type TuitionContent = { title: string; descriptor: string; intro: string; downPayment: number; matriculationFee: number; booksFee: number; shippingFee: number; discount: number };

const formatCurrency = (amount: number) => `$${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

export default function TuitionCalculator({ content }: { content: TuitionContent }) {
  const [programIndex, setProgramIndex] = useState(0);
  const [term, setTerm] = useState<12 | 18>(12);
  const program = programs[programIndex];
  const fees = content.matriculationFee + content.booksFee + content.shippingFee;
  const financedBalance = program.tuition + fees - content.downPayment;
  const monthlyPayment = Math.ceil(financedBalance / term);
  const prepayTotal = program.tuition * (1 - content.discount / 100) + fees;

  return (
    <main className="tuition-page">
      <section className="tuition-hero"><p className="eyebrow">{content.descriptor}</p><h1>Tuition that keeps the calling within reach.</h1><p>{content.intro}</p></section>
      <section className="tuition-calculator" aria-labelledby="calculator-title"><div className="calculator-copy"><p className="eyebrow">Plan your year</p><h2 id="calculator-title">Build your tuition plan.</h2><p>Move the slider to explore a program, then choose the payment rhythm that works for your season.</p><div className="program-select-row"><span>{program.level}</span><strong>{program.name}</strong></div><label className="tuition-slider-label" htmlFor="tuition-slider"><span>Annual tuition</span><strong>{formatCurrency(program.tuition)}</strong></label><input id="tuition-slider" className="tuition-slider" type="range" min="0" max={programs.length - 1} value={programIndex} onChange={(event) => setProgramIndex(Number(event.target.value))} /><div className="slider-labels"><span>College division</span><span>Seminary division</span></div><div className="term-toggle" aria-label="Payment term"><button type="button" className={term === 12 ? 'active' : ''} onClick={() => setTerm(12)}>12 months</button><button type="button" className={term === 18 ? 'active' : ''} onClick={() => setTerm(18)}>18 months</button></div></div><div className="calculator-result"><span className="result-kicker">Estimated monthly</span><strong className="monthly-price">{formatCurrency(monthlyPayment)}<small>/mo</small></strong><span className="result-note">after {formatCurrency(content.downPayment)} down · {term} interest-free payments</span><div className="cost-breakdown"><div><span>Annual tuition</span><b>{formatCurrency(program.tuition)}</b></div><div><span>Fees & books</span><b>{formatCurrency(fees)}</b></div><div><span>Financed balance</span><b>{formatCurrency(financedBalance)}</b></div></div><div className="prepay-callout"><span>Pay in full</span><strong>{formatCurrency(prepayTotal)}</strong><small>includes a {content.discount}% tuition prepay discount</small></div></div></section>
      <section className="tuition-principles"><div><p className="eyebrow">Simple & straightforward</p><h2>How GCTSA financing works.</h2></div><div className="principle-grid"><article><span>01</span><h3>No qualifying required</h3><p>No credit check, grants, or government loans. GCTSA finances every student directly.</p></article><article><span>02</span><h3>Choose your rhythm</h3><p>After the annual down payment, the remaining balance is divided evenly over 12 or 18 months.</p></article><article><span>03</span><h3>Prepay and save</h3><p>Pay the full year&apos;s tuition up front and receive a {content.discount}% discount on tuition.</p></article></div></section>
      <section className="tuition-notes"><p className="eyebrow">Before you enroll</p><h2>A clear picture of the year ahead.</h2><div className="note-strip"><span>Every program includes <b>{formatCurrency(content.matriculationFee)}</b> matriculation, approximately <b>{formatCurrency(content.booksFee)}</b> books, and <b>{formatCurrency(content.shippingFee)}</b> shipping.</span><span>International students add <b>$200</b> shipping. Canadian students add <b>$95</b>.</span><span>Students must maintain a <b>2.0 GPA</b> to qualify for the Ecclesiastical Scholarship.</span></div></section>
    </main>
  );
}